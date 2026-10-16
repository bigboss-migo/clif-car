import json
import logging
import os
from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from pydantic import TypeAdapter, ValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from starlette.middleware.cors import CORSMiddleware

load_dotenv(Path(__file__).parent / ".env")

from lead_mailer import MailerError, send_submission  # noqa: E402
from lead_models import Payload  # noqa: E402
from rate_limit import RateLimiter  # noqa: E402

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(name)s %(levelname)s %(message)s")
logger = logging.getLogger("lead")

MAX_BODY_BYTES = 20 * 1024
payload_adapter = TypeAdapter(Payload)
limiter = RateLimiter(limit=5, window_seconds=600)

app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in os.environ["CORS_ORIGINS"].split(",") if o.strip() and o.strip() != "*"],
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)


def fail(status: int, error: str) -> JSONResponse:
    return JSONResponse({"ok": False, "error": error}, status_code=status)


@app.exception_handler(StarletteHTTPException)
async def http_error(_request: Request, exc: StarletteHTTPException):
    return fail(exc.status_code, str(exc.detail))


@app.exception_handler(Exception)
async def unhandled_error(_request: Request, exc: Exception):
    logger.error("Unhandled error: %s", type(exc).__name__)
    return fail(500, "Internal server error")


def client_ip(request: Request) -> str:
    # TRUSTED_PROXY_HOPS = number of right-most X-Forwarded-For entries added by our own proxies (incl. the client entry).
    forwarded = [p.strip() for p in request.headers.get("x-forwarded-for", "").split(",") if p.strip()]
    if forwarded:
        hops = int(os.environ.get("TRUSTED_PROXY_HOPS") or 0)
        return forwarded[-hops] if 0 < hops <= len(forwarded) else forwarded[0]
    return request.client.host if request.client else "unknown"


def first_error(exc: ValidationError) -> str:
    err = exc.errors()[0]
    loc = [str(p) for p in err["loc"] if p not in ("lead", "newsletter")]
    if err["type"] in ("union_tag_invalid", "union_tag_not_found"):
        return "type must be 'lead' or 'newsletter'"
    msg = err["msg"].removeprefix("Value error, ")
    return f"{'.'.join(loc)}: {msg}" if loc else msg


async def read_json(request: Request):
    if "application/json" not in request.headers.get("content-type", ""):
        raise ValueError("Content-Type must be application/json")
    if int(request.headers.get("content-length") or 0) > MAX_BODY_BYTES:
        raise ValueError("Request body too large")
    body = await request.body()
    if len(body) > MAX_BODY_BYTES:
        raise ValueError("Request body too large")
    data = json.loads(body)
    if not isinstance(data, dict):
        raise ValueError("Body must be a JSON object")
    return data


@app.post("/api/lead")
async def submit_lead(request: Request):
    ip = client_ip(request)
    if not limiter.allow(ip):
        return fail(429, "Too many requests. Please try again later.")
    try:
        raw = await read_json(request)
    except (ValueError, UnicodeDecodeError) as e:
        return fail(400, "Invalid JSON body" if isinstance(e, json.JSONDecodeError) else str(e))

    if str(raw.get("website") or "").strip():
        return {"ok": True}

    try:
        payload = payload_adapter.validate_python(raw)
    except ValidationError as e:
        return fail(400, first_error(e))

    try:
        await send_submission(payload.model_dump(), ip, request.headers.get("user-agent", ""))
    except MailerError:
        return fail(500, "We couldn't send your submission. Please try again or call us.")
    return {"ok": True}

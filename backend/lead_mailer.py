import asyncio
import base64
import logging
import os
from datetime import datetime, timezone
from html import escape

import resend

from lead_models import photo_type

logger = logging.getLogger("lead_mailer")

META_FIELDS = ("type", "website", "photos")


class MailerError(Exception):
    pass


def _split(value: str | None) -> list[str]:
    return [e.strip() for e in (value or "").split(",") if e.strip()]


def _fmt(v) -> str:
    if isinstance(v, bool):
        return "Yes" if v else "No"
    return str(v)


def build_subject(data: dict) -> str:
    if data["type"] == "lead":
        vehicle = " ".join(str(data.get(k) or "") for k in ("vehicleYear", "vehicleMake", "vehicleModel")).strip()
        vehicle = vehicle or " ".join(str(data.get(k) or "") for k in ("condition", "bodyStyle")).strip()
        return f"New lead: {data['firstName']} {data['lastName']} - {vehicle}".strip(" -")
    return f"Newsletter signup: {data['email']}"


def build_rows(data: dict, meta: dict) -> list[tuple[str, str]]:
    rows = [(k, _fmt(v)) for k, v in data.items() if k not in META_FIELDS and v not in (None, "")]
    if data.get("photos"):
        rows.append(("photos", f"{len(data['photos'])} attached"))
    rows += [(k, _fmt(v)) for k, v in meta.items()]
    return rows


def build_attachments(photos: list[str] | None) -> list[dict]:
    out = []
    for i, b64 in enumerate(photos or [], start=1):
        ext = photo_type(base64.b64decode(b64)) or "jpg"
        out.append({"filename": f"trade-in-photo-{i}.{ext}", "content": b64})
    return out


def build_html(title: str, rows: list[tuple[str, str]]) -> str:
    cell = "padding:8px 12px;border:1px solid #ddd;font-family:Arial,sans-serif;font-size:14px;vertical-align:top;"
    body = "".join(
        f'<tr><th style="{cell}text-align:left;background:#f5f5f5;white-space:nowrap;">{escape(k)}</th>'
        f'<td style="{cell}white-space:pre-wrap;">{escape(v)}</td></tr>'
        for k, v in rows
    )
    return (
        f'<h2 style="font-family:Arial,sans-serif;">{escape(title)}</h2>'
        f'<table role="presentation" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">{body}</table>'
    )


def build_text(title: str, rows: list[tuple[str, str]]) -> str:
    return title + "\n\n" + "\n".join(f"{k}: {v}" for k, v in rows)


async def send_submission(data: dict, ip: str, user_agent: str) -> None:
    api_key = os.environ.get("RESEND_API_KEY")
    to = _split(os.environ.get("LEAD_TO_EMAIL"))
    if not api_key:
        logger.error("RESEND_API_KEY is not set; cannot send lead/newsletter email.")
        raise MailerError("missing api key")
    if not to:
        logger.error("LEAD_TO_EMAIL is not set; cannot send lead/newsletter email.")
        raise MailerError("missing recipient")

    meta = {
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "source": data.get("source") or "",
        "ip": ip,
        "userAgent": user_agent[:500],
    }
    subject = build_subject(data)
    rows = build_rows({k: v for k, v in data.items() if k != "source"}, meta)
    params = {
        "from": os.environ.get("LEAD_FROM_EMAIL") or "onboarding@resend.dev",
        "to": to,
        "subject": subject,
        "html": build_html(subject, rows),
        "text": build_text(subject, rows),
        "reply_to": data["email"],
    }
    attachments = build_attachments(data.get("photos"))
    if attachments:
        params["attachments"] = attachments
    bcc = _split(os.environ.get("LEAD_BCC"))
    if bcc:
        params["bcc"] = bcc

    resend.api_key = api_key
    try:
        await asyncio.to_thread(resend.Emails.send, params)
    except Exception as e:
        logger.error("Resend send failed (%s type): %s: %s", data["type"], type(e).__name__, str(e)[:300])
        raise MailerError("send failed") from e

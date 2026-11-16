# Process-page quote form: new fields, trade-in photos as email attachments. Runs in-process (no live server).
import base64
import os
import sys

import pytest

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
os.environ.setdefault("CORS_ORIGINS", "http://localhost:3000")

from fastapi.testclient import TestClient  # noqa: E402

import lead_mailer  # noqa: E402
import server  # noqa: E402

JPEG = base64.b64encode(b"\xff\xd8\xff\xe0" + b"0" * 1000).decode()

BASE = dict(
    type="lead", source="process-page", firstName="Jo", lastName="Doe", email="jo@example.com",
    phone="(555) 123-4567", consent=True, carType="Luxury", condition="Used", bodyStyle="SUV",
    transmission="Automatic", colorChoice1="Black", colorChoice2="White", colorChoice3="",
    acquisition="Finance", downPayment="$5,000", tradeIn=True, tradeInYear="2018", tradeInMake="BMW",
    tradeInMileage="64,000", tradeInVin="", tradeInHasLoan=True, tradeInAmountOwed="$9,000",
)

_n = iter(range(1, 10_000))


@pytest.fixture
def sent(monkeypatch):
    captured = {}
    monkeypatch.setenv("RESEND_API_KEY", "re_test_dummy")
    monkeypatch.setenv("LEAD_TO_EMAIL", "owner@example.com")
    monkeypatch.setattr(lead_mailer.resend.Emails, "send", lambda p: captured.update(p) or {"id": "1"})
    return captured


def post(payload):
    return TestClient(server.app).post("/api/lead", json=payload, headers={"X-Forwarded-For": f"10.9.{next(_n) // 250}.{next(_n) % 250}"})


def test_full_submission_emails_fields_and_attachments(sent):
    r = post({**BASE, "photos": [JPEG, JPEG]})
    assert r.json() == {"ok": True}
    assert [a["filename"] for a in sent["attachments"]] == ["trade-in-photo-1.jpg", "trade-in-photo-2.jpg"]
    assert sent["subject"] == "New lead: Jo Doe - Used SUV"
    for needle in ("carType: Luxury", "tradeInMake: BMW", "tradeInHasLoan: Yes", "photos: 2 attached"):
        assert needle in sent["text"]
    assert JPEG not in sent["text"] and JPEG not in sent["html"]


def test_no_trade_in_has_no_attachments(sent):
    assert post({**BASE, "tradeIn": False}).json() == {"ok": True}
    assert "attachments" not in sent


@pytest.mark.parametrize("photos,fragment", [
    (["not base64!!"], "base64"),
    ([base64.b64encode(b"<html>").decode()], "JPEG"),
    ([JPEG] * 6, "at most 5"),
    ([base64.b64encode(b"\xff\xd8\xff" + b"0" * (3 * 1024 * 1024 + 10)).decode()], "large"),
])
def test_bad_photos_rejected(sent, photos, fragment):
    r = post({**BASE, "photos": photos})
    assert r.status_code == 400 and fragment in r.json()["error"]


def test_small_limit_still_applies_to_non_photo_content(sent):
    r = post({**BASE, "notes": "x" * 25000, "photos": [JPEG]})
    assert r.status_code == 400 and "large" in r.json()["error"].lower()

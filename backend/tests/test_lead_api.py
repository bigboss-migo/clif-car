# Lead/newsletter endpoint tests: validation, honeypot, rate-limit, CORS, routes, mailer units
import os
import sys
import uuid
import itertools

import pytest
import requests

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

LOCAL = "http://localhost:8001/api/lead"
PUBLIC_URL = "https://2c20ef0c-c4fe-4ca3-a097-257ed1f38b8c.preview.emergentagent.com"
EVIL = "https://evil.com"
_ip_counter = itertools.count(1)


def new_ip():
    n = next(_ip_counter)
    return f"10.{uuid.uuid4().int % 250}.{n // 250}.{n % 250}"


def post(json=None, data=None, headers=None, ip=None):
    h = {"X-Forwarded-For": ip or new_ip()}
    if json is not None:
        h["Content-Type"] = "application/json"
    h.update(headers or {})
    if json is not None:
        import json as _j
        data = _j.dumps(json)
    return requests.post(LOCAL, data=data, headers=h, timeout=15)


def lead(**kw):
    d = {"type": "lead", "firstName": "TEST_Jane", "lastName": "Doe", "email": "jane@example.com",
         "phone": "+1 (555) 123-4567", "consent": True, "vehicleYear": "2024", "vehicleMake": "Toyota",
         "vehicleModel": "Camry"}
    d.update(kw)
    return {k: v for k, v in d.items() if v is not ...}


def newsletter(**kw):
    d = {"type": "newsletter", "email": "news@example.com", "consent": True}
    d.update(kw)
    return {k: v for k, v in d.items() if v is not ...}


def assert_400(r):
    assert r.status_code == 400, r.text
    b = r.json()
    assert b["ok"] is False and isinstance(b["error"], str) and b["error"]


# --- valid payloads -> 500 because RESEND_API_KEY empty
class TestNoKey:
    def test_valid_lead_500(self):
        r = post(lead(notes="x" * 1500))
        assert r.status_code == 500
        b = r.json()
        assert b["ok"] is False and b["error"]

    def test_valid_newsletter_500(self):
        r = post(newsletter(firstName="Bob", state="TX", favoriteMake="Ford"))
        assert r.status_code == 500 and r.json()["ok"] is False

    def test_log_contains_message(self):
        post(newsletter())
        import glob
        logs = "".join(open(f, errors="ignore").read()[-200000:] for f in glob.glob("/var/log/supervisor/backend.*.log"))
        assert "RESEND_API_KEY is not set" in logs


# --- honeypot
class TestHoneypot:
    def test_honeypot_valid(self):
        r = post(lead(website="http://spam"))
        assert r.status_code == 200 and r.json() == {"ok": True}

    def test_honeypot_invalid_body(self):
        r = post({"website": "x", "type": "bogus"})
        assert r.status_code == 200 and r.json() == {"ok": True}

    def test_honeypot_whitespace_not_triggered(self):
        r = post(newsletter(website="   "))
        assert r.status_code == 500


# --- validation
@pytest.mark.parametrize("payload", [
    lead(firstName=...), lead(lastName=...), lead(email=...), lead(phone=...), lead(consent=...),
    lead(email="not-an-email"), lead(phone="12345"), lead(phone="1234567890123456"), lead(phone="555-abc-1234"),
    lead(consent=False), lead(firstName="A\nB"), lead(lastName="A\r\nB"), lead(vehicleMake="Toy\nota"),
    lead(vehicleModel="C\namry"), lead(vehicleYear="20\n24"), lead(email="a@b.com\nBcc: x@y.com"),
    lead(city="x" * 201), lead(notes="x" * 2001), lead(firstName="   "),
    newsletter(email=...), newsletter(consent=...), newsletter(consent=False), newsletter(email="bad"),
    {"type": "unknown", "email": "a@b.com", "consent": True}, {"email": "a@b.com", "consent": True},
])
def test_validation_400(payload):
    assert_400(post(payload))


def test_unknown_type_message():
    r = post({"type": "x", "email": "a@b.com", "consent": True})
    assert_400(r)
    assert "type" in r.json()["error"]


def test_string_200_ok():
    assert post(lead(city="x" * 200)).status_code == 500


def test_control_chars_stripped_ok():
    assert post(lead(city="Aus\x00tin\x07")).status_code == 500


def test_non_json_body():
    assert_400(post(data="{not json", headers={"Content-Type": "application/json"}))


def test_wrong_content_type():
    assert_400(post(data='{"type":"newsletter"}', headers={"Content-Type": "text/plain"}))


def test_json_array():
    assert_400(post(data="[1,2]", headers={"Content-Type": "application/json"}))


def test_body_too_large():
    r = post(lead(notes="x" * 25000))
    assert_400(r)
    assert "large" in r.json()["error"].lower()


def test_invalid_utf8():
    assert_400(post(data=b"\xff\xfe{}", headers={"Content-Type": "application/json"}))


# --- rate limit
def test_rate_limit_6th_429():
    ip = new_ip()
    codes = [post(newsletter(), ip=ip).status_code for _ in range(5)]
    assert 429 not in codes
    r = post(newsletter(), ip=ip)
    assert r.status_code == 429
    assert r.json()["ok"] is False and r.json()["error"]


def test_rate_limit_spoofed_xff_uses_trusted_hop():
    # with 3 hops, a 3+ entry XFF picks forwarded[-3]
    ip = new_ip()
    for i in range(5):
        post(newsletter(), headers={"X-Forwarded-For": f"1.1.1.{i}, {ip}, 2.2.2.2, 3.3.3.3"})
    r = post(newsletter(), headers={"X-Forwarded-For": f"9.9.9.9, {ip}, 2.2.2.2, 3.3.3.3"})
    assert r.status_code == 429


# --- CORS via public URL
class TestCORS:
    def test_preflight_allowed(self):
        r = requests.options(f"{PUBLIC_URL}/api/lead", headers={
            "Origin": PUBLIC_URL, "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "content-type"}, timeout=15)
        assert r.status_code == 200, r.text
        assert r.headers.get("access-control-allow-origin") == PUBLIC_URL

    def test_preflight_evil(self):
        r = requests.options(f"{PUBLIC_URL}/api/lead", headers={
            "Origin": EVIL, "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "content-type"}, timeout=15)
        acao = r.headers.get("access-control-allow-origin")
        assert acao not in (EVIL, "*")

    def test_public_post_evil_origin_no_acao(self):
        r = requests.post(f"{PUBLIC_URL}/api/lead", json={"website": "x"}, headers={"Origin": EVIL}, timeout=15)
        assert r.headers.get("access-control-allow-origin") not in (EVIL, "*")

    def test_public_post_ok_honeypot(self):
        r = requests.post(f"{PUBLIC_URL}/api/lead", json={"website": "x"}, headers={"Origin": PUBLIC_URL}, timeout=15)
        assert r.status_code in (200, 429)
        if r.status_code == 200:
            assert r.headers.get("access-control-allow-origin") == PUBLIC_URL


# --- other routes
@pytest.mark.parametrize("method,path", [("GET", "/api/"), ("GET", "/api/status"), ("POST", "/api/status"),
                                         ("GET", "/docs"), ("GET", "/openapi.json"), ("GET", "/api/lead")])
def test_other_routes(method, path):
    r = requests.request(method, f"http://localhost:8001{path}", timeout=10)
    assert r.status_code != 200
    assert r.json()["ok"] is False


# --- unit tests for mailer
class TestMailerUnit:
    def test_subjects(self):
        import lead_mailer as m
        assert m.build_subject(lead()) == "New lead: TEST_Jane Doe - 2024 Toyota Camry"
        assert m.build_subject(newsletter()) == "Newsletter signup: news@example.com"
        assert m.build_subject(lead(vehicleYear=..., vehicleMake=..., vehicleModel=...)) == "New lead: TEST_Jane Doe"

    def test_escape(self):
        import lead_mailer as m
        rows = [("notes", "<script>alert(1)</script>&\"")]
        html = m.build_html("T <b>", rows)
        assert "<script>" not in html and "&lt;script&gt;" in html and "T &lt;b&gt;" in html
        assert "notes: <script>" in m.build_text("T", rows)

    def test_send_monkeypatched(self, monkeypatch):
        import asyncio
        import lead_mailer as m
        from lead_models import LeadPayload
        captured = {}
        monkeypatch.setenv("RESEND_API_KEY", "re_test_dummy")
        monkeypatch.setenv("LEAD_TO_EMAIL", "a@x.com, b@x.com")
        monkeypatch.setenv("LEAD_BCC", "c@x.com")
        monkeypatch.delenv("LEAD_FROM_EMAIL", raising=False)
        monkeypatch.setattr(m.resend.Emails, "send", lambda p: captured.update(p) or {"id": "1"})
        data = LeadPayload(**lead(notes="<b>hi</b>", source="landing")).model_dump()
        asyncio.run(m.send_submission(data, "1.2.3.4", "UA/1"))
        assert captured["from"] == "onboarding@resend.dev"
        assert captured["to"] == ["a@x.com", "b@x.com"]
        assert captured["bcc"] == ["c@x.com"]
        assert captured["reply_to"] == "jane@example.com"
        assert captured["subject"] == "New lead: TEST_Jane Doe - 2024 Toyota Camry"
        for k in ("timestamp", "1.2.3.4", "UA/1", "landing", "&lt;b&gt;hi"):
            assert k in captured["html"]
        assert "ip: 1.2.3.4" in captured["text"] and "phone: 15551234567" in captured["text"]

    def test_send_failure_raises(self, monkeypatch):
        import asyncio
        import lead_mailer as m
        monkeypatch.setenv("RESEND_API_KEY", "re_test_dummy")
        monkeypatch.setenv("LEAD_TO_EMAIL", "a@x.com")

        def boom(p):
            raise RuntimeError("nope")
        monkeypatch.setattr(m.resend.Emails, "send", boom)
        with pytest.raises(m.MailerError):
            asyncio.run(m.send_submission(newsletter(), "ip", "ua"))

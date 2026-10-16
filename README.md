# Site

React + Vite + Tailwind frontend (`/frontend`) with a single FastAPI endpoint (`/backend`), `POST /api/lead`, that emails lead and newsletter submissions through Resend.

## Lead email setup (Resend)

1. **Get an API key:** sign up at [resend.com](https://resend.com), open **API Keys**, create a key with "Sending access", and put it in `backend/.env` as `RESEND_API_KEY`. See `backend/.env.example` for all variables:
   - `RESEND_API_KEY`: your Resend key. It stays on the server and is never sent to the browser.
   - `LEAD_TO_EMAIL`: where submissions are delivered. Separate multiple addresses with commas.
   - `LEAD_FROM_EMAIL`: the sender address. Defaults to `onboarding@resend.dev`.
   - `LEAD_BCC`: optional BCC address(es), comma-separated.
2. **Verify your sending domain:** in Resend open **Domains → Add Domain** and enter your domain. Add the DNS records Resend shows (SPF/MX and DKIM TXT records, plus DMARC if you want it) at your DNS provider, then click **Verify**. Once it is verified, set `LEAD_FROM_EMAIL` to an address on that domain, e.g. `leads@yourdomain.com`.
3. **Until the domain is verified**, Resend only delivers to the email address of the Resend account owner. Sends to any other `LEAD_TO_EMAIL` address will fail.
4. **Newsletter signups arrive as emails only.** They are not added to a mailing-list service (Mailchimp, Resend Audiences, etc.), so add subscribers to your list manually.

Restart the backend after changing `.env`. If `RESEND_API_KEY` is missing, the endpoint returns a 500 and logs a clear message.

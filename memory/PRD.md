# PRD — Foundation Scaffold

## Original problem statement
Build a foundation scaffold: React + Vite + Tailwind + React Router. No backend code, auth, DB, ORM, seed data or API routes. Routes /process, /entrepreneur-loan, /calculator, /contact (placeholder heading + one sentence each); / redirects to /process. src/config/site.js holds all site-wide values (brand, owner, contact, socials, hero images, prequal link with third-party/dealer-key comment). Temporary theme: light background, bright green accent, dark header/footer direction, square feel, bold uppercase display headings.

## User choices
- Backend reduced to a bare FastAPI app (no routes/DB) to keep the platform service healthy
- No shared header/footer shell yet

## Implemented (2026-06)
- Moved from CRA/craco to Vite 6 (vite.config.mjs, root index.html, src/main.jsx)
- Removed template home page, test-id constants, health-check plugin, motor/pymongo, status routes
- App.jsx routes + / → /process redirect
- Shared PlaceholderPage component + 4 page files
- src/config/site.js
- Placeholder theme tokens in index.css (+ `chrome` color, radius 0, Anton/Work Sans fonts in tailwind config)

## Implemented — Shared layout (2026-06)
- Reusable: Eyebrow, PageHero, PrimaryButton/SecondaryButton (to/href/button), PrequalButton (primary/secondary/nav/mobile), ClosingCTA
- Layout: sticky Header (md+ announcement bar, lg+ desktop nav, hamburger mobile menu), Footer (Explore/Follow/legal bar with placeholder links), mobile sticky bottom bar
- config/nav.js holds nav links and Get Started CTA; /contact#get-started anchor via ClosingCTA on Contact page
- Hash scroll + menu close on every navigation (location.key)

## Implemented — Design system hardening (2026-06)
- OKLCH tokens in index.css; Tailwind colors via color-mix (opacity modifiers work); radius sm 0 / md 2px / lg 4px
- Figtree body, Outfit display (h1-h3 700 uppercase); .stage-gradient utility; 16px inputs <768px
- Hardened Eyebrow, PageHero (+Highlight), buttons, PrequalButton variants (nav/mobile share navStyles.js), ClosingCTA, new Section + Seo components
- Header/Footer/Mobile bar restyled; per-page title + meta (React 19 hoisting)
- Hash scroll offset via html scroll-padding-top + measured --header-h
- Note: main and footer both carry mobile bottom padding (spec requires main) -> 72px band above footer on mobile

## Implemented — Lead email endpoint (2026-06)
- POST /api/lead (server.py, lead_models.py, lead_mailer.py, rate_limit.py): lead/newsletter Pydantic models, 20KB JSON limit, honeypot, 5/IP/10min in-memory limit, Resend SDK send (HTML table + text), CORS from CORS_ORIGINS
- Client IP from X-Forwarded-For at -TRUSTED_PROXY_HOPS (3 on preview) to stop spoofing
- frontend/src/lib/submitLead.js; backend/.env.example; README Resend setup
- RESEND_API_KEY / LEAD_TO_EMAIL empty: user will add later (sends return 500 until then)

## Implemented — Process page (2026-06)
- /process: PageHero, At a Glance (3 steps), Step by Step (4 timeline rows), Dealership vs brand comparison table, ClosingCTA
- Content in pages/process/processContent.js; sections in pages/process/*.jsx
- Open placeholder: '[CONFIRM: FICO floor]' bullet; hero image still placeholder in site.js

## Implemented — Calculator logic (2026-06)
- src/config/finance.js: credit tiers, PROVISIONAL illustrative 50-state + DC fee/tax table, unknown-state fallback, lease tax methods, calculator defaults
- src/lib/finance.js: pure calcFinance / calcLease (brokerFee from site.js); lease dueAtSigning = cashDown + first payment + upfront tax + title/reg
- Vitest: src/lib/finance.test.js (`yarn test`, 10 passing)

## Backlog
- P1: Real page content per route; finalize theme tokens
- P2: Backend work when required

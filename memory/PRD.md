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

## Backlog
- P1: Real page content per route; finalize theme tokens
- P2: Backend work when required

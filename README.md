# The MAP Gem — Multi-role Analytical Decision Engine

A free, private, browser-only decision-support app. You describe a decision; the
**MAP Engine** first interviews you one question at a time to map your context,
then analyzes the decision through three expert lenses:

- **📘 The Planner** — builds the step-by-step strategy
- **🔴 The Critic** — stress-tests it for risks and failure modes
- **🟢 The Mediator** — synthesizes both into a final, risk-aware verdict

It runs entirely in the browser on top of Google's Gemini API.

---

## Why this costs nothing to run

This is a **static single-page app** — no backend, no database, no servers.

- **Hosting:** free on GitHub Pages (workflow included).
- **AI cost:** **BYOK (bring your own key)**. Each visitor enters their *own*
  Gemini API key, which is stored only in their browser (`localStorage`) and
  talks to Google directly. You, the operator, never pay for anyone's usage.
  Google's Gemini API has a free tier, so most users pay nothing either.

That means the whole thing can be published and operated for **$0**.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Open the app, click the gear icon, paste a free Gemini key
(https://aistudio.google.com/apikey), and start.

```bash
npm run build    # produces a static site in dist/
npm run preview  # serve the production build locally
```

## Deploy for free (GitHub Pages)

1. Push this repo to GitHub.
2. Go to **Settings → Pages → Build and deployment → Source** and choose
   **GitHub Actions**.
3. Every push to `main` now auto-builds and publishes via
   `.github/workflows/deploy.yml`. Your app goes live at
   `https://<your-username>.github.io/<repo>/`.

(For a custom domain or other static hosts — Vercel, Netlify, Cloudflare Pages —
just deploy the `dist/` folder; all are free for this.)

## Turning it into income (no upfront cost)

Monetization is **off by default** and configured in one place: the
`MONETIZATION` object in [`constants.tsx`](constants.tsx). Nothing fake is ever
shown until you add your own links.

1. **Tip jar / support button** — create a free
   [Ko-fi](https://ko-fi.com) or [Buy Me a Coffee](https://buymeacoffee.com)
   page, paste the URL into `MONETIZATION.support.url`, set `enabled: true`.
   A support button appears in the header.
2. **Pro prompt pack (one-time sales)** — package the expert decision templates
   as a downloadable product on [Gumroad](https://gumroad.com) or Ko-fi (both
   free to start, they take a cut only on sales). Put the product URL in
   `MONETIZATION.pro.url`, set `enabled: true`. A tasteful upsell card appears
   in the sidebar.
3. **Grow traffic** — the app is SEO-ready (title, description, Open Graph tags).
   Share it where people make hard decisions (founders, career, indie-hacker
   communities). More visitors → more tips and Pro sales.

> Honest note: these are the genuine, zero-investment levers. Actual revenue
> requires *your* payout accounts (Ko-fi/Gumroad/Stripe need your identity and
> bank details — those steps can't be automated for you), plus real traffic.
> The code does everything up to that line.

## Tech

React 19 · TypeScript · Vite · Tailwind (CDN) · `@google/genai`. Conversations
and settings persist in `localStorage`; there is no server and no telemetry.

# 💰 Daily Income Project — Running Log

**Goal:** Build genuinely useful, zero-cost digital assets that can earn real
money, ship them live, wire in revenue, and iterate day by day.

**Honest model of how money actually arrives:**
`live useful tool` → `traffic (SEO/communities)` → `monetization surface (tip / Pro / affiliate)`
→ `payment processor tied to the owner's verified identity` → `payout`.
The last two steps legally require the account owner (you) and cannot be
automated. Everything before them is automatable and is what these runs deliver.

---

## Day 1 — 2026-06-14 — Project: **InvoiceLite** (`projects/invoicelite/`)

**What shipped**
- A complete, polished, 100% client-side invoice/quote/receipt generator
  (HTML/CSS/JS, no dependencies, no backend, no API keys, no tracking).
- Live PDF export via print, autosave to localStorage, 9 currencies.
- A portfolio landing page (`projects/index.html`) that will hold each day's tool.
- GitHub Pages auto-deploy workflow (free hosting) → `https://lipk-stack.github.io/lipk-stack/`.
- Monetization wired as config (`config.js`): tip jar, Pro upsell, affiliate slots.
- `MONETIZATION.md` with the exact zero-cost steps + traffic plan.

**Verified**
- JS passes `node --check`; totals math validated (subtotal/tax/discount).

**Status of "money earned": $0 so far — not yet monetized.**
Reason: requires the owner's one-time human setup (below). No revenue can or
should be claimed before that.

**👉 Your move to switch revenue on (≈15 min, all free):**
1. Enable GitHub Pages: repo **Settings → Pages → Source: GitHub Actions**.
2. Create a free Ko-fi or Buy-Me-a-Coffee page → paste URL into
   `projects/invoicelite/config.js` (`tipUrl`).
3. (Optional, higher value) Create a Gumroad product → paste into `proUrl`.
4. Post the live link where freelancers ask "how do I make an invoice"
   (r/freelance, r/smallbusiness).

**Next iterations (planned)**
- Day 2: add a second high-search-volume free tool to the portfolio
  (candidates: QR code generator, unit/percentage calculator, image compressor —
  all client-side, all monetizable the same way) to grow traffic surface.
- Add SEO content pages + sitemap; submit to Google Search Console.
- Measure: once Pages + tip/Pro are live, traffic is the only remaining lever.

---

## Day 2 — 2026-06-15 — Two new tools + SEO + deploy fix

**Status check on Day 1**
- The Pages deploy from Day 1 **failed** at the "Setup Pages" step (run #1,
  branch guwaz5). That step fails when Pages isn't enabled in repo settings —
  i.e. the owner's one-time setup hasn't been done yet, so the site is **not
  live** (URL returns 403). `config.js` is still unmonetized (expected).

**What shipped today** (branch `claude/festive-ramanujan-7z4bqu`, built on Day 1)
- **Image Compressor & Resizer** (`projects/image-compressor/`) — drag-drop
  JPG/PNG/WebP, quality slider, max-width resize, per-file size savings, batch
  download. 100% client-side via Canvas; nothing is uploaded. High search volume
  ("compress image", "resize image") + privacy angle as the differentiator.
- **Strong Password Generator** (`projects/password-generator/`) — crypto-secure
  (`crypto.getRandomValues` + unbiased rejection sampling), char & passphrase
  modes, entropy/strength meter, copy button. Password-manager/VPN affiliates are
  among the highest-paying programs, making this a strong monetization surface.
- **Shared assets** (`projects/assets/`) — `site.css` (common look) and
  `support.js` (one monetization-rail renderer driven by each tool's `config.js`),
  so every future tool gets tip/Pro/affiliate slots for free.
- **SEO** — `sitemap.xml` + `robots.txt`, canonical + OpenGraph tags on each tool,
  and the portfolio landing page (`projects/index.html`) now features all 3 tools.
- **Deploy hardening** — `deploy-pages.yml` now sets `enablement: true` (asks
  GitHub to auto-provision Pages so the deploy stops hard-failing) and added this
  branch to the trigger list.

**Verified**
- `node --check` passes on all new JS.
- Password generator logic: 8/8 unit assertions pass (length, class coverage,
  look-alike exclusion, digits-only, 100/100 uniqueness, full-alphabet coverage
  over 5000 draws, passphrase shape, entropy monotonicity). Tested via a `.cjs`
  copy because the repo-root `package.json` sets `"type": "module"`.

**Status of "money earned": still $0.** Nothing can be claimed before the owner's
one-time setup. The blocker is unchanged from Day 1 and is the critical path.

**👉 Owner actions to make this live + earning (≈15 min, all free):**
1. **Make the repo public** (Settings → General → Danger Zone). A free GitHub plan
   only serves Pages from public repos — without this the site 404s even when the
   workflow succeeds.
2. **Merge this branch to `main`** (or tell me to) so the deploy runs from main.
3. Confirm Pages is on (Settings → Pages → Source: "GitHub Actions"). With
   `enablement: true` the workflow should provision it on the next run.
4. Add a Ko-fi/Buy-Me-a-Coffee URL to each tool's `config.js` (`tipUrl`); optional
   Gumroad `proUrl`; optional affiliate links (password manager / cloud storage).
5. Share the live links where the audience asks (r/freelance for InvoiceLite,
   r/webdev / AlternativeTo for the image + password tools).

**Next iterations (planned)**
- Day 3: add a QR-code generator and/or a unit/percentage/loan calculator
  (same client-side + shared-config pattern), and a short SEO article per tool.
- Once the repo is public + Pages live, focus shifts entirely to traffic.

---

## Day 3 — 2026-06-16 — Loan & Mortgage Calculator + tested math

**Status check on Days 1–2 (verified this run)**
- Repo is still **private** (`private: true` via the API) and the site still
  returns **403** — `https://lipk-stack.github.io/lipk-stack/` is **not live**.
- The Pages deploy is still **failing**: run #2 (branch 7z4bqu) failed in ~10s at
  "Setup Pages" even with `enablement: true`. On a **free plan a private repo
  cannot serve Pages at all**, so the enablement call can't succeed until the repo
  is public. **Making the repo public is the single unblocker** — it is owner-only
  and cannot be automated. Revenue remains **$0**, which is correct at this stage.

**What shipped today** (branch `claude/festive-ramanujan-0w0bbj`; merged Day 1–2
work forward into this branch first, then built on top)
- **Loan & Mortgage Calculator** (`projects/loan-calculator/`) — enter amount,
  rate, term (+ optional extra monthly payment) to get monthly payment, total
  interest, payoff time and a full **amortization schedule**, in 9 currencies.
  100% client-side; nothing uploaded. Personal-finance keywords ("mortgage
  calculator", "loan payment") have huge search volume and finance/refinance
  affiliate offers are among the highest-paying — a strong monetization surface.
- Wired into the shared system: uses `assets/site.css` + `assets/support.js`, has
  its own `config.js` (tip / Pro / finance-affiliate slots), and is added to the
  landing page (`projects/index.html`) and `sitemap.xml`.
- Added `claude/festive-ramanujan-0w0bbj` to the deploy workflow triggers.

**Verified**
- `node --check` passes on `app.js`.
- Amortization math is unit-tested: **16/16 assertions pass**
  (`projects/loan-calculator/app.test.cjs`) — textbook $250k @ 6.5%/30yr ≈
  $1,580.17 payment, `totalPaid = principal + totalInterest`, full amortization to
  a zero balance, zero-interest loans, per-row `principal + interest = payment`,
  monotonic balance, extra-payment savings, rate monotonicity, degenerate inputs.
  A local `package.json` (`"type":"commonjs"`) scopes the folder so the test runs
  under the ESM repo root.

**Status of "money earned": still $0.** Unchanged blocker — the owner setup below
is the critical path, not more tools.

**👉 Owner actions to make this live + earning (≈15 min, all free) — UNCHANGED:**
1. **Make the repo public** (Settings → General → Danger Zone). This is the one
   hard blocker: a free plan won't serve Pages from a private repo.
2. **Merge to `main`** (or approve) so the deploy runs from the default branch.
3. Confirm Settings → Pages → Source: "GitHub Actions" stuck (enablement should
   provision it once the repo is public).
4. Fill each tool's `config.js` `tipUrl` (free Ko-fi/Buy-Me-a-Coffee); optional
   Gumroad `proUrl`; optional affiliate links.
5. Share links: r/personalfinance for the loan calculator, r/freelance for
   InvoiceLite, r/webdev + AlternativeTo for the image + password tools. Submit
   the sitemap to Google Search Console.

**Next iterations (planned)**
- Day 4: QR-code generator and/or a short SEO how-to/FAQ article per tool for
  organic traffic. If the repo is public + Pages live by then, pivot entirely to
  traffic (content + community posts), the only remaining lever.

---

## Day 3 follow-up — 2026-06-17 — 🟢 SITE IS LIVE

The owner completed the two manual steps: **made the repo public** and **set
Settings → Pages → Source: "GitHub Actions"**. After that:
- Fast-forwarded `main` to include all four tools and pushed (so Pages deploys
  from the default branch, which the `github-pages` environment allows).
- Re-ran the deploy: run #4 (attempt 2) is **fully green** — "Setup Pages",
  "Upload artifact", and "Deploy to GitHub Pages" all succeeded
  (run id 27688145129, completed 2026-06-17 12:20 UTC).

Root cause of the earlier failures, now resolved: a free plan can't serve Pages
from a private repo, AND the Actions `GITHUB_TOKEN` is forbidden from *creating*
the Pages site (`enablement: true` hit "Resource not accessible by integration").
Enabling Pages once in the Settings UI fixed both — `enablement: true` is now an
idempotent no-op because the site already exists.

**Live URL (for real visitors):** https://lipk-stack.github.io/lipk-stack/
(Tools: loan-calculator, image-compressor, password-generator, invoicelite.)
Note: this build sandbox can't fetch `github.io` (network egress allowlist), so
the live check is the green Pages deployment, not an in-sandbox curl.

**Money status: still $0 — but now only ONE lever remains, and it's monetization
setup, not deployment.** The site is live and useful; the support rail is hidden
until each tool's `config.js` is filled. To switch revenue on (owner, one-time):
1. Create a free Ko-fi / Buy-Me-a-Coffee page → paste the URL into each tool's
   `config.js` `tipUrl`.
2. (Optional, higher value) Affiliate links: a password manager/VPN for the
   password generator; a refinance/savings/budgeting offer for the loan
   calculator; cloud storage for the image compressor. Paste into `affiliates`.
3. (Optional) A small Gumroad product → `proUrl`.
Then it's purely a traffic game (SEO articles + community posts).

**Next run (Day 4) — START HERE:** the deploy blocker is GONE. Re-verify the site
is still live and check whether any `config.js` has been filled. If monetized,
go 100% to traffic: write one short SEO how-to/FAQ page per tool, submit the
sitemap to Google Search Console, and post the live links in the right
communities. If not yet monetized, add one new tool (QR generator) and keep
nudging the owner that filling `config.js` is the only thing between live
traffic and real payouts.

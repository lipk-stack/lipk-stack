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

---

## Day 4 — 2026-06-18 — Word & Character Counter + first SEO guide

**Status check on Days 1–3 (verified this run via the GitHub API)**
- Site is **still live**: latest Pages deploy is run #4 on `main`
  (sha `73174f4`), conclusion **success** (2026-06-17 12:20 UTC). The four prior
  tools are serving at https://lipk-stack.github.io/lipk-stack/.
- **Money is still $0.** Checked every tool's `config.js` — all `tipUrl` /
  `proUrl` / `affiliates` are still empty, so the support rail is correctly
  hidden and nothing can be earned yet. The blocker is unchanged and owner-only:
  no payment/affiliate account is connected. This is the entire critical path.

**What shipped today** (branch `claude/festive-ramanujan-agfoc2`, built on the
live `main` state)
- **Word & Character Counter** (`projects/word-counter/`) — live counts for
  words, characters (with/without spaces), sentences, paragraphs, reading time,
  speaking time and **keyword density**, with local autosave. 100% client-side;
  nothing uploaded. "Word counter" / "character counter" are very high-volume
  evergreen searches (students, writers, marketers, social-post limits), and the
  audience pairs with high-converting writing-tool affiliates (Grammarly /
  ProWritingAid) — a strong monetization surface. Wired to the shared
  `assets/site.css` + `assets/support.js` with its own `config.js`.
- **First SEO content page** (`projects/guides/ideal-word-counts.html`) — an
  evergreen reference ("ideal word counts for essays, blogs, emails, social")
  with real platform character limits. It internally links to all five tools to
  start building organic discovery — traffic is now the main remaining lever, so
  this begins the content engine the roadmap called for.
- Wired in: landing page (`projects/index.html`) features the new tool;
  `sitemap.xml` includes the tool + the guide; the counter links to the guide
  and vice-versa; new shared `.stats`/`.stat`/`.chips` styles in `site.css`
  (reusable by future tools); this branch added to the deploy workflow triggers.

**Verified**
- `node --check` passes on `app.js`.
- Counting logic is unit-tested: **21/21 assertions pass**
  (`projects/word-counter/app.test.cjs`) — empty/whitespace input, word counts,
  Unicode + hyphenated words, multi-space collapsing, sentence detection
  (incl. grouped `...?!` and unterminated fragments), blank-line paragraph
  splitting, reading/speaking-time thresholds, and keyword density with
  stop-word exclusion and frequency ranking. A local `package.json`
  (`"type":"commonjs"`) scopes the folder under the ESM repo root.

**Status of "money earned": still $0 — and this is correct.** No revenue can or
should be claimed before the owner connects a payout/affiliate account. More
tools do not change this; the lever is owner setup + traffic.

**Deploy note:** the four existing tools stay live regardless. To put **today's**
additions (word counter + guide) on the live site, this branch needs to reach
`main` — the `github-pages` environment deploys from the default branch. Per this
run's instructions I pushed only to `claude/festive-ramanujan-agfoc2` and did not
push to `main`. **Merge `claude/festive-ramanujan-agfoc2` → `main`** (or say the
word) to publish them.

**👉 Owner actions to turn live traffic into real money (≈15 min, all free) —
the ONLY thing standing between the live site and payouts:**
1. Create a free **Ko-fi / Buy-Me-a-Coffee** page → paste the URL into each
   tool's `config.js` `tipUrl`. (Lowest-friction first dollar.)
2. **Affiliate links** (highest value): Grammarly/ProWritingAid for the word
   counter; a password manager/VPN for the password generator; a
   refinance/high-yield-savings offer for the loan calculator; cloud storage for
   the image compressor; Wise/Wave for InvoiceLite. Sign-up is free; paste your
   referral URLs into each `config.js` `affiliates`.
3. Submit `sitemap.xml` to **Google Search Console** and post the live links
   where the audience asks (r/writing & r/students for the counter, r/freelance
   for InvoiceLite, r/personalfinance for the loan calc).

**Next iterations (planned)**
- Day 5: add a QR-code generator (vendor a small MIT-licensed encoder locally so
  it's correct + offline) and/or a JSON formatter for the developer audience;
  write a second SEO guide. If `config.js` gets filled, pivot 100% to traffic
  (content + community posts + Search Console), the only remaining lever.

### Day 4 addendum — new indirect monetization model: a sellable digital product

Prompted to find *other*, indirect ways to convert to money, I added a third
revenue model on top of tips + affiliates. Tips/affiliates both need a steady
traffic firehose; a **digital product can earn from a single share**, so it's a
better fit for a brand-new site with little traffic.

**What shipped**
- **The Get-Paid Playbook** (`products/get-paid-playbook/playbook.md`) — a
  ~1,300-word practical guide for freelancers: the 2-minute terms-setting script,
  a paid-on-sight invoice checklist, and a proven **4-email late-payment
  follow-up sequence**. This is genuinely sellable content and pairs directly
  with InvoiceLite's audience (the exact buyers).
- A formatted copy was created in the owner's **Google Drive** ("The Get-Paid
  Playbook — sellable product — export to PDF"), ready to export to PDF and
  upload to Gumroad.
- **Live sales/funnel page** (`projects/get-paid-playbook/`) — describes the
  product, shows a free email-preview to build trust, and funnels readers to the
  free invoice generator. It is **config-driven**: until the owner pastes a
  Gumroad link into `config.js` `buyUrl`, it shows a "coming soon" note and still
  earns its keep as SEO content + a funnel. Once `buyUrl` is set, a real Buy
  button appears automatically. Optional Ko-fi tip jar via the shared rail.
- Wired into the landing page + `sitemap.xml`. Inline JS + config syntax-checked.

**Why this is the strongest indirect path available right now:** the owner
already has the matching audience surface (the invoice tool), perceived value is
high (recovering one late invoice pays for the guide many times over), and the
same content can be sold *or* used as a free lead magnet to build an email list
to monetize later.

**Money status: still $0 — and the wall is the same and unavoidable.** Every
real-money rail (tips, affiliates, product sales, ads, sponsorship, crypto) ends
at an account tied to the owner's legal identity (bank/KYC). That single signup
cannot be automated. What changed today is that the owner's one action now
unlocks *three* models instead of one, and the product model needs only ~5 min
(export PDF → free Gumroad upload → paste link).

**👉 To turn the product on (≈5 min, free):** Drive → open the playbook → File →
Download → PDF → create a free Gumroad/Lemon Squeezy product → upload → set price
($7–15) → paste the link into `projects/get-paid-playbook/config.js` `buyUrl`.

# InvoiceLite — How this turns into real money

This tool costs **$0** to build and host. It can earn money through three
zero-cost channels. None of them require any spend; they only require **your**
identity + payout details, which I cannot create on your behalf.

Open `config.js` and fill in any of the following — each one you fill switches
on a revenue surface in the UI automatically.

## 1. Tip jar (fastest, 0% setup friction)
- Create a free page at **Buy Me a Coffee** (buymeacoffee.com) or **Ko-fi**
  (ko-fi.com). Ko-fi takes **0% fees** on tips.
- Paste the page URL into `tipUrl` in `config.js`.
- Result: a "☕ buy me a coffee" button appears, and the invoice footer links to it.

## 2. "Pro template pack" upsell (highest revenue per user)
- Create a free seller account at **Gumroad** or **Lemon Squeezy**.
- Sell a small digital product, e.g. *"InvoiceLite Pro — 6 designer templates +
  remove footer"* for $5–9. They charge only a small % **when you actually sell**.
- Paste the product URL into `proUrl`.
- Result: a "⭐ Get the Pro template pack" button appears in the support rail.

## 3. Affiliate links (passive, recurring)
- Your users are freelancers/small businesses who need: a business bank /
  payment account (Wise, Payoneer), accounting (Wave — free, has affiliate),
  contracts, etc.
- Join those programs (free) and add `{ label, url }` entries to `affiliates`.
- Result: a tasteful "Recommended tools" list appears; you earn commission on signups.

## Why no money is "auto-earned" yet
Real payments require KYC (identity verification) and a bank/payout method tied
to **you** — that is a legal requirement of every payment processor, and it is
the one step that cannot be automated. Everything up to that point (the product,
the live site, the buttons, the SEO) is already done here.

## Getting traffic (the real lever)
Revenue = traffic × conversion. Zero-cost traffic ideas, in priority order:
1. **SEO** — the page already targets "free invoice generator / no signup". Add
   a short blog post or two and submit the sitemap to Google Search Console.
2. **Reddit / forums** — answer "how do I make an invoice" questions in
   r/freelance, r/smallbusiness with a genuine link.
3. **Product directories** — list free on AlternativeTo, list on a "free tools"
   roundup, submit to BetaList / Product Hunt.

# Free Tools — a zero-cost, privacy-first web toolset

A growing collection of genuinely useful, **100% client-side** web tools. No
sign-up, no tracking, no backend, no API keys — everything runs in the browser,
so nothing you type or upload ever leaves your device. Hosted for free on GitHub
Pages.

**Live site:** https://lipk-stack.github.io/lipk-stack/

## Tools

| Tool | What it does |
| --- | --- |
| [InvoiceLite](projects/invoicelite/) | Invoice / quote / receipt generator with PDF export, 9 currencies |
| [Image Compressor & Resizer](projects/image-compressor/) | Drag-drop compress + resize JPG/PNG/WebP via Canvas |
| [Strong Password Generator](projects/password-generator/) | Crypto-secure passwords & passphrases with an entropy meter |
| [Loan & Mortgage Calculator](projects/loan-calculator/) | Monthly payment, total interest, full amortization schedule |
| [Word & Character Counter](projects/word-counter/) | Words, characters, reading time, keyword density |
| [JSON Formatter & Validator](projects/json-formatter/) | Beautify, minify, validate with exact line/column errors |

Plus free SEO [guides](projects/guides/) and a sellable
[Get-Paid Playbook](products/get-paid-playbook/) funnel.

## Architecture

```
projects/            ← the deployed static site (this is what GitHub Pages serves)
  assets/            ← shared site.css, support.js (monetization rail), site-config.js,
                       favicon.svg + og-image.png (1200×630 social-share card)
  <tool>/            ← each tool: index.html, app.js, config.js, README.md
  guides/            ← evergreen SEO content pages
products/            ← source content for sellable digital products
```

Each tool is self-contained static HTML/JS/CSS. Shared look-and-feel lives in
`projects/assets/`. The monetization rail is opt-in and entirely config-driven.

## Running locally

No build step. Serve the `projects/` folder with any static server:

```bash
cd projects && python3 -m http.server 8000
# open http://localhost:8000
```

## Tests

Tool logic is unit-tested with Node's built-in runner (no dependencies):

```bash
find projects -name '*.test.cjs' -exec node {} \;
```

CI (`.github/workflows/deploy-pages.yml`) syntax-checks every tool's JS and runs
all tests on each push; the deploy job publishes `projects/` to GitHub Pages from
`main`.

## Switching on revenue (owner, one-time, zero-cost)

The tools are free and useful as-is. To monetize, edit
[`projects/assets/site-config.js`](projects/assets/site-config.js) **once** with a
free Ko-fi / Buy-Me-a-Coffee tip URL — it lights up the tip button on every tool.
Per-tool affiliate links go in each tool's `config.js`. These steps require the
owner's identity and payout details and cannot be automated.

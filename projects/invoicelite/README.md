# 🧾 InvoiceLite

A free, **100% client-side** invoice, quote & receipt generator. No backend,
no dependencies, no sign-up, no tracking. Your data is saved only in your
browser's localStorage and never leaves your device.

## Features
- Invoice / Quote / Receipt modes
- Live PDF preview, export via browser "Download PDF" (print)
- Line items with qty × rate, tax %, flat discount
- 9 currencies, custom accent color, your logo-free clean layout
- Auto-saves as you type; "Load sample" and "Reset"

## Run locally
It's a static site — just open `index.html`, or serve the folder:

```bash
python3 -m http.server   # then visit http://localhost:8000/projects/invoicelite/
```

## Deploy (free)
Pushed to GitHub Pages automatically by `.github/workflows/deploy-pages.yml`.
Live at `https://lipk-stack.github.io/lipk-stack/invoicelite/` once Pages is
enabled (Settings → Pages → Source: GitHub Actions).

## Monetization
See [MONETIZATION.md](./MONETIZATION.md). Fill in `config.js` to switch on the
tip jar, Pro upsell, and affiliate slots.

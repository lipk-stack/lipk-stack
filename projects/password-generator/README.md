# Strong Password Generator

A cryptographically secure password & passphrase generator that runs entirely
in the browser. Uses `crypto.getRandomValues` with unbiased rejection sampling —
**nothing is sent anywhere**.

- Live URL (once Pages is enabled): https://lipk-stack.github.io/lipk-stack/password-generator/
- Files: `index.html`, `app.js`, `config.js` (+ shared `../assets/site.css`, `../assets/support.js`)

## Features
- Random-character mode (length 6–64, choose character classes, avoid look-alikes)
- Memorable passphrase mode (3–8 words, capitalization, number)
- Live entropy estimate + strength meter
- One-click copy

## Testing
The generation logic is exported for Node testing. Because the repo root
`package.json` sets `"type": "module"`, copy the file to a `.cjs` name first:

```bash
cp app.js /tmp/pg.cjs && node -e 'const pg=require("/tmp/pg.cjs"); console.log(pg.generateChars({length:16,lower:true,upper:true,digits:true,symbols:true}))'
```

## Monetization
See `config.js`. Password managers and VPNs are among the highest-paying
affiliate programs, which makes this tool a strong monetization surface.
Optional and hidden until configured by the owner.

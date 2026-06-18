# Word & Character Counter

A free, 100% client-side word and character counter. Type or paste text to get
live counts for **words, characters (with/without spaces), sentences,
paragraphs, reading time, speaking time, and keyword density**. Nothing is
uploaded — text autosaves to `localStorage` only.

- **No build step, no dependencies, no backend.** Open `index.html`.
- Counting logic lives in `app.js` and is exported for tests via CommonJS.
- Monetization is config-driven (`config.js`) and hidden until you fill it in.

## Tests

```bash
node app.test.cjs   # 21 assertions: counts, sentences, paragraphs, timing, keyword density
```

`package.json` sets `"type":"commonjs"` so the test runs even though the repo
root is an ESM package.

## Why this tool

"Word counter" / "character counter" are very high-volume evergreen searches
(students, writers, marketers, social posts with character limits). The privacy
angle (nothing uploaded) and keyword-density feature differentiate it, and the
audience pairs naturally with high-converting writing-tool affiliate programs.

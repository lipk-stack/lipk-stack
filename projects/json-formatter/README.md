# JSON Formatter & Validator

A free, 100% client-side JSON formatter, minifier and validator. Paste JSON to
**beautify** (2/4-space or tab indent, optional deep key-sort), **minify**, or
**validate** with the exact syntax error (line & column). It also shows quick
structure stats (objects, arrays, keys, depth).

- **Correct by construction:** uses the browser's own `JSON.parse` /
  `JSON.stringify`, so behaviour matches the JSON spec exactly.
- **Private:** nothing is uploaded — safe for sensitive payloads (tokens,
  customer data), unlike many online JSON tools.
- **No build, no deps, no signup.** Autosaves to `localStorage`.

## Why this tool
"json formatter", "json validator", "json beautifier" and "minify json" are
huge, evergreen developer searches. The audience pairs naturally with
high-converting developer-tool affiliate programs (API clients, managed
databases/hosting, monitoring), making it a strong monetization surface — see
`config.js`.

## Tests
`app.js` exposes its pure logic (`validate`, `format`, `minify`, `stats`,
`deepSort`) as a CommonJS module, so the shipped code is the tested code.

```
node app.test.cjs   # 34/34 assertions
```

(A local `package.json` sets `"type":"commonjs"` so the `.cjs` test runs under
the ESM repo root.)

/* Unit tests for the JSON Formatter & Validator. Run: node app.test.cjs */
const T = require("./app.js");
let pass = 0, fail = 0;
function eq(actual, expected, msg) {
  const a = JSON.stringify(actual), e = JSON.stringify(expected);
  if (a === e) { pass++; }
  else { fail++; console.error("FAIL: " + msg + "\n  expected " + e + "\n  got      " + a); }
}
function ok(cond, msg) { if (cond) { pass++; } else { fail++; console.error("FAIL: " + msg); } }

// --- validate ---
ok(T.validate('{"a":1}').ok, "valid object parses");
ok(T.validate("[1,2,3]").ok, "valid array parses");
eq(T.validate('{"a":1}').value, { a: 1 }, "validate returns parsed value");
ok(!T.validate("").ok, "empty input is invalid");
ok(!T.validate("   ").ok, "whitespace-only is invalid");
ok(!T.validate('{"a":}').ok, "missing value is invalid");
ok(!T.validate("{a:1}").ok, "unquoted key is invalid");
ok(!T.validate("{'a':1}").ok, "single quotes are invalid JSON");
ok(!T.validate('{"a":1,}').ok, "trailing comma is invalid");

// error carries a message + (when available) a position
const bad = T.validate('{\n  "a": 1\n  "b": 2\n}');
ok(!bad.ok, "missing comma is invalid");
ok(typeof bad.error.message === "string" && bad.error.message.length > 0, "error has a message");

// --- format ---
const f = T.format('{"b":1,"a":2}', 2);
ok(f.ok, "format ok on valid input");
eq(f.output, '{\n  "b": 1,\n  "a": 2\n}', "2-space pretty print preserves key order");
eq(T.format('{"a":1}', 4).output, '{\n    "a": 1\n}', "4-space indent");
eq(T.format('{"a":1}', "\t").output, '{\n\t"a": 1\n}', "tab indent");
eq(T.format("[1,2]", "tab").output, '[\n\t1,\n\t2\n]', '"tab" keyword indent');
ok(!T.format("{bad}", 2).ok, "format fails on invalid input");
eq(T.format("{bad}", 2).output, "", "failed format has empty output");

// sort keys (deep, stable)
eq(T.format('{"b":1,"a":{"d":4,"c":3}}', 0, true).output,
   '{"a":{"c":3,"d":4},"b":1}', "sortKeys sorts nested keys");

// round-trip: formatting then re-parsing yields the same value
const src = '{"name":"x","nums":[3,1,2],"nested":{"z":true,"y":null}}';
eq(JSON.parse(T.format(src, 2).output), JSON.parse(src), "format round-trips to same value");

// --- minify ---
eq(T.minify('{\n  "a": 1,\n  "b": [1, 2, 3]\n}').output, '{"a":1,"b":[1,2,3]}', "minify strips whitespace");
ok(!T.minify("nope").ok, "minify fails on invalid input");

// --- deepSort doesn't reorder arrays ---
eq(T.deepSort([3, 1, 2]), [3, 1, 2], "arrays keep order under deepSort");

// --- stats ---
const s = T.stats(JSON.parse('{"a":1,"b":[true,null,"x"],"c":{"d":2}}'));
eq(s.objects, 2, "two objects");
eq(s.arrays, 1, "one array");
eq(s.keys, 4, "four keys total (a,b,c,d)");
eq(s.numbers, 2, "two numbers");
eq(s.strings, 1, "one string");
eq(s.booleans, 1, "one boolean");
eq(s.nulls, 1, "one null");
eq(s.depth, 3, "max nesting depth 3 (object > array > leaf)");
eq(T.stats(5).depth, 0, "scalar has depth 0");

// --- lineColFromPos ---
eq(T.lineColFromPos("abc\ndef", 5), { line: 2, column: 2 }, "position maps to line/column");
eq(T.lineColFromPos("abc", 0), { line: 1, column: 1 }, "start maps to 1:1");

console.log((fail ? "✗ " : "✓ ") + pass + " passed, " + fail + " failed");
process.exit(fail ? 1 : 0);

/*
 * JSON Formatter & Validator — pure, dependency-free logic.
 * Correct by construction: it uses the engine's own JSON.parse / JSON.stringify,
 * so formatting and validation match the JSON spec exactly. The functions are
 * deterministic and unit-tested (see app.test.cjs). The file works both as a
 * browser <script> and as a CommonJS module, so the code that ships is the code
 * that's tested. Nothing is ever uploaded — it all runs on the user's device.
 */
(function (root) {
  "use strict";

  // Turn a 0-based character offset into a 1-based {line, column}.
  function lineColFromPos(text, pos) {
    if (pos == null || pos < 0) return null;
    var line = 1, col = 1;
    var n = Math.min(pos, text.length);
    for (var i = 0; i < n; i++) {
      if (text[i] === "\n") { line++; col = 1; } else { col++; }
    }
    return { line: line, column: col };
  }

  // Best-effort extraction of an error position from a SyntaxError message.
  // V8 ("...at position 12"), and some engines include line/column directly.
  function positionFromError(err, text) {
    var msg = String(err && err.message || err || "");
    var m = msg.match(/position\s+(\d+)/i);
    if (m) {
      var pos = parseInt(m[1], 10);
      var lc = lineColFromPos(text, pos);
      return { position: pos, line: lc && lc.line, column: lc && lc.column };
    }
    var lm = msg.match(/line\s+(\d+)\s+column\s+(\d+)/i);
    if (lm) return { position: null, line: parseInt(lm[1], 10), column: parseInt(lm[2], 10) };
    return { position: null, line: null, column: null };
  }

  // Validate JSON. Returns { ok:true, value } or { ok:false, error:{message,...} }.
  function validate(text) {
    text = text == null ? "" : String(text);
    if (text.trim() === "") {
      return { ok: false, error: { message: "Empty input — nothing to parse.", position: null, line: null, column: null } };
    }
    try {
      var value = JSON.parse(text);
      return { ok: true, value: value };
    } catch (e) {
      var p = positionFromError(e, text);
      return { ok: false, error: {
        message: String(e && e.message || e),
        position: p.position, line: p.line, column: p.column
      } };
    }
  }

  // Pretty-print with the given indent (number of spaces, or "\t"). Sorting keys
  // is optional and stable.
  function format(text, indent, sortKeys) {
    var v = validate(text);
    if (!v.ok) return { ok: false, error: v.error, output: "" };
    var space = (indent === "\t" || indent === "tab") ? "\t"
      : (typeof indent === "number" ? indent : 2);
    var value = sortKeys ? deepSort(v.value) : v.value;
    return { ok: true, output: JSON.stringify(value, null, space) };
  }

  // Minify: smallest valid representation, no whitespace.
  function minify(text) {
    var v = validate(text);
    if (!v.ok) return { ok: false, error: v.error, output: "" };
    return { ok: true, output: JSON.stringify(v.value) };
  }

  // Recursively sort object keys so diffs are stable. Arrays keep their order.
  function deepSort(value) {
    if (Array.isArray(value)) return value.map(deepSort);
    if (value && typeof value === "object") {
      var out = {};
      Object.keys(value).sort().forEach(function (k) { out[k] = deepSort(value[k]); });
      return out;
    }
    return value;
  }

  // Structural stats about a parsed value: counts + maximum nesting depth.
  function stats(value) {
    var s = { objects: 0, arrays: 0, keys: 0, strings: 0, numbers: 0, booleans: 0, nulls: 0, depth: 0 };
    (function walk(v, depth) {
      if (depth > s.depth) s.depth = depth;
      if (Array.isArray(v)) {
        s.arrays++;
        v.forEach(function (item) { walk(item, depth + 1); });
      } else if (v && typeof v === "object") {
        s.objects++;
        var ks = Object.keys(v);
        s.keys += ks.length;
        ks.forEach(function (k) { walk(v[k], depth + 1); });
      } else if (typeof v === "string") { s.strings++; }
      else if (typeof v === "number") { s.numbers++; }
      else if (typeof v === "boolean") { s.booleans++; }
      else if (v === null) { s.nulls++; }
    })(value, value && typeof value === "object" ? 1 : 0);
    return s;
  }

  var api = { validate: validate, format: format, minify: minify, stats: stats,
              deepSort: deepSort, lineColFromPos: lineColFromPos };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;            // Node / tests
  } else {
    root.JSONTOOL = api;             // browser global

    // ---- Browser wiring (skipped under Node) ----
    if (typeof document !== "undefined") {
      document.addEventListener("DOMContentLoaded", function () {
        var input = document.getElementById("input");
        var output = document.getElementById("output");
        var status = document.getElementById("status");
        var statsEl = document.getElementById("stats");
        var indentSel = document.getElementById("indent");
        var sortChk = document.getElementById("sortKeys");
        if (!input || !output) return;

        var KEY = "jsonformatter:text";
        try {
          var saved = localStorage.getItem(KEY);
          if (saved != null) input.value = saved;
        } catch (e) {}

        function indentValue() {
          var v = indentSel ? indentSel.value : "2";
          return v === "tab" ? "\t" : parseInt(v, 10);
        }

        function setStatus(ok, text) {
          if (!status) return;
          status.textContent = text;
          status.className = "json-status " + (ok ? "ok" : "err");
        }

        function renderStats(value) {
          if (!statsEl) return;
          var s = stats(value);
          statsEl.hidden = false;
          statsEl.innerHTML =
            cell(s.objects, "Objects") + cell(s.arrays, "Arrays") +
            cell(s.keys, "Keys") + cell(s.strings, "Strings") +
            cell(s.numbers, "Numbers") + cell(s.depth, "Max depth");
        }
        function cell(n, label) {
          return '<div class="stat"><span class="num">' + n +
                 '</span><span class="lbl">' + label + "</span></div>";
        }

        function run(mode) {
          try { localStorage.setItem(KEY, input.value); } catch (e) {}
          var res = mode === "minify"
            ? minify(input.value)
            : format(input.value, indentValue(), sortChk && sortChk.checked);
          if (res.ok) {
            output.value = res.output;
            var v = validate(input.value);
            renderStats(v.value);
            setStatus(true, "✓ Valid JSON");
          } else {
            output.value = "";
            if (statsEl) statsEl.hidden = true;
            var loc = res.error.line ? " (line " + res.error.line +
              ", column " + res.error.column + ")" : "";
            setStatus(false, "✗ " + res.error.message + loc);
          }
        }

        var f = document.getElementById("format");
        var m = document.getElementById("minify");
        var c = document.getElementById("clear");
        var cp = document.getElementById("copy");
        if (f) f.addEventListener("click", function () { run("format"); });
        if (m) m.addEventListener("click", function () { run("minify"); });
        if (indentSel) indentSel.addEventListener("change", function () { run("format"); });
        if (sortChk) sortChk.addEventListener("change", function () { run("format"); });
        if (c) c.addEventListener("click", function () {
          input.value = ""; output.value = "";
          if (statsEl) statsEl.hidden = true;
          if (status) status.textContent = "";
          try { localStorage.removeItem(KEY); } catch (e) {}
          input.focus();
        });
        if (cp) cp.addEventListener("click", function () {
          navigator.clipboard && navigator.clipboard.writeText(output.value);
          cp.textContent = "Copied"; setTimeout(function () { cp.textContent = "Copy output"; }, 1200);
        });

        if (input.value.trim()) run("format");
      });
    }
  }
})(typeof globalThis !== "undefined" ? globalThis : this);

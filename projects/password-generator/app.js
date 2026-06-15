/*
 * Strong Password Generator — 100% client-side, cryptographically secure.
 * Core logic is written to also run under Node for testing (see the export
 * at the bottom). In the browser it wires up the UI.
 */
(function (root) {
  "use strict";

  // Cross-environment crypto (browser: window.crypto; Node 18+: globalThis.crypto).
  var cryptoObj = (typeof root !== "undefined" && root.crypto) ||
    (typeof globalThis !== "undefined" && globalThis.crypto);

  var LOWER = "abcdefghijklmnopqrstuvwxyz";
  var UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var DIGITS = "0123456789";
  var SYMBOLS = "!@#$%^&*()-_=+[]{};:,.?";
  var AMBIGUOUS = /[Il1O0o]/g;

  // A small, hand-picked wordlist for memorable passphrases (no offensive/ambiguous words).
  var WORDS = ("amber anchor apple aurora basil beacon birch breeze cactus canyon cedar cobalt " +
    "comet copper coral crimson delta ember falcon fern forest galaxy garnet ginger granite " +
    "harbor hazel indigo island ivory jasper jungle kelp lagoon lantern lemon lily lunar maple " +
    "marble meadow meteor mint nebula nectar oasis ocean olive onyx opal orbit otter pebble " +
    "pepper pine pixel plum prairie quartz quill raven reef ripple river saffron sage sapphire " +
    "shadow silver slate solar spruce storm summit tango thistle tiger topaz tulip umber valley " +
    "velvet violet walnut willow zephyr zinc").split(" ");

  // Unbiased random integer in [0, max) using rejection sampling over a Uint32.
  function randInt(max) {
    var arr = new Uint32Array(1);
    var limit = Math.floor(0x100000000 / max) * max; // largest multiple of max <= 2^32
    var x;
    do { cryptoObj.getRandomValues(arr); x = arr[0]; } while (x >= limit);
    return x % max;
  }

  function pick(str) { return str.charAt(randInt(str.length)); }

  // Fisher–Yates shuffle (in place) using the secure RNG.
  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = randInt(i + 1);
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }

  // Build the character-mode password. Guarantees at least one char from each
  // selected class (when length allows), then fills the rest and shuffles.
  function generateChars(opts) {
    var sets = [];
    if (opts.lower) sets.push(LOWER);
    if (opts.upper) sets.push(UPPER);
    if (opts.digits) sets.push(DIGITS);
    if (opts.symbols) sets.push(SYMBOLS);
    if (!sets.length) sets.push(LOWER); // never produce an empty alphabet

    if (opts.noAmbig) {
      sets = sets.map(function (s) { return s.replace(AMBIGUOUS, ""); }).filter(function (s) { return s.length; });
      if (!sets.length) sets.push(LOWER.replace(AMBIGUOUS, ""));
    }

    var len = Math.max(opts.length || 16, 1);
    var chars = [];
    // One guaranteed character from each set (only as many as fit).
    for (var i = 0; i < sets.length && i < len; i++) chars.push(pick(sets[i]));
    var pool = sets.join("");
    while (chars.length < len) chars.push(pick(pool));
    return shuffle(chars).join("");
  }

  function generateWords(opts) {
    var n = Math.max(opts.wordCount || 4, 1);
    var parts = [];
    for (var i = 0; i < n; i++) {
      var w = WORDS[randInt(WORDS.length)];
      if (opts.wordCap) w = w.charAt(0).toUpperCase() + w.slice(1);
      parts.push(w);
    }
    var pw = parts.join("-");
    if (opts.wordNum) pw += "-" + randInt(100);
    return pw;
  }

  function generate(opts) {
    return opts.mode === "words" ? generateWords(opts) : generateChars(opts);
  }

  // Rough strength estimate via Shannon-style entropy bits = length * log2(poolSize).
  function entropyBits(pw, opts) {
    if (opts.mode === "words") {
      var bitsPerWord = Math.log2(WORDS.length);
      var bits = (opts.wordCount || 4) * bitsPerWord;
      if (opts.wordNum) bits += Math.log2(100);
      return Math.round(bits);
    }
    var pool = 0;
    if (opts.lower) pool += 26;
    if (opts.upper) pool += 26;
    if (opts.digits) pool += 10;
    if (opts.symbols) pool += SYMBOLS.length;
    if (!pool) pool = 26;
    return Math.round(pw.length * Math.log2(pool));
  }

  function rating(bits) {
    if (bits < 40) return { label: "Weak", color: "#f87171", pct: 25 };
    if (bits < 60) return { label: "Fair", color: "#f59e0b", pct: 50 };
    if (bits < 80) return { label: "Strong", color: "#34d399", pct: 75 };
    return { label: "Very strong", color: "#14b8a6", pct: 100 };
  }

  var api = { generate: generate, generateChars: generateChars, generateWords: generateWords,
    entropyBits: entropyBits, rating: rating, WORDS: WORDS };

  // --- Node export for testing ----------------------------------------------
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
    return;
  }

  // --- Browser UI ------------------------------------------------------------
  var $ = function (id) { return document.getElementById(id); };

  function readOpts() {
    return {
      mode: $("mode").value,
      length: parseInt($("length").value, 10),
      lower: $("lower").checked, upper: $("upper").checked,
      digits: $("digits").checked, symbols: $("symbols").checked,
      noAmbig: $("noAmbig").checked,
      wordCount: parseInt($("wordCount").value, 10),
      wordCap: $("wordCap").checked, wordNum: $("wordNum").checked,
    };
  }

  function render() {
    var opts = readOpts();
    var pw = generate(opts);
    $("out").textContent = pw;
    var bits = entropyBits(pw, opts);
    var r = rating(bits);
    $("strength").innerHTML =
      '<div style="height:8px; background:var(--panel-2); border-radius:6px; overflow:hidden; margin-bottom:.35rem;">' +
        '<div style="height:100%; width:' + r.pct + '%; background:' + r.color + ';"></div></div>' +
      '<span style="color:' + r.color + '; font-weight:600;">' + r.label + '</span>' +
      ' <span class="muted">· ~' + bits + ' bits of entropy</span>';
  }

  function syncModeUI() {
    var words = $("mode").value === "words";
    $("charOpts").style.display = words ? "none" : "";
    $("wordOpts").style.display = words ? "" : "none";
  }

  document.addEventListener("DOMContentLoaded", function () {
    $("length").addEventListener("input", function () { $("lenVal").textContent = $("length").value; render(); });
    $("wordCount").addEventListener("input", function () { $("wcVal").textContent = $("wordCount").value; render(); });
    $("mode").addEventListener("change", function () { syncModeUI(); render(); });
    ["lower", "upper", "digits", "symbols", "noAmbig", "wordCap", "wordNum"].forEach(function (id) {
      $(id).addEventListener("change", render);
    });
    $("regen").addEventListener("click", render);
    $("copy").addEventListener("click", function () {
      var text = $("out").textContent;
      if (!text || text === "—") return;
      navigator.clipboard.writeText(text).then(function () {
        var b = $("copy"); var old = b.textContent;
        b.textContent = "✓ Copied"; setTimeout(function () { b.textContent = old; }, 1200);
      });
    });
    syncModeUI();
    render();
  });
})(typeof window !== "undefined" ? window : this);

/*
 * Word & Character Counter — pure, dependency-free counting logic.
 * The functions below are deterministic and unit-tested (see app.test.cjs).
 * The file works both as a browser <script> and as a CommonJS module so the
 * exact same code that ships is the code that's tested.
 */
(function (root) {
  "use strict";

  // A small English stop-word list so "keyword density" surfaces meaningful
  // terms instead of "the / and / of". Intentionally short and predictable.
  var STOP = {};
  ("a an and are as at be but by for from has have he her his i in is it its of on or " +
   "that the their they this to was were will with you your our we").split(" ")
    .forEach(function (w) { STOP[w] = true; });

  function words(text) {
    var m = String(text).trim().match(/[^\s]+/g);
    return m || [];
  }

  function sentences(text) {
    var m = String(text).match(/[^.!?]+[.!?]+(\s|$)/g);
    // Count a trailing fragment with no terminal punctuation as one sentence.
    var trailing = String(text).replace(/[^.!?]+[.!?]+(\s|$)/g, "").trim();
    return (m ? m.length : 0) + (trailing ? 1 : 0);
  }

  function paragraphs(text) {
    var t = String(text).trim();
    if (!t) return 0;
    return t.split(/\n{2,}/).map(function (p) { return p.trim(); })
            .filter(Boolean).length;
  }

  // Reading/speaking time in whole minutes (rounded up), with raw minutes too.
  function minutes(wordCount, wpm) {
    var raw = wordCount / wpm;
    return { raw: raw, ceil: Math.max(wordCount > 0 ? 1 : 0, Math.ceil(raw)) };
  }

  function keywordDensity(text, top) {
    var ws = words(text.toLowerCase().replace(/[^\p{L}\p{N}'\s-]/gu, " "));
    var total = ws.length;
    var counts = {};
    ws.forEach(function (w) {
      w = w.replace(/^[-']+|[-']+$/g, "");
      if (!w || w.length < 2 || STOP[w]) return;
      counts[w] = (counts[w] || 0) + 1;
    });
    var arr = Object.keys(counts).map(function (k) {
      return { word: k, count: counts[k], pct: total ? (counts[k] / total) * 100 : 0 };
    });
    arr.sort(function (a, b) { return b.count - a.count || a.word.localeCompare(b.word); });
    return arr.slice(0, top || 5);
  }

  function analyze(text) {
    text = text == null ? "" : String(text);
    var ws = words(text);
    return {
      characters: text.length,
      charactersNoSpaces: text.replace(/\s/g, "").length,
      words: ws.length,
      sentences: sentences(text),
      paragraphs: paragraphs(text),
      readingTime: minutes(ws.length, 200),  // average silent reading
      speakingTime: minutes(ws.length, 130), // average speaking pace
      keywords: keywordDensity(text, 5),
    };
  }

  var api = { analyze: analyze, words: words, sentences: sentences,
              paragraphs: paragraphs, keywordDensity: keywordDensity };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;          // CommonJS (tests)
  } else {
    root.WordCounter = api;        // browser global
  }
})(typeof window !== "undefined" ? window : this);

// ---- Browser UI wiring (skipped automatically under Node) ----
if (typeof document !== "undefined") {
  (function () {
    var ta = document.getElementById("text");
    var fields = {
      words: document.getElementById("s-words"),
      characters: document.getElementById("s-chars"),
      charactersNoSpaces: document.getElementById("s-chars-ns"),
      sentences: document.getElementById("s-sentences"),
      paragraphs: document.getElementById("s-paragraphs"),
      reading: document.getElementById("s-reading"),
      speaking: document.getElementById("s-speaking"),
    };
    var kw = document.getElementById("keywords");

    function fmtTime(m) {
      if (!m.ceil) return "0 sec";
      if (m.raw < 1) return Math.max(1, Math.round(m.raw * 60)) + " sec";
      return m.ceil + " min";
    }

    function render() {
      var r = window.WordCounter.analyze(ta.value);
      fields.words.textContent = r.words.toLocaleString();
      fields.characters.textContent = r.characters.toLocaleString();
      fields.charactersNoSpaces.textContent = r.charactersNoSpaces.toLocaleString();
      fields.sentences.textContent = r.sentences.toLocaleString();
      fields.paragraphs.textContent = r.paragraphs.toLocaleString();
      fields.reading.textContent = fmtTime(r.readingTime);
      fields.speaking.textContent = fmtTime(r.speakingTime);

      if (!r.keywords.length) {
        kw.innerHTML = '<span class="muted">Start typing to see your most-used words.</span>';
      } else {
        kw.innerHTML = r.keywords.map(function (k) {
          return '<span class="chip"><strong>' + k.word + '</strong> ' +
                 k.count + ' · ' + k.pct.toFixed(1) + '%</span>';
        }).join("");
      }
    }

    ta.addEventListener("input", render);

    var KEY = "wordcounter:text";
    try {
      var saved = localStorage.getItem(KEY);
      if (saved != null) ta.value = saved;
      ta.addEventListener("input", function () { localStorage.setItem(KEY, ta.value); });
    } catch (e) { /* private mode — fine */ }

    var clearBtn = document.getElementById("clear");
    if (clearBtn) clearBtn.addEventListener("click", function () {
      ta.value = ""; try { localStorage.removeItem(KEY); } catch (e) {} render(); ta.focus();
    });
    var copyBtn = document.getElementById("copy");
    if (copyBtn) copyBtn.addEventListener("click", function () {
      navigator.clipboard && navigator.clipboard.writeText(ta.value);
      copyBtn.textContent = "Copied"; setTimeout(function () { copyBtn.textContent = "Copy text"; }, 1200);
    });

    render();
  })();
}

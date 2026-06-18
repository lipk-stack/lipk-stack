/* Unit tests for the Word & Character Counter. Run: node app.test.cjs */
const wc = require("./app.js");
let pass = 0, fail = 0;
function eq(actual, expected, msg) {
  const a = JSON.stringify(actual), e = JSON.stringify(expected);
  if (a === e) { pass++; }
  else { fail++; console.error("FAIL: " + msg + "\n  expected " + e + "\n  got      " + a); }
}

// Empty / whitespace
eq(wc.analyze("").words, 0, "empty -> 0 words");
eq(wc.analyze("   \n\t ").words, 0, "whitespace-only -> 0 words");
eq(wc.analyze("").characters, 0, "empty -> 0 chars");

// Basic counts
const r = wc.analyze("Hello world");
eq(r.words, 2, "two words");
eq(r.characters, 11, "char count incl space");
eq(r.charactersNoSpaces, 10, "char count excl space");

// Unicode / punctuation words
eq(wc.analyze("café, déjà-vu!").words, 2, "accented + hyphen counts as 2 words");
eq(wc.analyze("one  two   three").words, 3, "collapses multiple spaces");

// Sentences
eq(wc.sentences("Hi. How are you? Great!"), 3, "three sentences");
eq(wc.sentences("No terminal punctuation"), 1, "fragment counts as 1 sentence");
eq(wc.sentences(""), 0, "empty -> 0 sentences");
eq(wc.sentences("Wait... really?!"), 2, "grouped punctuation");

// Paragraphs (blank-line separated)
eq(wc.paragraphs("Para one.\n\nPara two."), 2, "two paragraphs");
eq(wc.paragraphs("single line\nwith soft break"), 1, "soft breaks stay one paragraph");
eq(wc.paragraphs(""), 0, "empty -> 0 paragraphs");

// Reading / speaking time
eq(wc.analyze(Array(200).fill("word").join(" ")).readingTime.ceil, 1, "200 words ~ 1 min read");
eq(wc.analyze(Array(400).fill("word").join(" ")).readingTime.ceil, 2, "400 words ~ 2 min read");
eq(wc.analyze(Array(260).fill("word").join(" ")).speakingTime.ceil, 2, "260 words ~ 2 min speak");

// Keyword density: stop-words excluded, frequency ranked
const kd = wc.keywordDensity("SEO is great. SEO content ranks. Good SEO is king.", 3);
eq(kd[0].word, "seo", "most frequent meaningful word is 'seo'");
eq(kd[0].count, 3, "'seo' appears three times");
eq(kd.find(k => k.word === "is"), undefined, "stop-word 'is' excluded");

console.log((fail ? "✗ " : "✓ ") + pass + " passed, " + fail + " failed");
process.exit(fail ? 1 : 0);

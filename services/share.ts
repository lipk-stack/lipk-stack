// Share & export helpers. Everything is client-side: share links encode the
// decision prompt in the URL hash (no backend, no tracking), and exports are
// generated in the browser as Markdown.

const HASH_PREFIX = '#d=';
const MAX_SHARED_PROMPT = 2000;

function toBase64Url(s: string): string {
  const bytes = new TextEncoder().encode(s);
  let bin = '';
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromBase64Url(s: string): string | null {
  try {
    const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'));
    const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

/** Build a link that opens the app with the given decision pre-filled. */
export function buildShareLink(prompt: string): string {
  const encoded = toBase64Url(prompt.slice(0, MAX_SHARED_PROMPT));
  return `${location.origin}${location.pathname}${HASH_PREFIX}${encoded}`;
}

/** Read (and consume) a shared decision prompt from the URL hash, if present. */
export function readSharedPrompt(): string | null {
  if (!location.hash.startsWith(HASH_PREFIX)) return null;
  const text = fromBase64Url(location.hash.slice(HASH_PREFIX.length));
  history.replaceState(null, '', location.pathname + location.search);
  return text && text.trim() ? text.trim() : null;
}

/** Render a finished analysis as a portable Markdown document. */
export function analysisToMarkdown(question: string, analysis: string): string {
  const date = new Date().toISOString().slice(0, 10);
  return [
    '# MAP Gem — Decision Analysis',
    '',
    `*${date}*`,
    '',
    '## The Decision',
    '',
    question.trim(),
    '',
    '## The Triad Analysis',
    '',
    analysis.trim(),
    '',
    '---',
    `*Generated with The MAP Gem — free, private, browser-only: ${location.origin}${location.pathname}*`,
    '',
  ].join('\n');
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Clipboard API can be unavailable (http, permissions) — fall back.
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

export function downloadMarkdown(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

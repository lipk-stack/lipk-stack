import React, { useState } from 'react';
import { analysisToMarkdown, buildShareLink, copyText, downloadMarkdown } from '../services/share';

interface Props {
  question: string;
  analysis: string;
}

// Action bar shown under every finished Triad analysis: lets the user keep the
// result (Markdown) or share a link that re-opens the app with their decision
// pre-filled. Share links are how the tool spreads — no accounts, no backend.

export const AnalysisToolbar: React.FC<Props> = ({ question, analysis }) => {
  const [done, setDone] = useState<string | null>(null);

  const flash = (label: string) => {
    setDone(label);
    window.setTimeout(() => setDone(null), 1800);
  };

  const handleCopyMd = async () => {
    if (await copyText(analysisToMarkdown(question, analysis))) flash('copy');
  };

  const handleDownload = () => {
    downloadMarkdown('map-gem-analysis.md', analysisToMarkdown(question, analysis));
    flash('download');
  };

  const handleShare = async () => {
    if (await copyText(buildShareLink(question))) flash('share');
  };

  const btn =
    'inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ' +
    'bg-slate-800/60 border-slate-700 text-slate-300 hover:text-white hover:border-indigo-500/50';

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      <button type="button" onClick={handleCopyMd} className={btn} title="Copy the full analysis as Markdown">
        <i className={`fas ${done === 'copy' ? 'fa-check text-emerald-400' : 'fa-copy'}`}></i>
        {done === 'copy' ? 'Copied!' : 'Copy Markdown'}
      </button>
      <button type="button" onClick={handleDownload} className={btn} title="Download the analysis as a .md file">
        <i className={`fas ${done === 'download' ? 'fa-check text-emerald-400' : 'fa-download'}`}></i>
        {done === 'download' ? 'Saved!' : 'Download .md'}
      </button>
      <button
        type="button"
        onClick={handleShare}
        className={btn}
        title="Copy a link that opens this app with your decision pre-filled"
      >
        <i className={`fas ${done === 'share' ? 'fa-check text-emerald-400' : 'fa-link'}`}></i>
        {done === 'share' ? 'Link copied!' : 'Share this decision'}
      </button>
    </div>
  );
};

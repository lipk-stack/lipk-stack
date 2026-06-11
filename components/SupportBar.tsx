import React from 'react';
import { MONETIZATION } from '../constants';

// Renders the optional, config-driven monetization UI. Nothing shows unless the
// operator has filled in their own links in constants.tsx and set enabled: true.

export const SupportButton: React.FC = () => {
  const { support } = MONETIZATION;
  if (!support.enabled || support.url.includes('YOUR_HANDLE')) return null;
  return (
    <a
      href={support.url}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-pink-500/10 text-pink-400 border border-pink-500/20 hover:bg-pink-500/20 transition-colors"
    >
      <i className="fas fa-heart"></i> {support.label}
    </a>
  );
};

export const ProUpsell: React.FC = () => {
  const { pro } = MONETIZATION;
  if (!pro.enabled || pro.url.includes('YOUR_HANDLE')) return null;
  return (
    <a
      href={pro.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-xl bg-gradient-to-br from-amber-500/15 to-pink-500/10 border border-amber-500/25 hover:border-amber-400/50 transition-all"
    >
      <h3 className="text-xs font-bold text-amber-400 uppercase mb-1 flex items-center gap-1.5">
        <i className="fas fa-crown"></i> {pro.label}
      </h3>
      <p className="text-xs text-slate-400 leading-relaxed">{pro.pitch}</p>
    </a>
  );
};

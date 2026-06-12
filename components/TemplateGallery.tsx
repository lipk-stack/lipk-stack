import React from 'react';
import { DECISION_TEMPLATES } from '../constants';

interface Props {
  onPick: (prompt: string) => void;
}

// Start-screen gallery of ready-made decision templates. Picking one only
// pre-fills the input so the user can personalise it before sending.

export const TemplateGallery: React.FC<Props> = ({ onPick }) => (
  <div className="w-full mt-4">
    <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-3">
      Or start from a template
    </p>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {DECISION_TEMPLATES.map((t) => (
        <button
          key={t.title}
          onClick={() => onPick(t.prompt)}
          className="p-3 rounded-xl glass border border-slate-700 hover:border-indigo-500/50 text-left transition-all hover:bg-slate-800 group"
          title={t.prompt}
        >
          <i className={`fas ${t.icon} text-indigo-500 text-sm mb-1.5 block group-hover:text-indigo-400`}></i>
          <span className="text-xs font-medium text-slate-300 leading-tight block">{t.title}</span>
        </button>
      ))}
    </div>
  </div>
);

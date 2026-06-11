import React, { useState } from 'react';
import { MODEL_OPTIONS, GEMINI_KEY_URL } from '../constants';

interface SettingsModalProps {
  open: boolean;
  initialKey: string;
  initialModel: string;
  forced: boolean; // true when no key yet — modal cannot be dismissed
  onSave: (key: string, model: string) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  open,
  initialKey,
  initialModel,
  forced,
  onSave,
  onClose,
}) => {
  const [key, setKey] = useState(initialKey);
  const [model, setModel] = useState(initialModel);
  const [show, setShow] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="glass rounded-2xl border border-slate-700 w-full max-w-lg p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <i className="fas fa-key text-indigo-400"></i> Connect your Gemini key
          </h2>
          {!forced && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-2"
              title="Close"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
        <p className="text-sm text-slate-400 leading-relaxed mb-5">
          This tool runs entirely in your browser. Your key is stored locally and is
          never sent anywhere except directly to Google. The Gemini API has a free
          tier, so you can use it at no cost.
        </p>

        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Gemini API key
        </label>
        <div className="relative mb-2">
          <input
            type={show ? 'text' : 'password'}
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="AIza..."
            className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pr-12 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
          >
            <i className={`fas ${show ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        </div>
        <a
          href={GEMINI_KEY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 mb-5"
        >
          <i className="fas fa-up-right-from-square"></i> Get a free API key from Google AI Studio
        </a>

        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Model
        </label>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 mb-6"
        >
          {MODEL_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>

        <button
          onClick={() => onSave(key.trim(), model)}
          disabled={!key.trim()}
          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:opacity-50 text-white py-3 rounded-xl font-bold transition-all"
        >
          Save & start analyzing
        </button>
      </div>
    </div>
  );
};

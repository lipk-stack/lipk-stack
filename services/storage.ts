import { Message } from '../types';
import { APP_MODELS } from '../constants';

// All persistence is browser-local (localStorage). There is no backend, no
// database, and no server cost. The user's API key never leaves their browser.

const KEY_API = 'map_gem_api_key';
const KEY_MODEL = 'map_gem_model';
const KEY_SESSION = 'map_gem_session';

export const storage = {
  getApiKey(): string {
    try {
      return localStorage.getItem(KEY_API) || '';
    } catch {
      return '';
    }
  },
  setApiKey(key: string): void {
    try {
      if (key) localStorage.setItem(KEY_API, key.trim());
      else localStorage.removeItem(KEY_API);
    } catch {
      /* storage unavailable (private mode) — degrade gracefully */
    }
  },
  getModel(): string {
    try {
      return localStorage.getItem(KEY_MODEL) || APP_MODELS.LITE;
    } catch {
      return APP_MODELS.LITE;
    }
  },
  setModel(model: string): void {
    try {
      localStorage.setItem(KEY_MODEL, model);
    } catch {
      /* ignore */
    }
  },
  loadSession(): Message[] {
    try {
      const raw = localStorage.getItem(KEY_SESSION);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },
  saveSession(messages: Message[]): void {
    try {
      localStorage.setItem(KEY_SESSION, JSON.stringify(messages));
    } catch {
      /* ignore quota / unavailable */
    }
  },
  clearSession(): void {
    try {
      localStorage.removeItem(KEY_SESSION);
    } catch {
      /* ignore */
    }
  },
};

import type { Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { storage } from "./storage";
import { Message } from "../types";

// BYOK service: the user supplies their own Gemini API key (stored only in their
// browser). No key is ever bundled into the build, so the operator incurs no cost.
// The @google/genai SDK is loaded lazily (dynamic import) so the initial bundle
// stays small — visitors who never enter a key never download it.

export class MissingKeyError extends Error {
  constructor() {
    super("No API key configured");
    this.name = "MissingKeyError";
  }
}

function toHistory(messages: Message[]) {
  return messages.map((m) => ({
    role: m.role,
    parts: [{ text: m.text }],
  }));
}

export class GeminiService {
  private chat: Chat | null = null;
  private initPromise: Promise<void> | null = null;

  /** (Re)initialise the chat with the current key/model and optional prior history. */
  init(history: Message[] = []): Promise<void> {
    this.initPromise = this.doInit(history);
    return this.initPromise;
  }

  private async doInit(history: Message[]): Promise<void> {
    this.chat = null;
    const key = storage.getApiKey();
    if (!key) return;
    const { GoogleGenAI } = await import("@google/genai");
    const ai = new GoogleGenAI({ apiKey: key });
    this.chat = ai.chats.create({
      model: storage.getModel(),
      history: toHistory(history),
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }

  isReady(): boolean {
    return !!this.chat;
  }

  async sendMessage(message: string): Promise<string> {
    // Wait for any in-flight init, or lazily (re)build if the key was just entered.
    if (this.initPromise) await this.initPromise;
    if (!this.chat) await this.init();
    if (!this.chat) throw new MissingKeyError();

    const result = await this.chat.sendMessage({ message });
    return result.text || "I apologize, but I could not generate a response.";
  }

  /** Start a fresh conversation (no history). */
  reset(): void {
    void this.init([]);
  }
}

export const gemini = new GeminiService();

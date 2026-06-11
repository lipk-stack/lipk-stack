import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { storage } from "./storage";
import { Message } from "../types";

// BYOK service: the user supplies their own Gemini API key (stored only in their
// browser). No key is ever bundled into the build, so the operator incurs no cost.

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
  private ai: GoogleGenAI | null = null;
  private chat: Chat | null = null;
  private key = "";
  private model = "";

  /** (Re)initialise the chat with the current key/model and optional prior history. */
  init(history: Message[] = []): void {
    this.key = storage.getApiKey();
    this.model = storage.getModel();
    if (!this.key) {
      this.ai = null;
      this.chat = null;
      return;
    }
    this.ai = new GoogleGenAI({ apiKey: this.key });
    this.chat = this.ai.chats.create({
      model: this.model,
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
    // Lazily (re)build if the key was just entered or settings changed.
    if (!this.chat) this.init();
    if (!this.chat) throw new MissingKeyError();

    const result: GenerateContentResponse = await this.chat.sendMessage({ message });
    return result.text || "I apologize, but I could not generate a response.";
  }

  /** Start a fresh conversation (no history). */
  reset(): void {
    this.init([]);
  }
}

export const gemini = new GeminiService();

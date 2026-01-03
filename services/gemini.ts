
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION, APP_MODELS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export class GeminiService {
  private chat: Chat | null = null;

  constructor() {
    this.chat = ai.chats.create({
      model: APP_MODELS.PRIMARY,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }

  async sendMessage(message: string): Promise<string> {
    if (!this.chat) throw new Error("Chat not initialized");
    
    try {
      const result: GenerateContentResponse = await this.chat.sendMessage({ message });
      return result.text || "I apologize, but I could not generate a response.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  }

  reset() {
    this.chat = ai.chats.create({
      model: APP_MODELS.PRIMARY,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
}

export const gemini = new GeminiService();

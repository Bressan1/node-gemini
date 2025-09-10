// src/services/gemini.js
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

export async function generate(model, contents, config) {
  const req = Array.isArray(contents) ? { contents } : { contents: [contents] };
  const res = await ai.models.generateContent({ model, ...req, config });
  return res; // res.text disponível
}

export async function countTokens(model, contents) {
  const req = Array.isArray(contents) ? { contents } : { contents: [contents] };
  return await ai.models.countTokens({ model, ...req });
}

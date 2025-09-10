// src/services/gemini.js
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "AIzaSyAXBRleOPvVJrg8h7Hpkdsr_ekPJyzb_3Y" });

export async function generate(model, contents, config) {
  const req = Array.isArray(contents) ? { contents } : { contents: [contents] };
  const res = await ai.models.generateContent({ model, ...req, config });
  return res; // res.text disponível
}

export async function countTokens(model, contents) {
  const req = Array.isArray(contents) ? { contents } : { contents: [contents] };
  return await ai.models.countTokens({ model, ...req });
}

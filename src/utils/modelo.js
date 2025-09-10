// modelo.js
import { GoogleGenAI } from "@google/genai";



export async function inicializaModelo(modelo) {
  return {
    async generateContent(params) {
      if (typeof params === "string") {
        return await ai.models.generateContent({
          model: modelo,
          contents: [params],
        });
      }
      return await ai.models.generateContent({
        model: modelo,
        ...params,
      });
    },
    async countTokens(input) {
      if (typeof input === "object" && input.contents) {
        return await ai.models.countTokens({ model: modelo, ...input });
      }
      return await ai.models.countTokens({ model: modelo, contents: [input] });
    },
  };
}





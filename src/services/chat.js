// src/services/chat.js
import { generate } from "./gemini.js";

const MODEL = "gemini-2.5-flash";

export async function chatTravel(question) {
  const systemInstruction = `
Você é um assistente de viagens. Responda sobre destinos, roteiros, clima e dicas.
Se a pergunta for fora de turismo, recuse educadamente e redirecione.
Formato: objetivo, em PT-BR.
  `.trim();

  const res = await generate(MODEL, question, { systemInstruction });
  return res.text;
}

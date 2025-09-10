// src/services/analyze.js
import { generate } from "./gemini.js";

const MODEL = "gemini-2.5-flash";

export async function analyzeOpinions(opinioes) {
  const prompt = `
Analise as opiniões descritas em sequência e resuma os pontos positivos e negativos.
Depois, categorize em satisfeito, insatisfeito ou neutro, no formato:

Satisfeitos: X% - N respostas
Insatisfeitos: Y% - M respostas
Neutros: Z% - K respostas

O total de respostas deve coincidir com o total de opiniões lidas.

Opiniões:
${opinioes}
  `.trim();

  const res = await generate(MODEL, prompt);
  return res.text;
}

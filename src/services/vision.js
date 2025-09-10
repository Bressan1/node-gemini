// src/services/vision.js
import fs from "node:fs";
import { generate } from "./gemini.js";

const MODEL = "gemini-2.5-flash";

// Converte arquivo de imagem em parte inline (base64)
function fileToGenerativePart(filePath, mimeType) {
  const data = fs.readFileSync(filePath, { encoding: "base64" });
  return { inlineData: { data, mimeType } };
}

export async function analyzeImageFromPath(caminhoImagem, pergunta = "Descreva a imagem em detalhes.") {
  const mimeType = caminhoImagem.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";
  const imagePart = fileToGenerativePart(caminhoImagem, mimeType);

  const contents = [
    { role: "user", parts: [imagePart, { text: pergunta }] },
  ];

  const res = await generate(MODEL, contents);
  return res.text;
}

// (opcional) se quiser aceitar base64 vindo do front:
export async function analyzeImageFromBase64(base64, mimeType = "image/jpeg", pergunta = "Descreva a imagem.") {
  const imagePart = { inlineData: { data: base64, mimeType } };
  const contents = [{ role: "user", parts: [imagePart, { text: pergunta }] }];
  const res = await generate(MODEL, contents);
  return res.text;
}

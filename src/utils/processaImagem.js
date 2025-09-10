// processaImagem.js
import fs from "node:fs";
import path from "node:path";
import { inicializaModelo } from "./modelo.js";

function fileToGenerativePart(filePath, mimeType) {
  const data = fs.readFileSync(filePath, { encoding: "base64" });
  return {
    inlineData: {
      data,
      mimeType,
    },
  };
}

// Dica: detecta mime básico pelo sufixo do arquivo
function guessMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === ".png") return "image/png";
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".webp") return "image/webp";
  return "application/octet-stream";
}

export async function processaImagem(caminhoImagem, prompt = "Descreva a imagem em tópicos (características, localização quando aplicável, elementos visuais, possíveis pontos turísticos, curiosidades).") {
  const model = await inicializaModelo("gemini-2.5-flash"); // 2.5-flash já é multimodal

  const mimeType = guessMimeType(caminhoImagem);
  const imagePart = fileToGenerativePart(caminhoImagem, mimeType);

  const requisicao = {
    contents: [
      {
        role: "user",
        parts: [
          imagePart,
          { text: prompt },
        ],
      },
    ],
  };


  const result = await model.generateContent(requisicao);
  const text = result.text; // no SDK novo já vem pronto
  console.log(text);

  return text;
}



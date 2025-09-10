import fs from "node:fs";
import { inicializaModelo } from "./gemini.js";

// helper para converter arquivo em inlineData
function fileToGenerativePart(filePath, mimeType) {
  const data = fs.readFileSync(filePath, { encoding: "base64" });
  return {
    inlineData: {
      data,
      mimeType,
    },
  };
}

export async function processaImagem(caminhoImagem, pergunta = "Descreva a imagem em detalhes.") {
  const model = await inicializaModelo("gemini-2.5-flash");

  const mimeType = caminhoImagem.endsWith(".png") ? "image/png" : "image/jpeg";
  const imagePart = fileToGenerativePart(caminhoImagem, mimeType);

  const contents = [
    {
      role: "user",
      parts: [
        imagePart,
        { text: pergunta },
      ],
    },
  ];

  const result = await model.generateContent({ contents });
  return result.text;
}

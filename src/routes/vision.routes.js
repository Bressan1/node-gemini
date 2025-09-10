// src/routes/vision.routes.js
import { Router } from "express";
import { analyzeImageFromPath, analyzeImageFromBase64 } from "../services/vision.js";

const router = Router();

/**
 * Opção A (simples): enviar caminho local do arquivo
 * body: { caminhoImagem: "./foto.jpg", pergunta?: "..." }
 */
router.post("/", async (req, res) => {
  try {
    const { caminhoImagem, pergunta } = req.body;
    if (!caminhoImagem) return res.status(400).json({ erro: "Faltou 'caminhoImagem'" });

    const analise = await analyzeImageFromPath(caminhoImagem, pergunta);
    res.json({ analise });
  } catch (e) {
    console.error("Erro /vision:", e);
    res.status(500).json({ erro: e.message || "Erro interno" });
  }
});

/**
 * Opção B (frontend): enviar base64 direto
 * body: { base64: "....", mimeType?: "image/png", pergunta?: "..." }
 */
router.post("/base64", async (req, res) => {
  try {
    const { base64, mimeType, pergunta } = req.body;
    if (!base64) return res.status(400).json({ erro: "Faltou 'base64'" });

    const analise = await analyzeImageFromBase64(base64, mimeType, pergunta);
    res.json({ analise });
  } catch (e) {
    console.error("Erro /vision/base64:", e);
    res.status(500).json({ erro: e.message || "Erro interno" });
  }
});

export default router;

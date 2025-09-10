import { Router } from "express";
import { processaImagem } from "../services/vision.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { caminhoImagem, pergunta } = req.body;
    if (!caminhoImagem) {
      return res.status(400).json({ erro: "Faltou o campo 'caminhoImagem'" });
    }

    const resposta = await processaImagem(caminhoImagem, pergunta);
    res.json({ analise: resposta });
  } catch (e) {
    console.error("Erro:", e);
    res.status(500).json({ erro: e.message || "Erro interno" });
  }
});

export default router;

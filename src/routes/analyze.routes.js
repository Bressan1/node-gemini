// src/routes/analyze.routes.js
import { Router } from "express";
import { analyzeOpinions } from "../services/analyze.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { opinioes } = req.body;
    if (!opinioes) {
      return res.status(400).json({ erro: "Faltou o campo 'opinioes'" });
    }
    const analise = await analyzeOpinions(opinioes);
    res.json({ analise });
  } catch (e) {
    console.error("Erro /analyze:", e);
    res.status(500).json({ erro: e.message || "Erro interno" });
  }
});

export default router;

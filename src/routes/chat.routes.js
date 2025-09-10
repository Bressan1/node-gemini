// src/routes/chat.routes.js
import { Router } from "express";
import { chatTravel } from "../services/chat.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { pergunta } = req.body;
    if (!pergunta) {
      return res.status(400).json({ erro: "Faltou o campo 'pergunta'" });
    }
    const resposta = await chatTravel(pergunta);
    res.json({ resposta });
  } catch (e) {
    console.error("Erro /chat:", e);
    res.status(500).json({ erro: e.message || "Erro interno" });
  }
});

export default router;

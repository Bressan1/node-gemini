import express from "express";
import { inicializaModelo } from "./modelo.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API do Chat de Viagens está no ar 🚀");
});

app.post("/chat", async (req, res) => {
  try {
    const { pergunta } = req.body;
    if (!pergunta) {
      return res.status(400).json({ erro: "Faltou o campo 'pergunta'" });
    }

    const model = await inicializaModelo("gemini-2.5-flash");
    const result = await model.generateContent({ contents: [pergunta] });

    res.json({ resposta: result.text });
  } catch (e) {
    console.error("Erro:", e);
    res.status(500).json({ erro: e.message || "Erro interno" });
  }
});

// 🚨 NOVA ROTA
app.post("/analyze", async (req, res) => {
  try {
    const { opinioes } = req.body;
    if (!opinioes) {
      return res.status(400).json({ erro: "Faltou o campo 'opinioes'" });
    }

    const model = await inicializaModelo("gemini-2.5-flash");

    const prompt = `
Analise as opiniões descritas em sequência e resuma os pontos positivos e negativos.
Depois, categorize em satisfeito, insatisfeito ou neutro, no formato:

Satisfeitos: X% - N respostas
Insatisfeitos: Y% - M respostas
Neutros: Z% - K respostas

Opiniões:
${opinioes}
`.trim();

    const result = await model.generateContent({ contents: [prompt] });
    res.json({ analise: result.text });
  } catch (e) {
    console.error("Erro:", e);
    res.status(500).json({ erro: e.message || "Erro interno" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

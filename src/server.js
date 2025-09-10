// src/server.js
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import chatRoutes from "./routes/chat.routes.js";
import analyzeRoutes from "./routes/analyze.routes.js";
import visionRoutes from "./routes/vision.routes.js";

const app = express();
app.use(express.json({ limit: "2mb" }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "../public")));

app.use("/chat", chatRoutes);
app.use("/analyze", analyzeRoutes);

app.get("/", (req, res) => {
  res.send("API do Chat de Viagens está no ar 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.use("/vision", visionRoutes);
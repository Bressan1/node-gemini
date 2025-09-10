import express from "express";
import chatRoutes from "./routes/chat.routes.js";
import analyzeRoutes from "./routes/analyze.routes.js";
import visionRoutes from "./routes/vision.routes.js";

const app = express();
app.use(express.json());

app.use("/chat", chatRoutes);
app.use("/analyze", analyzeRoutes);
app.use("/vision", visionRoutes);

app.get("/", (req, res) => {
  res.send("API do Chat de Viagens está no ar 🚀");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

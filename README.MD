# 🌍 Travel Insights AI

Um assistente multimodal construído em **Node.js + Express** com integração ao **Google Gemini**.

Permite interagir com IA para:

* **Chat de viagens**: perguntas livres sobre destinos turísticos (`/chat`)
* **Análise de feedbacks**: sumarização e classificação de opiniões de clientes (`/analyze`)
* **Visão computacional**: descrição de imagens (`/vision`)

---

## 🚀 Funcionalidades

* **Pergunta Livre (Chat)**: faça perguntas sobre destinos, clima, cultura e dicas de viagem.
* **Análise de Feedback**: cole opiniões de clientes e receba resumo com pontos positivos/negativos + categorização (satisfeito/insatisfeito/neutro).
* **Processamento de Imagem**: envie uma foto e receba uma descrição detalhada.

---

## 🛠️ Tecnologias

* [Node.js](https://nodejs.org/)
* [Express](https://expressjs.com/)
* [Google Gemini API](https://ai.google.dev/)
* JavaScript (ESM)
* HTML + JS + CSS (frontend simples em `/public`)

---

## 📂 Estrutura do Projeto

```text
src/
  routes/
    chat.routes.js      # rota /chat
    analyze.routes.js   # rota /analyze
    vision.routes.js    # rota /vision
  services/
    gemini.js           # wrapper do SDK Gemini
    chat.js             # lógica do chat
    analyze.js          # lógica da análise de feedbacks
    vision.js           # lógica de visão (imagens)
  server.js             # ponto de entrada (Express)

public/
  index.html            # interface web simples
  script.js             # lógica de chamadas API
  style.css             # estilos

.env                     # variável GOOGLE_API_KEY
package.json             # scripts e dependências
README.md                # este arquivo
```

---

## ⚙️ Como rodar localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/travel-insights-ai.git
cd travel-insights-ai
```

### 2. Instale dependências

```bash
npm install
```

### 3. Configure variáveis de ambiente

Crie um arquivo `.env` na raiz:

```bash
GOOGLE_API_KEY=sua_chave_aqui
```

### 4. Rode o servidor

```bash
npm run start
# ou
node src/server.js
```

Servidor disponível em:

👉 [http://localhost:3000](http://localhost:3000)

---

## 🖥️ Como usar

### Via Frontend

Abra o navegador em:

👉 [http://localhost:3000](http://localhost:3000)

Use as seções:

* **Pergunta livre**
* **Analisar feedback**
* **Upload de imagem**

### Via cURL / Postman

**Chat**

```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"pergunta":"Me fale sobre o Rio de Janeiro"}'
```

**Analyze**

```bash
curl -X POST http://localhost:3000/analyze \
  -H "Content-Type: application/json" \
  -d '{"opinioes":"A viagem foi ótima. O hotel estava limpo. A comida era ruim. A cidade era linda."}'
```

**Vision (caminho de arquivo local)**

```bash
curl -X POST http://localhost:3000/vision \
  -H "Content-Type: application/json" \
  -d '{"caminhoImagem":"./foto.jpg","pergunta":"Descreva a imagem"}'
```

**Vision (base64 do navegador/opcional)**

```bash
curl -X POST http://localhost:3000/vision/base64 \
  -H "Content-Type: application/json" \
  -d '{"base64":"...","mimeType":"image/png","pergunta":"Descreva"}'
```

---

## 📸 Exemplos de Resposta

### Exemplo `/analyze`

**Request**

```json
{
  "opinioes": "A viagem foi ótima. O hotel estava limpo. A comida era ruim. A cidade era linda."
}
```

**Response**

```json
{
  "analise": "Aqui está a análise das opiniões, seguida da categorização:\n\n---\n\n**Resumo dos Pontos Positivos e Negativos:**\n\n*   **Pontos Positivos:**\n    *   A experiência geral da viagem foi considerada excelente (\"ótima\").\n    *   O hotel foi avaliado positivamente quanto à limpeza.\n    *   A cidade visitada foi elogiada por sua beleza.\n*   **Pontos Negativos:**\n    *   A qualidade da comida foi um ponto de insatisfação (\"ruim\").\n\n---\n\n**Categorização:**\n\n*Total de respostas: 4*\n\n*   **Satisfeitos:** 75% - 3 respostas\n*   **Insatisfeitos:** 25% - 1 resposta\n*   **Neutros:** 0% - 0 respostas"
}
```

---

## 💡 Próximos Passos

* Adicionar histórico de conversas (stateful chat)
* Melhorar interface web
* Deploy em plataforma gratuita (Render / Railway)

---

## 👤 Autor

* **Seu Nome**
  [LinkedIn](https://www.linkedin.com/in/eduardobressan/) · [GitHub](https://github.com/Bressan1)

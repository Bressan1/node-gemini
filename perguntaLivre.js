import { fazerPergunta } from "./pergunta.js";
import { inicializaModelo } from "./modelo.js";

export async function perguntar() {
  const model = await inicializaModelo("gemini-2.5-flash");

  const prompt = await fazerPergunta("Me faça uma pergunta sobre um destino: ");

  const parts = [
    { text: "Você é o chatbot de um site que vende pacotes de viagem." },
    { text: `input: ${prompt}` },
    { text: "output: " },
  ];

  // 1) Monta a requisição
  const requisicao = { contents: [{ role: "user", parts }] };

  // 2) Conta tokens de entrada
  const totalTokensEntrada = await model.countTokens(requisicao);
  console.log(`\nTotal tokens de entrada: ${totalTokensEntrada.totalTokens}\n`);

  // 3) Gera resposta
  const result = await model.generateContent(requisicao);
  const text = result.text; // no SDK novo já tem text pronto
  console.log(text);

  // 4) Conta tokens de saída
  const totalTokensSaida = await model.countTokens(text);
  console.log(`\nTotal tokens de saída: ${totalTokensSaida.totalTokens}\n`);
}



//prompt: await fazerPergunta("Qual o seu nome?"),
    



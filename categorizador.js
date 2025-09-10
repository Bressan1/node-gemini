import { fazerPergunta } from "./pergunta.js";
import { promises as fs } from "fs";
import { inicializaModelo } from "./modelo.js";

const model = await inicializaModelo("gemini-2.5-flash");

export async function processaArquivo() {
  const arquivo = await fazerPergunta("\n Informe o caminho do arquivo: ");
  const conteudo = await fs.readFile(arquivo, "utf-8");

  const prompt = `
Analise as opiniões descritas em sequência e resuma por favor os pontos positivos e negativos citados pelos clientes sobre esses destinos. 
Depois, categorize o percentual de respostas em satisfeito, insatisfeito ou neutro, colocando no seguinte formato, por exemplo:

Satisfeitos: 20% - 20 respostas
Insatisfeitos: 50% - 50 respostas
Neutros: 30% - 30 respostas

O total de respostas deve coincidir com o total de opiniões lidas.

Opiniões:
${conteudo}
`.trim();

  const result = await model.generateContent({ contents: [prompt] });
  console.log(result.text);
}

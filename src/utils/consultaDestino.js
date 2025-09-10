// index.js
import { fazerPergunta } from "../../pergunta.js";
import { inicializaModelo } from "../../modelo.js";

export async function consultar() {
   const model = await inicializaModelo("gemini-2.5-flash");

  const destino1 = await fazerPergunta("Digite o primeiro destino: ");
  const destino2 = await fazerPergunta("Digite o segundo destino: ");
  const categoria = await fazerPergunta("Qual categoria comparar? (ex.: cultura, clima, culinária) ");

  const parts = [
    { text: "Você é um chatbot de viagens que compara destinos." },
    { text: `input: Compare ${destino1} e ${destino2} na categoria ${categoria}` },
    { text: "output: " },
  ];

  const response = await model.generateContent({
    contents: [{ role: "user", parts }],
  });

  console.log(response.text);
}


//prompt: await fazerPergunta("Qual o seu nome?"),
    



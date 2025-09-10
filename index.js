import { fazerPergunta } from "./pergunta.js";
import { perguntar } from "./perguntaLivre.js";
import { consultar } from "./consultaDestino.js";
import { processaImagem } from "./processaImagem.js"; // <-- faltava
import { processaArquivo } from "./categorizador.js";

async function principal() {
  const escolha = await fazerPergunta(`Escolha uma das opções abaixo: 
  1. Fazer uma pergunta livre sobre um destino;
  2. Comparação de destinos por categorias;
  3. Processar uma imagem;
  4. fazer analise com base nos sentimentos;
  
Opção desejada: `);

  if (escolha === "1") {
    await perguntar();
  } else if (escolha === "2") {
    await consultar();
  } else if (escolha === "3") {
    const imagem = await fazerPergunta("\nInforme o caminho da imagem: "); 
    await processaImagem(imagem); 
  } else if (escolha === "4") {
    await processaArquivo();
  } else {
    console.log("Escolha inválida.");
  }
}

principal().catch((err) => {
  console.error("Erro na execução:", err);
  process.exit(1);
});


//prompt: await fazerPergunta("Qual o seu nome?"),
    



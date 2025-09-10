async function askChat() {
  const pergunta = document.getElementById("chatInput").value;
  const res = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pergunta }),
  });
  const data = await res.json();
  document.getElementById("chatResult").innerText = data.resposta || data.erro;
}

async function analyzeFeedback() {
  const opinioes = document.getElementById("feedbackInput").value;
  const res = await fetch("/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ opinioes }),
  });
  const data = await res.json();
  document.getElementById("feedbackResult").innerText = data.analise || data.erro;
}

async function analyzeImage() {
  const file = document.getElementById("imageInput").files[0];
  const pergunta = document.getElementById("imagePrompt").value;

  if (!file) {
    alert("Selecione uma imagem!");
    return;
  }

  // converte em base64
  const base64 = await toBase64(file);

  const res = await fetch("/vision", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      caminhoImagem: file.name, // por enquanto só o nome
      pergunta: pergunta || "Descreva a imagem",
    }),
  });

  const data = await res.json();
  document.getElementById("imageResult").innerText = data.analise || data.erro;
}

// helper para converter arquivo em base64 (se quiser enviar direto no body futuramente)
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
  });
}

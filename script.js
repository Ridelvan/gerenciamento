const saldoTotalEl = document.getElementById("saldo-total");
const listaTransacoesEl = document.getElementById("lista-transacoes");
const adicionarTransacaoBtn = document.getElementById("adicionar-transacao");
const resetarTudoBtn = document.getElementById("resetar-tudo");

let saldoTotal = parseFloat(localStorage.getItem("saldoTotal")) || 0;
let transacoes = JSON.parse(localStorage.getItem("transacoes")) || [];

const formatarValor = (valor) => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const atualizarSaldo = () => {
  saldoTotalEl.textContent = formatarValor(saldoTotal);
  localStorage.setItem("saldoTotal", saldoTotal.toFixed(2));
};

const renderizarTransacoes = () => {
  listaTransacoesEl.innerHTML = "";
  transacoes.forEach((transacao, index) => {
    const transacaoEl = document.createElement("div");
    transacaoEl.classList.add("transacao");

    transacaoEl.innerHTML = `
      <p>${transacao.descricao} (${transacao.data})</p>
      <span>${formatarValor(transacao.valor)}</span>
    `;

    if (transacao.imagem) {
      const imgEl = document.createElement("img");
      imgEl.src = transacao.imagem;
      transacaoEl.appendChild(imgEl);
    }

    listaTransacoesEl.appendChild(transacaoEl);
  });
  localStorage.setItem("transacoes", JSON.stringify(transacoes));
};

const converterImagemParaBase64 = (imagem) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(imagem);
  });
};

adicionarTransacaoBtn.addEventListener("click", async () => {
  const descricao = document.getElementById("descricao").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const imagem = document.getElementById("upload-imagem").files[0];

  if (!descricao || isNaN(valor)) {
    alert("Preencha todos os campos corretamente!");
    return;
  }

  let imagemBase64 = null;
  if (imagem) imagemBase64 = await converterImagemParaBase64(imagem);

  saldoTotal += valor;

  const transacao = {
    descricao,
    valor,
    data: new Date().toLocaleDateString(),
    imagem: imagemBase64,
  };

  transacoes.push(transacao);
  atualizarSaldo();
  renderizarTransacoes();

  document.getElementById("descricao").value = "";
  document.getElementById("valor").value = "";
  document.getElementById("upload-imagem").value = "";
});

resetarTudoBtn.addEventListener("click", () => {
  if (confirm("Tem certeza de que deseja resetar tudo?")) {
    localStorage.clear();
    saldoTotal = 0;
    transacoes = [];
    atualizarSaldo();
    renderizarTransacoes();
  }
});

atualizarSaldo();
renderizarTransacoes();

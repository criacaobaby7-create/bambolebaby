alert("Bem-vindo à Bambolê Baby!");
const botoesComprar = document.querySelectorAll(".info-produto a");
const carrinho = document.querySelector(".carrinho");

let quantidadeCarrinho = 0;
let produtosCarrinho = [];
const carrinhoSalvo = localStorage.getItem("carrinhoBambole");

if (carrinhoSalvo) {
  produtosCarrinho = JSON.parse(carrinhoSalvo);
  quantidadeCarrinho = produtosCarrinho.length;
  carrinho.textContent = "🛍 " + quantidadeCarrinho;
}

function salvarCarrinho() {
  localStorage.setItem(
    "carrinhoBambole",
    JSON.stringify(produtosCarrinho)
  );
}

botoesComprar.forEach((botao) => {
  botao.addEventListener("click", (evento) => {
    evento.preventDefault();

    const card = botao.closest(".card");
    const nomeProduto = card.querySelector("h3").textContent;
    const precoProduto = card.querySelector("strong").textContent;

    const valorProduto = Number(
  precoProduto
    .replace("R$", "")
    .trim()
    .replace(",", ".")
);

produtosCarrinho.push({
  nome: nomeProduto,
  preco: precoProduto,
  valor: valorProduto
});
salvarCarrinho();
    quantidadeCarrinho++;

    carrinho.textContent = "🛍 " + quantidadeCarrinho;

    botao.textContent = "✓ Adicionado";

    setTimeout(() => {
      botao.textContent = "🛍 Comprar";
    }, 1500);
  });
});

carrinho.addEventListener("click", () => {
  if (produtosCarrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  let mensagem = "Olá! Gostaria de finalizar este pedido:\n\n";

  produtosCarrinho.forEach((produto, indice) => {
    mensagem +=
      (indice + 1) +
      ". " +
      produto.nome +
      " — " +
      produto.preco +
      "\n";
  });
const totalPedido = produtosCarrinho.reduce((total, produto) => {
  return total + produto.valor;
}, 0);

mensagem +=
  "\nTotal do pedido: R$ " +
  totalPedido.toFixed(2).replace(".", ",") +
  "\n";
  mensagem += "\nQuantidade: " + quantidadeCarrinho + " produto(s).";

  const linkWhatsApp =
    "https://wa.me/5547997280215?text=" + encodeURIComponent(mensagem);

  window.open(linkWhatsApp, "_blank");
});
const botaoLimparCarrinho =
  document.querySelector(".limpar-carrinho");

botaoLimparCarrinho.addEventListener("click", () => {
  const confirmar = confirm("Deseja limpar todos os produtos do carrinho?");

  if (confirmar) {
    produtosCarrinho = [];
    quantidadeCarrinho = 0;

    carrinho.textContent = "🛍 0";

    localStorage.removeItem("carrinhoBambole");
  }
});
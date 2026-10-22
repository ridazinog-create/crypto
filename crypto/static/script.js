let modo = "cifrar";

const entrada = document.getElementById("entrada");
const saida = document.getElementById("saida");
const chave = document.getElementById("chave");
const valorChave = document.getElementById("valor-chave");
const rotuloStatus = document.getElementById("status");
const botoesModo = document.querySelectorAll(".modo");


async function atualizar() {
    valorChave.textContent = chave.value;

    const resposta = await fetch("/processar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            texto: entrada.value,
            chave: chave.value,
            modo: modo,
        }),
    });

    const dados = await resposta.json();
    saida.textContent = dados.resultado;
    rotuloStatus.textContent = `${entrada.value.length} caracteres processados`;
}


function trocarModo(novoModo) {
    modo = novoModo;
    botoesModo.forEach((botao) => {
        botao.classList.toggle("ativo", botao.dataset.modo === modo);
    });
    atualizar();
}


botoesModo.forEach((botao) => {
    botao.addEventListener("click", () => trocarModo(botao.dataset.modo));
});

entrada.addEventListener("input", atualizar);
chave.addEventListener("input", atualizar);

document.getElementById("copiar").addEventListener("click", async () => {
    await navigator.clipboard.writeText(saida.textContent);
    rotuloStatus.textContent = "Resultado copiado!";
});

document.getElementById("inverter").addEventListener("click", () => {
    entrada.value = saida.textContent;
    trocarModo(modo === "cifrar" ? "decifrar" : "cifrar");
});

document.getElementById("limpar").addEventListener("click", () => {
    entrada.value = "";
    atualizar();
});

atualizar();
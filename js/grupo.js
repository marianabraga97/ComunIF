lucide.createIcons();

lucide.createIcons();

const topicos = [
  {
    id: 1,
    titulo: "Como organizar os estudos para as avaliações?",
    autor: "Maria Clara",
    data: "05 de nov. de 2026",
    mensagem: "Quais métodos de estudos vocês usam para dividir os conteúdos e revisar antes das avaliações?",
    respostas: [
      {
        autor: "Thiago",
        data: "05 de nov. de 2026",
        texto: "Costumo dividir os assuntos por semana e resolver exercícios ao final de cada revisão."
      },
      {
        autor: "Gabriel",
        data: "05 de nov. de 2026",
        texto: "Olha.. Eu tento fazer vários flash-card, e vários resumos das aulas."
      },
      {
        autor: "Mariana",
        data: "06 de nov. de 2026",
        texto: "Eu já gosto de fazer vários resumos e utilizar materiais de apoio."
      }
    ]
  },
  //para criar varias respostas dentro do array eu separei por "}," e só no final que fecha o array ];
  {
    id: 2,
    titulo: "Indicações de projetos para praticar programação",
    autor: "Rafael",
    data: "04 de nov. de 2026",
    mensagem: "Oi pessoal! Quais ideias de projetos simples vocês recomendam para treinar HTML, CSS e JS?",
    respostas: [
        {
            autor: "Gustavo",
            data: "04 de nov. de 2026",
            texto: "Cara.. Olha, se eu fosse você eu buscava fazer projetos como calculadora, ou até mesmo um jogo simples de descubra palavra! Você vai curtir."
        },
        {
            autor: "Mariana",
            data: "05 de nov. de 2026",
            texto: "Faz um projeto de site de algum lugar que você conhece que ainda não tem, que você vai pegar o jeito kk!"
        }
    ]
  }
];

let topicoAtual = null;

const vistaLista = document.querySelector("#vista-lista");
const vistaDetalhe = document.querySelector("#vista-detalhe");
const listaTopicosEl = document.querySelector("#lista-topicos");
const formNovoTopico = document.querySelector("#form-novo-topico");

//utilizando renderizar para as respostas
function renderizarLista() {
  listaTopicosEl.innerHTML = "";

  topicos.forEach((topico) => {
    const qtd = topico.respostas.length;
    const textoResp = qtd === 1 ? "1 resposta" : `${qtd} respostas`;

    const card = document.createElement("article");
    card.className = "topico-card";
    card.innerHTML = `
      <h3>${topico.titulo}</h3>
      <span class="topico-meta">${topico.autor} · ${topico.data} · ${textoResp}</span>
    `;

    //ao clicar na pergunta abre um "card" para responder
    card.addEventListener("click", () => abrirDetalhe(topico));
    listaTopicosEl.appendChild(card);
  });
}

//abre a tela de detalhes e respostas
function abrirDetalhe(topico) {
  topicoAtual = topico;
  vistaLista.classList.add("oculto");
  vistaDetalhe.classList.remove("oculto");

  const qtd = topico.respostas.length;
  const textoResp = qtd === 1 ? "1 resposta" : `${qtd} respostas`;

  document.querySelector("#detalhe-titulo").textContent = topico.titulo;
  document.querySelector("#detalhe-meta").textContent = `${topico.autor} · ${topico.data} · ${textoResp}`;
  document.querySelector("#detalhe-corpo").textContent = topico.mensagem;

  const listaRespEl = document.querySelector("#lista-respostas");
  listaRespEl.innerHTML = "";

  if (topico.respostas.length === 0) {
    listaRespEl.innerHTML = `<p class="topico-meta">Nenhuma resposta ainda. Seja o primeiro a responder!</p>`;
  } else {
    topico.respostas.forEach((resp) => {
      const div = document.createElement("div");
      div.className = "resposta-item";
      div.innerHTML = `
        <span class="resposta-autor">${resp.autor} · ${resp.data}</span>
        <p>${resp.texto}</p>
      `;
      listaRespEl.appendChild(div);
    });
  }
}

    //botão "voltar aos tópicos"
document.querySelector("#btn-voltar").addEventListener("click", () => {
  vistaDetalhe.classList.add("oculto");
  vistaLista.classList.remove("oculto");
  renderizarLista();
});

    //abrir e fechar o forum
document.querySelector("#btn-abrir-novo").addEventListener("click", () => {
  formNovoTopico.classList.toggle("oculto");
});

document.querySelector("#btn-cancelar-topico").addEventListener("click", () => {
  formNovoTopico.reset();
  formNovoTopico.classList.add("oculto");
});

//publicar novo tópico
formNovoTopico.addEventListener("submit", (e) => {
  e.preventDefault();
  const novo = {
    id: Date.now(),
    titulo: document.querySelector("#novo-titulo").value,
    autor: document.querySelector("#novo-autor").value,
    data: "17 de nov. de 2026",
    mensagem: document.querySelector("#novo-mensagem").value,
    respostas: []
  };

  topicos.unshift(novo); // adiciona no topo da lista
  formNovoTopico.reset();
  formNovoTopico.classList.add("oculto");
  renderizarLista();

  alert(`Novo tópico enviado com sucesso!`); //acrescentei uma mensagem de alerta para aparecer quando clicar no botão de publicar   topico
});

//enviar nova resposta dentro do tópico aberto
document.querySelector("#form-nova-resposta").addEventListener("submit", (e) => {
  e.preventDefault();
  if (!topicoAtual) return;

  topicoAtual.respostas.push({
    autor: document.querySelector("#resp-autor").value,
    data: "17 de nov. de 2026",
    texto: document.querySelector("#resp-texto").value
  });

  e.target.reset();
  abrirDetalhe(topicoAtual); // atualiza a tela com a nova resposta e coloquei uma mensagem de alerta para aparecer quando clicar no botão de enviar a resposta

  alert(`Nova resposta enviada com sucesso!`)
});

//inicializa a página
renderizarLista();

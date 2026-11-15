lucide.createIcons();

const frm = document.querySelector("form");

frm.addEventListener("submit", (e) => {
    e.preventDefault();

//essas variaveis serve para pegar os valores dos inputs do formulario
const nome = document.querySelector("#inNome").value;
const curso = document.querySelector("#inCurso").value;
const opcoes = document.querySelector("#inOpcoes").value;
const sugestao = document.querySelector("#inSugestao").value;

//esse if e else vai servir para verificar se ja existe algum valor salvo no localstorage, caso exista ele vai adicionar o novo valor ao final do valor ja existente, ai caso nao exista ele vai criar um novo valor no localstorage
    if(localStorage.getItem("opcoes")){
        localStorage.setItem("Nome", localStorage.getItem("Nome") + ";" + nome);
        localStorage.setItem("Curso", localStorage.getItem("Curso") + ";" + curso);
        localStorage.setItem("Opcoes", localStorage.getItem("Opcoes") + ";" + opcoes);
        localStorage.setItem("Sugestao", localStorage.getItem("Sugestao") + ";" + sugestao);
    } else{
        localStorage.setItem("Nome", nome);
        localStorage.setItem("Curso", curso);
        localStorage.setItem("Opcoes", opcoes);
        localStorage.setItem("Sugestao", sugestao);
    }
        alert(`Sugestão enviada com sucesso!`);

    frm.reset();
    frm.inNome.focus();
})


//seleciona todos os botões de filtro e todos os cartões de aviso
const botoesFiltro = document.querySelectorAll(".filtro-btn");
const cardAvisos = document.querySelectorAll(".aviso-card");

botoesFiltro.forEach((botao) => {
    botao.addEventListener("click", () => {
//Remove a classe 'ativo' de todos os botões e coloca apenas no clicado
botoesFiltro.forEach(b => b.classList.remove("ativo"));
botao.classList.add("ativo");

const categoriaFiltro = botao.textContent.trim().toLocaleLowerCase();
//percorre cada cartão para decidir se mostra ou esconde
cardAvisos.forEach((card) => {
    const textoSelo = card.querySelector('.selo2').textContent.trim().toLocaleLowerCase(); // //trim remove os espaços do inicio e do fim da palavra
    if (categoriaFiltro === "todos" || textoSelo === categoriaFiltro) {
        card.style.display = "block"; //esse mostra o cartao
    } else {
        card.style.display = "none"; //esse esconde o cartao
            }
        });
    });
});

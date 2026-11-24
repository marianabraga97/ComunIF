lucide.createIcons();

//declaracao de variaveis para utilizarmos
const formLogin = document.querySelector("#form-login");
const inputEmail = document.querySelector("#email");
const inputSenha = document.querySelector("#senha");
const checkManter = document.querySelector("#manter-conectado");
const btnToggleSenha = document.querySelector("#btn-toggle-senha");
const iconeOlho = document.querySelector("#icone-olho");
const mensagemFeedback = document.querySelector("#mensagem-feedback");

//aqui vai deixar o login salvo, se a opção "Manter conectado" tiver sido marcado antes
const loginSalvo = localStorage.getItem("login_salvo");
if (loginSalvo) {
  inputEmail.value = loginSalvo;
  checkManter.checked = true;
}

//aqui será para mostrar ou ocultar a senha, a interação daquele icone de olho
if (btnToggleSenha && inputSenha && iconeOlho) {
  btnToggleSenha.addEventListener("click", () => {

    const senhaOculta = inputSenha.type === "password";
    inputSenha.type = senhaOculta ? "text" : "password";

    //aqui seria quando o usuario for habilitar para visualizar a senha e depois clicar novamente para ocultar, assim ele voltaria ao incone normal
    btnToggleSenha.innerHTML = `<i data-lucide="${senhaEstavaOculta ? "eye-off" : "eye"}"></i>`;
    lucide.createIcons();
    });
}
//formulario do usuario e senha
formLogin.addEventListener("submit", (event) => {
    event.preventDefault();

    const UsuarioEmail = inputEmail.value.trim();
    const senha = inputSenha.value.trim();

    if (checkManter && checkManter.checked) {
    localStorage.setItem("login_salvo", UsuarioEmail);
  } else if (checkManter) {
    localStorage.removeItem("login_salvo");
  }

  //uma mensagem informando que está acessando a pagina principal
  localStorage.setItem("login_sessao", UsuarioEmail);
  mensagemFeedback.textContent = "Acessando portal ComunIF...";

  setTimeout(() => {
    window.location.href = "inicio.html"; // será redirecionado para a página inicial
  }, 400);

});
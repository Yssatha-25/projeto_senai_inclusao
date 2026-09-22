// =========================================================
// SEM BARREIRAS — interações acessíveis
// 1) Alternância de alto contraste (persistida em localStorage)
// 2) Menu de navegação recolhível em telas pequenas
// =========================================================

(function () {
  "use strict";

  var root = document.documentElement;
  var btnContraste = document.getElementById("btn-contraste");
  var CHAVE_CONTRASTE = "sem-barreiras-contraste";

  function aplicarContraste(ativo) {
    root.setAttribute("data-contrast", ativo ? "alto" : "normal");
    btnContraste.setAttribute("aria-pressed", ativo ? "true" : "false");
    btnContraste.textContent = ativo ? "Desativar alto contraste" : "Ativar alto contraste";
  }

  // Restaura a preferência salva pelo usuário, se existir
  try {
    var salvo = window.localStorage.getItem(CHAVE_CONTRASTE);
    if (salvo === "alto") {
      aplicarContraste(true);
    }
  } catch (erro) {
    // localStorage indisponível (ex.: navegação privada); segue com o padrão
  }

  btnContraste.addEventListener("click", function () {
    var estaAtivo = btnContraste.getAttribute("aria-pressed") === "true";
    aplicarContraste(!estaAtivo);
    try {
      window.localStorage.setItem(CHAVE_CONTRASTE, !estaAtivo ? "alto" : "normal");
    } catch (erro) {
      // segue sem persistir a preferência
    }
  });

  // Menu responsivo: alterna a visibilidade da lista de links no mobile
  var btnMenu = document.getElementById("btn-menu");
  var listaMenu = document.getElementById("lista-menu");

  btnMenu.addEventListener("click", function () {
    var aberto = listaMenu.classList.toggle("aberto");
    btnMenu.setAttribute("aria-expanded", aberto ? "true" : "false");
  });

  // Fecha o menu mobile automaticamente ao escolher um link
  listaMenu.addEventListener("click", function (evento) {
    if (evento.target.tagName === "A" && listaMenu.classList.contains("aberto")) {
      listaMenu.classList.remove("aberto");
      btnMenu.setAttribute("aria-expanded", "false");
    }
  });
})();

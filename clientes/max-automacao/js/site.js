// Max Automação Comercial — interações do site
(function () {
  "use strict";

  var WHATSAPP_COMERCIAL = "5594991209730";

  // Menu mobile
  var menu = document.getElementById("menu");
  var menuBotao = document.getElementById("menu-botao");
  function definirMenu(aberto) {
    menu.classList.toggle("aberto", aberto);
    menuBotao.setAttribute("aria-expanded", String(aberto));
    menuBotao.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
    menuBotao.querySelector("use").setAttribute("href", aberto ? "#i-x" : "#i-menu");
  }
  menuBotao.addEventListener("click", function () { definirMenu(!menu.classList.contains("aberto")); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) definirMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") definirMenu(false); });

  // Formulário "Monte seu pacote" → mensagem pronta no WhatsApp do comercial
  var form = document.getElementById("form-proposta");
  var erro = document.getElementById("form-erro");

  function mascararTelefone(v) {
    var d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 2) return d.length ? "(" + d : "";
    if (d.length <= 6) return "(" + d.slice(0, 2) + ") " + d.slice(2);
    if (d.length <= 10) return "(" + d.slice(0, 2) + ") " + d.slice(2, 6) + "-" + d.slice(6);
    return "(" + d.slice(0, 2) + ") " + d.slice(2, 7) + "-" + d.slice(7);
  }
  form.whatsapp.addEventListener("input", function () { form.whatsapp.value = mascararTelefone(form.whatsapp.value); });
  form.addEventListener("input", function (e) {
    if (e.target.getAttribute("aria-invalid") === "true" && e.target.value.trim()) e.target.removeAttribute("aria-invalid");
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var segmento = form.querySelector('input[name="segmento"]:checked');
    var solucoes = Array.prototype.map.call(form.querySelectorAll('input[name="solucoes"]:checked'), function (c) { return c.value; });
    var faltando = [];
    ["nome", "empresa", "whatsapp", "cidade"].forEach(function (campo) {
      var el = form[campo];
      var invalido = !el.value.trim() || (campo === "whatsapp" && el.value.replace(/\D/g, "").length < 10);
      el.setAttribute("aria-invalid", String(invalido));
      if (invalido) faltando.push(el);
    });

    if (!segmento) {
      mostrarErro("Escolha o seu segmento.", form.querySelector('input[name="segmento"]'));
      return;
    }
    if (faltando.length) {
      mostrarErro("Preencha seus dados (WhatsApp com DDD).", faltando[0]);
      return;
    }
    erro.hidden = true;

    var linhas = [
      "Olá! Gostaria de receber uma proposta.",
      "",
      "*Nome:* " + form.nome.value.trim(),
      "*Estabelecimento:* " + form.empresa.value.trim(),
      "*WhatsApp:* " + form.whatsapp.value.trim(),
      "*Cidade/UF:* " + form.cidade.value.trim(),
      "*Segmento:* " + segmento.value,
      "*Soluções:* " + (solucoes.length ? solucoes.join(", ") : "a definir")
    ];
    window.open("https://wa.me/" + WHATSAPP_COMERCIAL + "?text=" + encodeURIComponent(linhas.join("\n")), "_blank", "noopener");
  });

  function mostrarErro(texto, foco) {
    erro.textContent = texto;
    erro.hidden = false;
    foco.focus();
  }

  // Ano no rodapé
  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
})();

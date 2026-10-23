// Max Automação Comercial — interações do site
(function () {
  "use strict";

  var WHATSAPP_COMERCIAL = "5594991209730";
  document.documentElement.classList.add("js");

  // Cabeçalho com sombra ao rolar
  var topo = document.getElementById("topo");
  function marcarRolagem() { topo.classList.toggle("rolou", window.scrollY > 8); }
  window.addEventListener("scroll", marcarRolagem, { passive: true });
  marcarRolagem();

  // Menu mobile
  var menu = document.getElementById("menu");
  var menuBotao = document.getElementById("menu-botao");
  function fecharMenu() {
    menu.classList.remove("aberto");
    menuBotao.setAttribute("aria-expanded", "false");
    menuBotao.setAttribute("aria-label", "Abrir menu");
    menuBotao.querySelector("use").setAttribute("href", "#i-menu");
  }
  menuBotao.addEventListener("click", function () {
    var abrir = !menu.classList.contains("aberto");
    menu.classList.toggle("aberto", abrir);
    menuBotao.setAttribute("aria-expanded", String(abrir));
    menuBotao.setAttribute("aria-label", abrir ? "Fechar menu" : "Abrir menu");
    menuBotao.querySelector("use").setAttribute("href", abrir ? "#i-x" : "#i-menu");
  });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) fecharMenu(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") fecharMenu(); });

  // Abas de segmentos (padrão WAI-ARIA tabs)
  var abas = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  function selecionarAba(aba, focar) {
    abas.forEach(function (a) {
      var ativa = a === aba;
      a.setAttribute("aria-selected", String(ativa));
      a.tabIndex = ativa ? 0 : -1;
      document.getElementById(a.getAttribute("aria-controls")).hidden = !ativa;
    });
    if (focar) aba.focus();
  }
  abas.forEach(function (aba, i) {
    aba.addEventListener("click", function () { selecionarAba(aba); });
    aba.addEventListener("keydown", function (e) {
      var alvo = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") alvo = abas[(i + 1) % abas.length];
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") alvo = abas[(i - 1 + abas.length) % abas.length];
      if (e.key === "Home") alvo = abas[0];
      if (e.key === "End") alvo = abas[abas.length - 1];
      if (alvo) { e.preventDefault(); selecionarAba(alvo, true); }
    });
  });
  // Links do rodapé que abrem uma aba específica
  document.querySelectorAll("[data-aba]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      selecionarAba(document.getElementById(link.getAttribute("data-aba")));
      document.getElementById("solucoes").scrollIntoView();
    });
  });

  // Revelar blocos ao rolar
  var blocos = document.querySelectorAll(".secao__cab, .segmentos, .cartao, .etapas li, .sobre > *, .depoimento, .proposta > *, .duvidas__lista, .suporte__in > *");
  if ("IntersectionObserver" in window) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("visivel"); observador.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    blocos.forEach(function (b) { b.classList.add("revelar"); observador.observe(b); });
  }

  // Formulário de proposta → mensagem pronta no WhatsApp do comercial
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
    var faltando = [];
    ["nome", "empresa", "whatsapp", "cidade"].forEach(function (campo) {
      var el = form[campo];
      var vazio = !el.value.trim() || (campo === "whatsapp" && el.value.replace(/\D/g, "").length < 10);
      el.setAttribute("aria-invalid", String(vazio));
      if (vazio) faltando.push(el);
    });
    var segmento = form.querySelector('input[name="segmento"]:checked');
    var solucoes = Array.prototype.map.call(form.querySelectorAll('input[name="solucoes"]:checked'), function (c) { return c.value; });

    if (faltando.length || !segmento) {
      erro.textContent = faltando.length ? "Preencha os campos destacados (WhatsApp com DDD)." : "Escolha o seu segmento.";
      erro.hidden = false;
      (faltando[0] || form.querySelector('input[name="segmento"]')).focus();
      return;
    }
    erro.hidden = true;

    var linhas = [
      "Olá! Vim pelo site e quero uma proposta.",
      "",
      "*Nome:* " + form.nome.value.trim(),
      "*Empresa:* " + form.empresa.value.trim(),
      "*WhatsApp:* " + form.whatsapp.value.trim(),
      "*Cidade/UF:* " + form.cidade.value.trim(),
      "*Segmento:* " + segmento.value,
      "*Preciso de:* " + (solucoes.length ? solucoes.join(", ") : "quero orientação")
    ];
    window.open("https://wa.me/" + WHATSAPP_COMERCIAL + "?text=" + encodeURIComponent(linhas.join("\n")), "_blank", "noopener");
  });

  // Ano no rodapé
  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
})();

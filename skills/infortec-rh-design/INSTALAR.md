# Como instalar a skill Infortec RH Design

A mesma pasta funciona no Claude e no Codex: os dois leem skills no formato `SKILL.md` com cabeçalho `name` + `description`. Copie **a pasta inteira** (`infortec-rh-design/`), não só o `SKILL.md`, porque os arquivos de referência ficam ao lado dele.

```
infortec-rh-design/
├── SKILL.md          ← regras e referência rápida (o agente lê primeiro)
├── tokens.css        ← cores, fontes, medidas
├── tailwind.md       ← configuração Tailwind v3/v4 + fontes no Laravel
├── componentes.md    ← componentes Blade (<x-rh.card>, <x-rh.kpi>, <x-rh.status>...)
├── padroes-rh.md     ← telas de RH: ponto, férias, folha, documentos
├── graficos.md       ← Chart.js no padrão da identidade
├── exemplo.html      ← painel de referência (abra no navegador)
└── assets/           ← logo-azul.png, logo-branca.png
```

## Claude

**Claude Code, só no projeto do RH (recomendado):**
```bash
# na raiz do projeto Laravel do RH
mkdir -p .claude/skills
cp -r caminho/para/infortec-rh-design .claude/skills/
```
Windows (PowerShell): `Copy-Item -Recurse caminho\para\infortec-rh-design .claude\skills\`

**Claude Code, em todos os projetos:** copie para `~/.claude/skills/infortec-rh-design/` (Windows: `%USERPROFILE%\.claude\skills\`).

**Claude.ai / app do Claude:** compacte a pasta em `infortec-rh-design.zip` (a pasta precisa estar dentro do zip) e envie em Configurações › Capacidades › Skills. Se a organização já usa a skill Infortec Design, o administrador pode publicá-la para todos da mesma forma.

## Codex

**No projeto do RH (recomendado):**
```bash
mkdir -p .agents/skills
cp -r caminho/para/infortec-rh-design .agents/skills/
```
Versões mais antigas do Codex procuram em `.codex/skills/`. Se a skill não aparecer, copie para lá também.

**Em todos os projetos:** `~/.codex/skills/infortec-rh-design/` (ou `$CODEX_HOME/skills/`; Windows: `%USERPROFILE%\.codex\skills\`). Reinicie o Codex depois de instalar.

## Garantia extra: AGENTS.md e CLAUDE.md
Para o agente usar a skill mesmo quando não a escolher sozinho, cole este trecho no `AGENTS.md` (Codex) e no `CLAUDE.md` (Claude) na raiz do projeto do RH, ajustando o caminho:

```markdown
## Interface (obrigatório)
Toda tela, view Blade, componente, gráfico ou CSS deste projeto segue a identidade **Infortec RH Design**.
Antes de criar ou alterar qualquer interface, leia `.agents/skills/infortec-rh-design/SKILL.md`
(no Claude: `.claude/skills/infortec-rh-design/SKILL.md`) e os arquivos que ele indicar.
Resumo: azul Infortec `#0042D7` como destaque, botão principal `#0036B0`, fundo `#F4F6FA`,
cards brancos com borda de 1px, Plus Jakarta Sans + JetBrains Mono, todo número isolado em mono,
formato pt-BR, verde só para sucesso. Componentes Blade em `resources/views/components/rh/`.
```

## Primeiro uso no projeto
Peça ao agente: *"Aplique a skill infortec-rh-design no projeto: configure o Tailwind e as fontes, crie os componentes Blade de `componentes.md` e refaça o dashboard em `/dashboard` seguindo `exemplo.html`."*

Ele deve:
1. Copiar `assets/logo-*.png` para `public/img/`.
2. Ajustar `resources/css/app.css` (e `tailwind.config.js`, se for Tailwind v3) conforme `tailwind.md`.
3. Criar `app/helpers.php` e os componentes em `resources/views/components/rh/`.
4. Instalar `mallardduck/blade-lucide-icons` e `chart.js`.
5. Rodar `npm run build` e conferir em `http://localhost:8080/RH/public/dashboard`, inclusive com a janela estreita (390px).

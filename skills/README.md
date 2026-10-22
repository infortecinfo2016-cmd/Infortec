# Skills da Infortec

## meu-plantio-design

Padrão visual **Caderno de campo** do app Meu Plantio (Flutter para Android, iOS e portal web): cores, fontes, componentes, padrões de app, receitas das telas principais e a lista de funcionalidades que não podem se perder numa reestilização.

Com a skill instalada, o Claude Code ou o Codex a usa sozinho sempre que você pedir algo de interface do Meu Plantio, por exemplo "cria a tela de colheita" ou "adiciona o campo de nota fiscal na nova despesa".

A skill segue o padrão aberto de Agent Skills: uma pasta com `SKILL.md` e arquivos de apoio. Por isso a mesma pasta funciona nas duas ferramentas.

```
meu-plantio-design/
├── SKILL.md                 regras, referência rápida e revisão
├── references/
│   ├── tokens.md            cores, fontes, medidas e ícones
│   ├── flutter.md           ThemeData, formatos pt-BR e widgets prontos
│   ├── telas.md             receitas das telas principais e do portal web
│   └── inventario.md        funcionalidades do app e defeitos conhecidos
└── assets/
    └── tokens.json          os mesmos tokens em JSON
```

### Instalar

Clone o repositório (ou baixe a pasta `skills/`) e rode o instalador.

**Linux e Mac**
```bash
cd skills
chmod +x instalar.sh
./instalar.sh                 # Claude Code e Codex, para o seu usuário
```

**Windows (PowerShell)**
```powershell
cd skills
powershell -ExecutionPolicy Bypass -File .\instalar.ps1
```

Depois, abra uma sessão nova do Claude Code ou do Codex.

| Opção (sh / ps1) | O que faz |
|---|---|
| `--claude` / `-Claude` | Instala só no Claude Code |
| `--codex` / `-Codex` | Instala só no Codex |
| `--projeto CAMINHO` / `-Projeto CAMINHO` | Instala dentro do projeto, em vez do seu usuário. Faça o commit para o time todo receber |
| `--codex-antigo` / `-CodexAntigo` | Também copia para `~/.codex/skills`, pasta usada por versões antigas do Codex |
| `--remover` / `-Remover` | Remove a skill dos mesmos lugares |

### Onde cada ferramenta procura

| Ferramenta | Só para você | Dentro de um projeto |
|---|---|---|
| Claude Code | `~/.claude/skills/meu-plantio-design/` | `.claude/skills/meu-plantio-design/` |
| Codex | `~/.agents/skills/meu-plantio-design/` | `.agents/skills/meu-plantio-design/` |

Para instalar à mão, copie a pasta `meu-plantio-design` inteira para um desses lugares.

**Recomendado:** instale dentro do repositório do app Meu Plantio com `--projeto`. Assim, quem clonar o projeto já recebe a skill, nas duas ferramentas.

### Conferir se funcionou

- **Claude Code:** pergunte "quais skills você tem?" e procure `meu-plantio-design`. Para chamar direto, digite `/meu-plantio-design`.
- **Codex:** digite `/skills` para ver a lista, ou cite `$meu-plantio-design` no pedido para chamar direto.

### Atualizar

Edite os arquivos em `skills/meu-plantio-design/` neste repositório e rode o instalador de novo: ele substitui a versão instalada.

# Skill Infortec Design

Design system dos softwares Infortec, em formato de skill do Claude.

| Arquivo | Conteúdo |
|---|---|
| `SKILL.md` | regras e referência rápida (o Claude lê primeiro) |
| `tokens.css` | cores, fontes, raios e espaçamentos em CSS |
| `tailwind.md` | os mesmos tokens para Tailwind v3/v4 e shadcn |
| `componentes.md` | topo, cabeçalho, KPIs, gauge, listas, tabela, segmentado... |
| `graficos.md` | padrões de gráficos (Recharts) |
| `exemplo.html` | tela de referência — abra no navegador |

## Instalar

**Claude Code, em todos os projetos (no seu computador):**
```bash
mkdir -p ~/.claude/skills && cp -r .claude/skills/infortec-design ~/.claude/skills/
```

**Claude Code, só num projeto:** copie a pasta para `<projeto>/.claude/skills/infortec-design/` e faça commit (assim vale também nas sessões na nuvem).

**claude.ai / app do Claude:** Configurações → Capacidades → Skills → Enviar skill → escolha `infortec-design.zip` (na raiz deste repositório).

## Atualizar o zip depois de editar
```bash
cd .claude/skills && rm -f ../../infortec-design.zip && zip -r ../../infortec-design.zip infortec-design -x "*/README.md"
```

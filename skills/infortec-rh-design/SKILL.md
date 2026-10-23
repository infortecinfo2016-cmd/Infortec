---
name: infortec-rh-design
description: Identidade visual do Infortec RH (Laravel + Blade + Tailwind). Use ao criar ou alterar telas, páginas, dashboards, gráficos, formulários ou componentes Blade do sistema de RH: colaboradores, ponto, férias, folha, documentos, departamentos.
---

# Infortec RH Design

## Visão geral
O Infortec RH é da família Infortec Design: painel administrativo claro, denso e calmo, cards brancos com borda fina, **números sempre em fonte mono** e formato pt-BR. O que muda é a cor. **O RH é azul Infortec** (`#0042D7`, a cor da logo), sobre neutros cinza-azulados. O verde aparece só como estado de sucesso ("Ativo", "Aprovado", "Presente").

Toda tela nova deve parecer feita pela mesma mão do painel em `exemplo.html`.

**Não use** no site institucional (identidade "laboratório" escura) nem nos outros sistemas Infortec (CRM, Cobrix etc. usam o verde do Infortec Design).

## Antes de escrever a tela
1. O projeto é Laravel + Blade + Tailwind (Vite). Se `resources/css/app.css` ou `tailwind.config.js` já tem tokens, **troque os valores** pelos de `tokens.css`; não crie uma segunda paleta.
2. Configuração do Tailwind (v3 ou v4) e fontes: `tailwind.md`.
3. Monte a tela com os componentes Blade de `componentes.md` (`<x-rh.card>`, `<x-rh.kpi>`, `<x-rh.status>`...).
4. Telas de RH (colaborador, ponto, férias, folha, documentos): `padroes-rh.md`.
5. Gráficos (Chart.js): `graficos.md`.
6. Na dúvida sobre o resultado visual, abra `exemplo.html`. É a referência de ouro.

## Referência rápida
| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#F4F6FA` | fundo da página |
| `--card` | `#FFFFFF` | cards, topo, menu lateral, tabelas |
| `--muted` | `#F9FAFC` | caixinhas dentro de card, cabeçalho de tabela |
| `--track` | `#EEF1F6` | trilha de gauge e de barra de progresso |
| `--border` | `#E2E6EE` | borda de card · divisor de linha `#ECEFF4` |
| `--text` | `#151A23` | texto principal |
| `--text-muted` | `#667085` | subtítulos, legendas, rótulos |
| `--primary` | `#0036B0` | botão principal, link ativo, texto de badge da marca |
| `--brand` | `#0042D7` | gauge, barras, item ativo, foco, "Admissões" |
| `--brand-soft` | `#DCE6FB` | fundo de badge, item ativo do menu, card de pico (borda `#A9C1F5`) |
| `--ok` | `#25D366` | sucesso: ativo, aprovado, presente (texto `#0B7155` sobre `#D9F7E6`) |
| `--info` | `#8B5CF6` | férias, segunda série de gráfico (texto `#6D28D9` sobre `#EDE9FE`) |
| `--warn` | `#F59E0B` | atenção: pendente, atraso, vence em breve |
| `--danger` | `#EF4444` | ruim: falta, recusado, vencido, notificação |

Paleta categórica (departamentos, cargos, séries; nesta ordem): azul Infortec `#0042D7`, verde `#25D366`, âmbar `#F59E0B`, violeta `#8B5CF6`, rosa `#EC4899`, teal `#14B8A6`, vermelho `#EF4444`, céu `#0EA5E9`, marrom `#A16207`, ardósia `#64748B` (sempre por último: "outros"). **Não use `#3B82F6`** no RH: fica parecido demais com o azul da marca.

**Tipografia:** Plus Jakarta Sans (texto) + JetBrains Mono (números). Título da página 24px/700 · título de card 14px/600 · texto 13px · rótulo 11px MAIÚSCULO muted · valor KPI 20px mono/700.

**Forma:** card raio 8px, borda 1px, sem sombra (no máximo `0 1px 2px rgb(16 24 40 / .04)`). Botão/input raio 6px, altura 32px. Ícone-bloco 32px raio 8px, cor sólida, ícone branco. Espaçamento base 4px; gap entre cards 12px; padding de card 16px.

**Ícones:** lucide (`blade-lucide-icons`: `<x-lucide-users class="size-4" />`), 16px em botões, 14px ao lado de rótulos, traço 2.

**Marca:** no topo do menu lateral, `logo-azul.png` com 24px de altura + "Infortec" 15px/700 + selo `RH` (mono 10px/700, `bg-brand-soft text-primary`, raio 4px). A logo também é o favicon. Sobre fundo azul use `logo-branca.png`.

## Regras que definem a identidade
- **Azul = marca e ação; verde = deu certo.** Botão principal, link ativo, gauge, barra e destaque são azuis. Verde só em estado de sucesso. Nunca botão verde.
- **Número isolado = mono.** Dinheiro, %, contagens, horas (`08:48`), saldos (`+12:30`), matrícula, colunas de valor, centro de gauge/donut. Frase com número ("8 h 48 min", "3 admissões este mês") fica em sans 600.
- **Formato pt-BR sempre:** `R$ 4.250,00`, `2,3%`, datas `23/10/2026` em tabela e `23/10` em gráfico, mês `out/26`. PHP: `number_format($v, 2, ',', '.')`; Carbon com `locale('pt_BR')`.
- **Todo card tem título + subtítulo explicando em linguagem simples** o que mostra ("Quem não vem trabalhar hoje e por quê"). Títulos em caixa de frase, nunca CAIXA ALTA.
- **Cabeçalho da página:** linha de contexto muted com ` · ` como separador, depois o H1. À direita: metadado muted, botões outline com ícone e, por último, o botão primário azul.
- **Valor à direita, legenda embaixo:** colunas numéricas alinhadas à direita, cada valor com micro-legenda muted de 10–11px ("salário base", "saldo", "dias").
- **Destaque = azul-suave:** o item de pico ou ativo ganha fundo `--brand-soft` e borda `--brand-border`; os demais ficam brancos.
- **Cor carrega significado:** verde ok, âmbar atenção, vermelho ruim, violeta férias, ardósia desligado/inativo. O gauge muda de cor pelo limite.
- **Dado pessoal é discreto:** salário e CPF aparecem só para quem tem permissão; CPF mascarado (`***.456.789-**`); valores de folha com botão "Ocultar valores" (ícone olho).
- **Cada departamento tem uma cor fixa** (avatar, ponto da legenda, barra), na ordem da paleta, e é a mesma em todas as telas.
- **Responsivo:** KPIs 4 → 2 → 1 coluna; menu lateral vira gaveta abaixo de 1024px; cabeçalhos e ações quebram linha (`flex-wrap`); tabela rola dentro do card; colunas de grade sempre `minmax(0,1fr)`; nada de rolagem horizontal da página em 390px.

## Erros comuns
| Erro | Correção |
|---|---|
| Botão primário verde (`#0B7155`, `#25D366`) | primário é `#0036B0`; verde é estado de sucesso |
| Fundo `#F4F7F4` (esverdeado) | o RH usa `#F4F6FA` |
| `#3B82F6` como segunda série | segunda série é violeta `#8B5CF6` |
| Valores e horas em fonte sans | `font-mono tabular-nums` em todo número isolado |
| `4,250.00`, `$`, `2026-10-23` | formato pt-BR, prefixo `R$ `, data `23/10/2026` |
| Sombra forte, gradiente, glassmorphism | card branco + borda 1px, só isso |
| Card sem subtítulo | adicionar a frase explicativa muted |
| Status como texto solto ("ativo") | `<x-rh.status>` com a cor do significado |
| Cores aleatórias por departamento | paleta categórica na ordem, cor fixa por departamento |
| CPF e salário abertos para todos | mascarar e checar `@can` |

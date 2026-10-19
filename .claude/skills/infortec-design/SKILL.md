---
name: infortec-design
description: Use ao criar ou alterar telas, páginas, dashboards, gráficos ou componentes de UI dos sistemas Infortec (CRM, Cobrix, Clínica, Meu Plantio e novos softwares).
---

# Infortec Design

## Visão geral
Design system dos softwares Infortec: painel administrativo claro, denso e calmo. Fundo cinza-esverdeado, cards brancos com borda fina, **números sempre em fonte mono**, verde WhatsApp como cor de destaque e verde escuro nos botões principais. Toda tela nova deve parecer feita pela mesma mão das telas Servidor, Carteira de clientes e Chamados.

**Não use** no site institucional (`prototipo/`, identidade "laboratório" escura do ROADMAP). Esta skill é para os sistemas.

## Antes de escrever a tela
1. Se o projeto já tem tokens (`globals.css`, `tailwind.config`, shadcn), mapeie-os para os valores de `tokens.css`; não crie uma segunda paleta.
2. Projeto novo: copie `tokens.css` (CSS puro) ou siga `tailwind.md` (Tailwind/shadcn).
3. Monte a tela com os padrões de `componentes.md`. Gráficos: `graficos.md`.
4. Na dúvida sobre o resultado visual, abra `exemplo.html` — é a referência de ouro.

## Referência rápida
| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#F4F7F4` | fundo da página |
| `--card` | `#FFFFFF` | cards, topo, tabelas |
| `--muted` | `#FAFBFA` | caixinhas dentro de card, cabeçalho de tabela, trilhas |
| `--border` | `#E3E7E3` | borda de card · divisor de linha `#EEF0EE` |
| `--text` | `#171A17` | texto principal |
| `--text-muted` | `#6B716C` | subtítulos, legendas, rótulos |
| `--primary` | `#0B7155` | botão principal, links ativos, texto de badge |
| `--brand` | `#25D366` | gauge, barras de progresso, destaque, "Resolvidos" |
| `--brand-soft` | `#D9F7E6` | fundo de badge e card destacado |
| `--info` | `#3B82F6` | "Abertos", heatmap, segunda série |
| `--warn` | `#F59E0B` | atenção, linha de participação |
| `--danger` | `#EF4444` | prazo vencido, SLA ruim, notificação |

Paleta categórica (nesta ordem): verde `#25D366`, azul `#3B82F6`, âmbar `#F59E0B`, violeta `#8B5CF6`, rosa `#EC4899`, teal `#14B8A6`, vermelho `#EF4444`, céu `#0EA5E9`, marrom `#A16207`, ardósia `#64748B` (sempre por último: "outros").

**Tipografia:** Plus Jakarta Sans (texto) + JetBrains Mono (números). Título da página 24px/700 · título de card 14px/600 · texto 13px · rótulo 11px MAIÚSCULO muted · valor KPI 20px mono/700.

**Forma:** card raio 8px, borda 1px, sem sombra (no máximo `0 1px 2px rgb(0 0 0 / .04)`). Botão/input raio 6px, altura 32px. Ícone-bloco 32px raio 8px, cor sólida, ícone branco. Espaçamento base 4px; gap entre cards 12px; padding de card 16px.

**Ícones:** lucide (`lucide-react`), 16px em botões, 14px ao lado de rótulos, traço 2.

## Regras que definem a identidade
- **Número isolado = mono.** Dinheiro, %, GB, contagens, colunas de valor, centro de gauge/donut. Frase com número ("18,1 GB de 195,7 GB", "12 dias e 1 h") fica em sans 600.
- **Formato pt-BR sempre:** `R$ 12.386,08`, `42,9%`, `1,2 GB`, datas `19/10`. Use `Intl.NumberFormat('pt-BR')`.
- **Todo card tem título + subtítulo explicando em linguagem simples** o que mostra ("Quanto cada programa da VPS está usando agora"). Títulos em caixa de frase, nunca CAIXA ALTA.
- **Cabeçalho da página:** linha de contexto muted com ` · ` como separador → H1 → à direita, metadado muted + botões outline com ícone + botão primário verde por último.
- **Valor à direita, legenda embaixo:** colunas numéricas alinhadas à direita, cada valor com uma micro-legenda muted de 10–11px ("arquivos", "total", "você recebe").
- **Destaque = verde-suave:** o item de pico/ativo ganha fundo `--brand-soft` e borda verde; os demais ficam brancos.
- **Cor carrega significado:** verde ok, âmbar atenção, vermelho ruim. Gauge muda de cor pelo limite.
- **Responsivo:** KPIs 4 → 2 → 1 coluna; cabeçalhos e ações quebram linha (`flex-wrap`); tabela rola dentro do card; colunas de grade sempre `minmax(0,1fr)`; nada de rolagem horizontal da página em 390px.
- **Cada sistema tem uma cor fixa** (ícone, barra, avatar, ponto da legenda) e ela é a mesma em todas as telas.

## Erros comuns
| Erro | Correção |
|---|---|
| Valores em fonte sans | `font-mono tabular-nums` em todo número isolado |
| `12,386.08` ou `$` | formatar com `pt-BR`, prefixo `R$ ` |
| Sombra forte, gradiente, glassmorphism | card branco + borda 1px, só isso |
| Botão primário azul ou `#25D366` | primário é `#0B7155`; `#25D366` é dado/destaque |
| Card sem subtítulo | adicionar a frase explicativa muted |
| Gráfico com eixos/linhas pesadas | ver `graficos.md`: grade tracejada horizontal, sem linha de eixo |
| Cores aleatórias por item | usar a paleta categórica na ordem |

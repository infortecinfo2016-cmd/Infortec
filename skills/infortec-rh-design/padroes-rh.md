# Padrões de tela do Infortec RH

Cada tela segue a mesma estrutura de `componentes.md`: cabeçalho, KPIs e cards de seção. Aqui ficam as peças próprias de RH. `exemplo.html` mostra o painel montado.

## Significado fixo das cores no RH
| Assunto | Cor | Token |
|---|---|---|
| Admissões, entradas, a marca | azul Infortec | `--brand` / `--c1` |
| Desligamentos, saídas | rosa | `--c5` |
| Ativo, aprovado, presente, ponto fechado | verde | `--ok` |
| Férias, licença programada | violeta | `--info` |
| Pendente, atraso, afastado, vence em até 30 dias | âmbar | `--warn` |
| Falta, recusado, vencido, saldo negativo | vermelho | `--danger` |
| Desligado, inativo, folga, "outros" | ardósia | `--neutral` / `--c10` |

Departamentos recebem a paleta categórica na ordem em que foram cadastrados (`--c1` … `--c9`; `--c10` fica para "outros"). Guarde a cor no cadastro do departamento (`departamentos.cor`), para que ela não mude quando um departamento novo entrar.

## Painel (dashboard)
Contexto: `Outubro de 2026 · 128 colaboradores ativos`. H1 "Painel". Ações: metadado "Ponto sincronizado há 4 min", outline "Exportar", primário "Novo colaborador".

1. **KPIs (4):** Colaboradores ativos (KPI A, `users`, `--c1`, "3 admissões · 1 desligamento no mês"), Folha do mês (KPI A, `wallet`, `--c2`, "líquido previsto · 128 holerites"), Presença hoje (KPI B, gauge, "121 de 128 presentes"), Turnover do mês (KPI B, gauge com `max=10`, "1 desligamento em 128").
2. **Admissões e desligamentos** (barras agrupadas, 6 meses; azul × rosa) + **Por departamento** (donut + lista).
3. **Fora hoje** (lista com status) + **Documentos vencendo** (lista com dias restantes) + **Aniversariantes do mês**.
4. **Colaboradores** (tabela resumida, 5 linhas, link "Ver todos").

## Ficha do colaborador
- Topo em card: avatar 56px (iniciais na cor do departamento) + nome 20px/700 + cargo · departamento (ponto colorido) + `<x-rh.status>`; à direita, caixinhas internas: Matrícula (mono), Admissão (`12/03/2021`, legenda "há 5 anos"), Salário base (mono, só com `@can('ver-salario')`).
- Abas (segmentado ou `border-b` com aba ativa `border-brand text-primary`): Dados · Contrato · Ponto · Férias · Documentos · Histórico.
- **Histórico** é uma linha do tempo vertical: ponto 8px na cor do evento + data mono 11px + frase ("Promovido a Analista II", "Reajuste de 8,5%").

## Ponto
- **Espelho do dia:** 4 batidas em caixinhas internas lado a lado (Entrada · Saída almoço · Volta · Saída), horário mono 15px/700, rótulo 10px muted. Batida faltando: "—" em `text-danger-fg`. Batida ajustada manualmente: ícone `pencil` 12px + legenda "ajustada por Ana".
- **Tabela do mês:** colunas Dia (`seg 21/10`), batidas (mono), Trabalhado (`08:48`), Saldo (`+00:48` em `text-ok-fg`, `−01:12` em `text-danger-fg`, `00:00` muted), Status.
- **Banco de horas:** KPI com saldo mono (`+12:30`); a cor segue o sinal. Subtítulo: "Vence em 90 dias se não for compensado".
- **Cards de período** (como em Infortec Design): Manhã / Tarde / Noite / Madrugada para turnos. O turno com mais gente ganha `bg-brand-soft border-brand-border`.
- **Heatmap de atrasos** (dia da semana × hora): escala `--heat-0…4`; subtítulo cita o achado ("Segunda às 8h concentra os atrasos").

## Férias
- **Linha do tempo (Gantt simples):** uma linha por colaborador, colunas por dia do mês (rótulos a cada 5 dias, mono 10px). Período de férias = barra `h-4 rounded-sm bg-info`; hoje = linha vertical 1px `--brand`; fim de semana com fundo `--muted`.
- **Saldo por colaborador:** "Dias disponíveis" mono + legenda "de 30"; barra 4px violeta.
- **Período concessivo vencendo:** linha com `<x-rh.status tipo="vence">` e "vence em 38 dias" (mono para o número, sans para a frase). Vencido: `tipo="vencido"` e a linha leva `bg-danger-soft/40`.
- Solicitações: tabela com Período (`04/11 → 18/11`, mono), Dias (mono), Status (pendente/aprovado/recusado) e ações "Recusar" (perigo) e "Aprovar" (primário) no fim da linha.

## Folha
- Cabeçalho com segmentado de competência (`set/26 | out/26 | nov/26`) e botão "Ocultar valores".
- KPIs: Bruto, Descontos, Líquido, Encargos (todos `brl()`, mono). Líquido é o destaque: card com `bg-brand-soft border-brand-border`.
- **Composição** (donut): Salários `--c1`, Horas extras `--c3`, Benefícios `--c4`, Encargos `--c6`, Outros `--c10`. Centro: "LÍQUIDO" + valor mono + "por mês".
- Tabela de holerites: colaborador, Bruto, Descontos (mono, `text-danger-fg` com sinal "−"), Líquido (mono bold), botão ícone `file-down` para o PDF.

## Documentos e vencimentos
Lista dentro de card, linhas com `border-b border-divider`:
```
[ícone-bloco 32px na cor do estado]  ASO periódico — MARIA SOUZA        12 dias
                                     Exame ocupacional · vence 04/11/2026   restantes
```
- Dias restantes em mono à direita com micro-legenda "restantes"; ≤ 7 dias `text-danger-fg`, ≤ 30 `text-warn-fg`, depois disso muted.
- Já vencido: "vencido há 3 dias" e o ícone-bloco em `--danger`.
- Tipos comuns e ícones: ASO (`stethoscope`), CNH (`id-card`), Contrato de experiência 45/90 dias (`file-signature`), Treinamento NR (`hard-hat`), Certificado (`award`).

## Aniversariantes e tempo de casa
- Lista compacta: avatar 28px + nome + departamento; à direita, data mono (`25/10`) e legenda ("sábado"). Quem faz aniversário hoje ganha a linha `bg-brand-soft` e ícone `cake` 14px.
- Tempo de casa: "5 anos" em sans 600 (é frase), com a data de admissão mono embaixo.

## Departamentos
- Linha de ranking (como "Por sistema" no Infortec Design): ponto colorido + NOME + "18 pessoas · 2 vagas abertas"; barra 4px com % do quadro; à direita, custo mensal mono + legenda "folha do setor" e headcount mono bold + legenda "pessoas".

## Textos
- Tratamento neutro e direto: "Colaborador(a)" em rótulos genéricos; prefira o nome da pessoa sempre que houver.
- Subtítulos explicam o porquê: "Quem precisa renovar o exame antes de 30 dias", "Saldo positivo vira folga; negativo é descontado".
- Ações com verbo: "Aprovar férias", "Registrar ponto", "Novo colaborador". Confirmação destrutiva nomeia a consequência: "Desligar Maria Souza? O acesso dela ao sistema será bloqueado."

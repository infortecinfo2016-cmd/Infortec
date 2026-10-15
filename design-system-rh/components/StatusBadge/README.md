# StatusBadge

Pílula de status para pessoas, solicitações e dias do ponto. Sempre tem texto: a cor reforça, nunca substitui a palavra.

**Props:** `status` (um dos valores abaixo, já com rótulo e cor) ou `tone` + `children` para casos próprios; `size="sm"` em tabelas e cartões.

| status | rótulo | tom |
|---|---|---|
| `ativo`, `aprovado`, `regular` | Ativo · Aprovado · Regular | success |
| `experiencia` | Em experiência | people |
| `admissao` | Em admissão | brand |
| `ferias`, `licenca` | Em férias · Licença | leave |
| `afastado`, `desligado` | Afastado · Desligado | neutral |
| `pendente`, `analise` | Pendente · Em análise | warning |
| `recusado`, `atraso`, `falta` | Recusado · Atraso · Falta | danger |

- Tons: `success`, `warning`, `danger`, `leave`, `people`, `brand`, `neutral`.
- Não use badge para contagens; use o contador de `Tabs` ou da `SideNav`.

# StatCard

Cartão de indicador do painel de RH: rótulo, número e variação.

**Props:** `label`, `value` (texto já formatado: “2,1”), `unit` (“%”, “h”, “R$”), `icon`, `delta` (texto: “+6”, “−0,4 p.p.”), `deltaLabel` (“vs. setembro”), `trend` (`up` · `down` · `flat`), `goodWhen` (`up` padrão, ou `down` para turnover, absenteísmo e horas extras).

- A cor da variação depende de `goodWhen`: turnover subindo fica em `danger`, mesmo com seta para cima. A seta e o sinal sempre aparecem junto da cor.
- Números com vírgula decimal e pontos de milhar (pt-BR). Percentuais com variação em “p.p.”.
- 3 a 4 cartões por linha no topo do painel; não repita o mesmo número em outro lugar da tela.

# Gráficos Infortec (Recharts)

Princípio: o dado é a única coisa colorida. Grade discreta, sem linha de eixo, legenda pequena com pontos, curvas suaves.

## Padrão comum
```tsx
const axis = { tick: { fontSize: 11, fill: "var(--muted-foreground, #6B716C)" }, axisLine: false, tickLine: false } as const;
const grid = <CartesianGrid vertical={false} stroke="#EEF0EE" strokeDasharray="3 3" />;
const tooltip = <Tooltip cursor={{ stroke: "#E3E7E3" }} contentStyle={{ borderRadius: 8, border: "1px solid #E3E7E3", fontSize: 12, boxShadow: "0 4px 12px rgb(0 0 0 / .06)" }} />;
const legend = <Legend iconType="circle" iconSize={8} align="left" wrapperStyle={{ fontSize: 11, color: "#6B716C", paddingTop: 8 }} />;
```
- Altura: 220–260px dentro do card. Valores de eixo formatados em pt-BR (`R$ 1,2 mil`, `R$ 2 mi`, `0,75%`).
- Datas no eixo X: `dd/MM` (diário) ou `mmm/aa` minúsculo (`nov/25`, mensal).

## Área / linha (entrada × saída, tendência)
```tsx
<AreaChart data={data}>
  <defs>
    {[["a", "#3B82F6"], ["r", "#25D366"]].map(([id, c]) => (
      <linearGradient key={id} id={`g-${id}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={c} stopOpacity={0.25} /><stop offset="100%" stopColor={c} stopOpacity={0} />
      </linearGradient>
    ))}
  </defs>
  {grid}<XAxis dataKey="dia" {...axis} /><YAxis {...axis} width={28} allowDecimals={false} />{tooltip}{legend}
  <Area type="monotone" dataKey="abertos" name="Abertos" stroke="#3B82F6" strokeWidth={2} fill="url(#g-a)" dot={false} />
  <Area type="monotone" dataKey="resolvidos" name="Resolvidos" stroke="#25D366" strokeWidth={2} fill="url(#g-r)" dot={false} />
</AreaChart>
```
Par fixo de significado: **azul = entrada/abertos**, **verde = saída/resolvidos/WhatsApp**.

## Barras
- `radius={[4, 4, 0, 0]}`, `barSize` 14–40 conforme densidade.
- Série principal `#75A8F9` (ou `#3B82F6` quando única); **o pico** ou o item atual em `#25D366` (use `<Cell>`).
- Barras verdes com volume (vendas WhatsApp) podem levar gradiente `#25D366` → 30% de opacidade.
- Combinado barra + linha: barras no eixo esquerdo, linha `#F59E0B` (participação %) no eixo direito com `dot={{ r: 3, fill: "#F59E0B" }}`.

## Donut (composição)
```tsx
<PieChart width={180} height={180}>
  <Pie data={data} dataKey="value" innerRadius={62} outerRadius={84} paddingAngle={1.5} stroke="none" startAngle={90} endAngle={-270}>
    {data.map((d, i) => <Cell key={d.name} fill={d.color ?? `var(--chart-${i + 1})`} />)}
  </Pie>
</PieChart>
```
- Centro (absolute): rótulo `EM USO`/`MENSALIDADES` 10px maiúsculo muted, valor mono 15–20px/700 (precisa caber no furo; reduza antes de vazar), linha `de 195,7 GB`/`por mês` 10px muted.
- Legenda **embaixo ou ao lado** como lista: ponto 8px + nome 11px + valor mono 11px alinhado à direita. Mesma ordem e cores das fatias.
- Fatias ordenadas: itens nomeados primeiro (cores dos sistemas), depois categorias genéricas, "outros" em ardósia `#64748B` por último.

## Heatmap (dia da semana × hora)
- Grade CSS: linhas `Seg…Dom` (rótulo 10px muted à esquerda), colunas por hora (rótulos a cada 2h no topo).
- Célula `h-4 rounded-sm`, gap 2px, escala `--heat-0…--heat-4` de `tokens.css`.
- Legenda à direita embaixo: `menos ▢▢▢▢ mais` (10px muted).
- Subtítulo do card cita o achado: "Dia mais cheio: Qui". Abaixo, mini-barras por dia com o dia de pico em verde.

## Gauge de valor único
Ver `Gauge` em `componentes.md`. Um gauge por card; nunca um velocímetro com ponteiro.

## Não faça
3D, pizza sem furo, mais de 10 cores, legendas grandes, rótulos de valor em todas as barras, eixo Y com linha, cores fora da paleta.

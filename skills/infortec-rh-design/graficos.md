# Gráficos do Infortec RH (Chart.js)

Princípio: o dado é a única coisa colorida. Grade discreta, sem linha de eixo, legenda pequena com pontos, curvas suaves. Se o projeto já usa outra biblioteca (ApexCharts, ECharts), aplique os mesmos valores.

```bash
npm i chart.js
```

## Padrão comum (`resources/js/graficos.js`)
```js
import Chart from 'chart.js/auto';

// Paleta categórica, mesma ordem de --c1…--c10 em tokens.css
export const cores = ['#0042D7', '#25D366', '#F59E0B', '#8B5CF6', '#EC4899', '#14B8A6', '#EF4444', '#0EA5E9', '#A16207', '#64748B'];

export const brlCurto = (v) => v >= 1e6 ? `R$ ${(v / 1e6).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mi`
  : v >= 1e3 ? `R$ ${(v / 1e3).toLocaleString('pt-BR', { maximumFractionDigits: 1 })} mil` : `R$ ${v.toLocaleString('pt-BR')}`;

Chart.defaults.font.family = '"Plus Jakarta Sans", system-ui, sans-serif';
Chart.defaults.font.size = 11;
Chart.defaults.color = '#667085';
Chart.defaults.locale = 'pt-BR';
Chart.defaults.maintainAspectRatio = false;
Chart.defaults.plugins.legend.position = 'bottom';
Chart.defaults.plugins.legend.align = 'start';
Object.assign(Chart.defaults.plugins.legend.labels, { usePointStyle: true, pointStyle: 'circle', boxWidth: 8, boxHeight: 8, padding: 12 });
Object.assign(Chart.defaults.plugins.tooltip, {
  backgroundColor: '#FFFFFF', titleColor: '#151A23', bodyColor: '#151A23', borderColor: '#E2E6EE', borderWidth: 1,
  cornerRadius: 8, padding: 10, boxPadding: 4, usePointStyle: true,
  bodyFont: { family: '"JetBrains Mono", monospace', size: 12 }, titleFont: { weight: '600', size: 12 },
});
Chart.defaults.animation.duration = 300;

export const eixos = (formatoY = (v) => v.toLocaleString('pt-BR')) => ({
  x: { grid: { display: false }, border: { display: false } },
  // no Chart.js 4, border.dash traceja as linhas de grade
  y: { beginAtZero: true, border: { display: false, dash: [3, 3] }, grid: { color: '#ECEFF4' }, ticks: { callback: formatoY, maxTicksLimit: 5 } },
});

window.Chart = Chart;
```

- Altura: 220–260px dentro do card, num contêiner `relative h-[240px]` com o `<canvas>` dentro.
- Dados vêm do controller: `<canvas id="adm" data-serie='@json($serie)'></canvas>`, lidos com `JSON.parse(el.dataset.serie)`.
- Eixo X: `dd/mm` (diário) ou `mmm/aa` minúsculo (`out/26`, mensal). Eixo Y em pt-BR (`R$ 1,2 mil`, `R$ 2 mi`, `2,3%`).

## Barras (admissões × desligamentos)
```js
new Chart(el, {
  type: 'bar',
  data: { labels: ['mai/26', 'jun/26', 'jul/26', 'ago/26', 'set/26', 'out/26'],
    datasets: [
      { label: 'Admissões', data: [4, 2, 6, 3, 5, 3], backgroundColor: cores[0], borderRadius: 4, barPercentage: .7, categoryPercentage: .6 },
      { label: 'Desligamentos', data: [1, 3, 2, 1, 2, 1], backgroundColor: cores[4], borderRadius: 4, barPercentage: .7, categoryPercentage: .6 },
    ] },
  options: { scales: eixos() },
});
```
- `borderRadius: 4`, barras de 14–40px conforme a densidade.
- Série única: `#0042D7`; **o pico ou o mês atual** em `#0042D7` e os demais em `#8FAEEF` (passe um array em `backgroundColor`).
- Barra + linha: barras no eixo esquerdo; linha `#F59E0B` (turnover %) no eixo direito com `pointRadius: 3`.

## Linha / área (headcount, horas extras ao longo do tempo)
```js
const grad = (ctx, cor) => { const g = ctx.createLinearGradient(0, 0, 0, 240); g.addColorStop(0, cor + '40'); g.addColorStop(1, cor + '00'); return g; };
{ label: 'Headcount', data, borderColor: cores[0], borderWidth: 2, tension: .35, pointRadius: 0, fill: true,
  backgroundColor: (c) => grad(c.chart.ctx, cores[0]) }
```
Par fixo de significado: **azul = entradas/admissões**, **rosa = saídas/desligamentos**, **violeta = férias**, **âmbar = horas extras/atrasos**.

## Donut (composição: departamentos, folha)
```js
new Chart(el, {
  type: 'doughnut',
  data: { labels, datasets: [{ data, backgroundColor: labels.map((_, i) => cores[i]), borderWidth: 0, spacing: 1.5 }] },
  options: { cutout: '74%', plugins: { legend: { display: false } } },
});
```
- Tamanho 180px. Centro (HTML por cima, `absolute inset-0 grid place-content-center text-center`): rótulo `QUADRO` 10px maiúsculo muted, valor mono 15–20px/700, linha `pessoas` 10px muted.
- Legenda **ao lado ou embaixo** como lista HTML: ponto 8px + nome 11px + valor mono 11px à direita, na mesma ordem e cores das fatias.
- Fatias em ordem: itens nomeados primeiro, "outros" em ardósia `#64748B` por último.

## Heatmap (atrasos ou presença por dia × hora)
- Grade CSS, não Chart.js: linhas `Seg…Dom` (rótulo 10px muted), colunas por hora (rótulos a cada 2h).
- Célula `h-4 rounded-sm`, gap 2px, escala `--heat-0…--heat-4`.
- Legenda embaixo à direita: `menos ▢▢▢▢ mais` (10px muted). O subtítulo do card cita o achado.

## Não faça
3D, pizza sem furo, mais de 10 cores, legendas grandes, rótulo de valor em todas as barras, eixo Y com linha, `#3B82F6` ou cores fora da paleta, animações longas.

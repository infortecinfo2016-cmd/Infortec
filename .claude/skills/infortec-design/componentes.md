# Componentes Infortec (React + Tailwind + lucide-react)

Classes conforme `tailwind.md`. Em HTML puro, use as mesmas medidas com as variáveis de `tokens.css` (ver `exemplo.html`).

## Formatação (use sempre)
```ts
export const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }); // R$ 12.386,08
export const pct = (v: number, d = 1) => `${v.toLocaleString("pt-BR", { maximumFractionDigits: d })}%`; // 42,9%
export const num = (v: number, d = 0) => v.toLocaleString("pt-BR", { maximumFractionDigits: d });
export const gb = (bytes: number) => bytes >= 1e9 ? `${num(bytes / 1e9, 1)} GB` : `${num(bytes / 1e6)} MB`;
```

## Estrutura da tela
```
Topbar (h-12, branco, borda inferior)   ← [≡] Configurações › Servidor ........ [Buscar...  Ctrl K] [🔔 8]
Página (bg-background, p-4 md:p-5, space-y-3)
  PageHeader                             ← contexto · contexto / H1 ........ metadado [Outline] [Primário]
  Grade de KPIs (grid gap-3 sm:grid-cols-2 xl:grid-cols-4)
  SectionCards (grade 1 ou 2 colunas, gap-3)
```

```tsx
function Topbar({ trail }: { trail: string[] }) {
  return (
    <header className="flex h-12 items-center gap-3 border-b border-border bg-card px-4">
      <PanelLeft className="size-4 text-muted-foreground" />
      <nav className="flex items-center gap-1.5 text-xs">
        {trail.map((t, i) => (
          <span key={t} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3.5 text-muted-foreground" />}
            <span className={i === trail.length - 1 ? "text-foreground" : "text-muted-foreground"}>{t}</span>
          </span>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-3">
        <button className="flex h-8 w-48 items-center gap-2 rounded-md border border-border bg-card px-2.5 text-xs text-muted-foreground">
          <Search className="size-3.5" /> Buscar...
          <kbd className="ml-auto rounded border border-border bg-muted px-1.5 font-mono text-[10px]">Ctrl K</kbd>
        </button>
        <button className="relative"><Bell className="size-4" />
          <span className="absolute -right-1.5 -top-1.5 grid size-4 place-items-center rounded-full bg-danger font-mono text-[9px] font-bold text-white">8</span>
        </button>
      </div>
    </header>
  );
}

function PageHeader({ context, title, meta, children }: { context?: string; title: string; meta?: string; children?: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3 pb-1">
      <div>
        {context && <p className="text-xs text-muted-foreground">{context}</p>}{/* "Ubuntu 22.04.5 LTS · 4 núcleos · 7,8 GB de memória" */}
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        {meta && <span className="text-[11px] text-muted-foreground">{meta}</span>}{/* "Medido há 4 min · a cada 5 min" */}
        {children}{/* botões outline primeiro, primário por último */}
      </div>
    </div>
  );
}
```

## Card de seção
```tsx
function SectionCard({ title, subtitle, actions, children }: { title: string; subtitle: string; actions?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-border bg-card p-4">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold">{title}</h2>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      {children}
    </section>
  );
}
```

## KPI — duas variantes
**A) Com gauge** (recursos, uso, SLA): gauge 56px à esquerda, rótulo com ícone, frase em sans 600, linha muted.
**B) Com ícone-bloco** (dinheiro, contagens): rótulo em cima, valor mono, linha muted, ícone-bloco colorido no canto.

```tsx
function KpiGauge({ value, icon: Icon, label, headline, sub }: { value: number; icon: LucideIcon; label: string; headline: string; sub: string }) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
      <Gauge value={value} size={56} />
      <div className="min-w-0">
        <p className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground"><Icon className="size-3.5" />{label}</p>
        <p className="text-[15px] font-semibold">{headline}</p>{/* "18,1 GB de 195,7 GB" */}
        <p className="text-[11px] text-muted-foreground">{sub}</p>{/* "169,5 GB livres" — ` · ` separa itens */}
      </div>
    </div>
  );
}

function KpiStat({ label, value, sub, icon: Icon, color }: { label: string; value: string; sub: string; icon: LucideIcon; color: string }) {
  return (
    <div className="relative rounded-lg border border-border bg-card p-4">
      <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-mono text-xl font-bold tabular-nums">{value}</p>
      <p className="text-[11px] text-muted-foreground">{sub}</p>
      <span className="absolute right-3 top-3 grid size-8 place-items-center rounded-lg text-white" style={{ background: color }}><Icon className="size-4" /></span>
    </div>
  );
}
```
Duração ("12 dias e 1 h") usa KPI A com o ícone-bloco azul no lugar do gauge.

## Gauge (arco de 270°, aberto embaixo)
Cor pelo limite: `< 60` verde, `60–85` âmbar, `> 85` vermelho. Para métricas onde **alto é bom** (SLA, conversão) inverta: `>= 80` verde, `50–80` âmbar, `< 50` vermelho.
```tsx
function Gauge({ value, size = 56, stroke = 6, color, children }: { value: number; size?: number; stroke?: number; color?: string; children?: React.ReactNode }) {
  const r = (size - stroke) / 2, c = 2 * Math.PI * r, arc = c * 0.75;
  const fill = color ?? (value > 85 ? "var(--danger)" : value >= 60 ? "var(--warn)" : "var(--brand)");
  return (
    <div className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="absolute inset-0 rotate-[135deg]">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--track)" strokeWidth={stroke} strokeLinecap="round" strokeDasharray={`${arc} ${c}`} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={fill} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={`${Math.max(arc * value / 100, 0.01)} ${c}`} />
      </svg>
      {children ?? <span className="font-mono text-[13px] font-bold">{Math.round(value)}%</span>}
    </div>
  );
}
```
Gauge grande (SLA, participação): `size={140} stroke={12}`, centro com valor mono 28px/700 e legenda "no prazo" 11px muted; embaixo, 2 caixinhas internas lado a lado (rótulo muted + valor mono; valor ruim em `text-danger`).

## Linha de lista com barra (sistemas, serviços)
Fica dentro de um contêiner `rounded-lg border border-border divide-y divide-divider`.
```tsx
function ResourceRow({ icon: Icon, color, name, link, share, cols }: {
  icon: LucideIcon; color: string; name: string; link?: string; share: number;
  cols: { value: string; caption: string; strong?: boolean }[];
}) {
  return (
    <div className="flex items-center gap-3 px-3 py-3">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg text-white" style={{ background: color }}><Icon className="size-4" /></span>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-2 text-[13px] font-medium">{name}
          {link && <span className="flex items-center gap-1 text-[11px] font-normal text-muted-foreground"><Globe className="size-3" />{link}</span>}
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <div className="h-1 w-48 overflow-hidden rounded-full bg-track"><div className="h-full rounded-full" style={{ width: `${share}%`, background: color }} /></div>
          <span className="text-[10px] text-muted-foreground">{pct(share)} do disco em uso</span>
        </div>
      </div>
      {cols.map((c) => (
        <div key={c.caption} className="w-24 text-right">
          <p className={`font-mono text-[13px] tabular-nums ${c.strong ? "font-bold" : "font-medium"}`}>{c.value}</p>
          <p className="text-[10px] text-muted-foreground">{c.caption}</p>
        </div>
      ))}
      <ChevronDown className="size-4 text-muted-foreground" />
    </div>
  );
}
```
A última coluna (total) é `strong`. Linhas expansíveis usam o chevron.

## Linha de ranking por sistema (Carteira › Por sistema)
Ponto colorido + NOME + contagem muted ("11 clientes · 1 desativados") + barra 4px com % à direita da barra; à direita: valor mono + legenda, badge % verde-suave, valor final mono bold + legenda ("você recebe"). Linhas separadas por `border-b border-divider`.

## Controle segmentado (Mensalidades | Comissão, Loja | WhatsApp, Ativos (34) | Desativados (1) | Todos)
```tsx
function Segmented({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="inline-flex rounded-md border border-border bg-muted p-0.5">
      {options.map((o) => (
        <button key={o} onClick={() => onChange(o)}
          className={`h-6 rounded px-2.5 text-[11px] font-medium ${o === value ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>{o}</button>
      ))}
    </div>
  );
}
```

## Tabela
- Barra de filtros acima: busca larga (`h-9`, ícone de lupa, placeholder "Buscar por nome, CNPJ, cidade ou proprietário") + selects à direita ("Todos os sistemas", "↕ Nome (A–Z)").
- Cabeçalho: `bg-muted text-[10px] uppercase tracking-wide text-muted-foreground font-medium`, linha `h-9`.
- Linha: `h-12 border-b border-divider hover:bg-muted/60`.
- 1ª coluna: avatar 28px `rounded-md` com iniciais (fundo suave da cor do sistema, texto na cor forte) + NOME em `font-semibold uppercase text-[12px]` + razão social/CNPJ `text-[11px] text-muted-foreground truncate`.
- Sistema: ponto 6px da cor + nome em caixa alta 11px.
- Cidade: ícone `MapPin` 12px + texto 11px muted em caixa alta.
- Campo vazio: travessão "—" muted.
- Dinheiro: mono bold à direita; valor secundário (comissão) mono medium com % em 10px muted embaixo.

## Cards de período (Madrugada / Manhã / Tarde / Noite)
4 cards iguais `rounded-lg border p-3`: ícone 14px (Moon, Sunrise, Sun, Sunset) à esquerda e faixa `00h–06h` mono 10px muted à direita; nome 13px; % mono 18px/700; contagem/valor mono 10px muted. **O pico** recebe `bg-brand-soft border-brand-border`. Subtítulo do card pai: "Pico às 13h".

## Pequenos padrões
- **Delta:** `<span className="rounded bg-brand-soft px-1.5 font-mono text-[10px] font-semibold text-primary">↗ 28,6%</span> <span className="text-[10px] text-muted-foreground">p.p. (antes 0%)</span>` — queda usa `bg-danger-soft text-danger` e ↘.
- **Caixinha interna:** `rounded-md bg-muted px-3 py-2` com rótulo 10px muted + valor mono 13px bold.
- **Comando/código:** `rounded bg-muted px-2 py-1 font-mono text-[11px] text-muted-foreground` ("docker image prune -a").
- **Barra de memória por serviço:** nome com ícone à esquerda, valor mono à direita, barra 4px abaixo ocupando toda a largura, cor categórica.
- **Avisos tranquilizadores no subtítulo:** "só informativo, esta tela não apaga nada".
- **Vazio:** dentro do card, ícone 20px muted + frase curta + ação outline. Nunca card em branco.
- **Carregando:** skeleton `animate-pulse rounded bg-track` com a mesma forma do conteúdo.

## App no celular (referência: `telas/meu-plantio/index.html`)
- **Toque:** botões, inputs e abas com **40px** de altura (no desktop são 32px). Ícone-botão 40×40.
- **Topo:** branco, 52px, borda inferior; voltar ou menu à esquerda, título 15px/700, ações à direita (busca, sino com contador vermelho, avatar). Nunca topo verde escuro.
- **Cabeçalho da tela:** contexto muted 11,5px + H1 22px, igual ao desktop. Títulos de card continuam com subtítulo.
- **Barra de baixo:** branca, borda superior, 5 itens; o ativo ganha pílula `bg-brand-soft` com ícone e texto em `--primary`. Contador em vermelho.
- **Botão flutuante:** `bg-primary`, raio 8px, 44px, **sempre com texto** ("Lançar", "Novo plantio", "Despesa"); é a única peça com sombra (`0 4px 12px rgb(11 113 85 / .22)`).
- **KPIs:** 2 colunas; o valor mais longo (dinheiro) ocupa a linha inteira em vez de ser cortado.
- **Listas no lugar de cartões lado a lado:** linha com ícone-bloco, nome inteiro, barra de progresso com % e valor mono à direita.
- **Fases/etapas:** barras iguais lado a lado (feito e atual em `--brand`, futuro em `--track`), nome embaixo em 10px, o atual em `--primary` 600.
- **Abas e filtros:** controle segmentado de largura total, rolando na horizontal se não couber.
- **Valores grandes abreviados em pt-BR:** `R$ 45,0 mil`, `R$ 2,1 mi`, nunca `45.0k`.

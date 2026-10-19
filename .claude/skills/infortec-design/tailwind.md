# Infortec Design no Tailwind / shadcn

Os snippets de `componentes.md` usam estes nomes de classe. Se o projeto já usa shadcn, **troque só os valores** das variáveis existentes e acrescente as que faltam (`brand`, `info`, `warn`, `danger`, `track`).

## Tailwind v4 (`globals.css`)
```css
@import "tailwindcss";

:root {
  --background: #F4F7F4;
  --foreground: #171A17;
  --card: #FFFFFF;
  --card-foreground: #171A17;
  --popover: #FFFFFF;
  --popover-foreground: #171A17;
  --primary: #0B7155;
  --primary-foreground: #FFFFFF;
  --primary-hover: #095E47;
  --secondary: #FAFBFA;
  --secondary-foreground: #171A17;
  --muted: #FAFBFA;
  --muted-foreground: #6B716C;
  --subtle-foreground: #8F948F;
  --accent: #F1F4F1;
  --accent-foreground: #171A17;
  --destructive: #EF4444;
  --border: #E3E7E3;
  --input: #E3E7E3;
  --ring: #25D366;
  --radius: 0.5rem;

  --brand: #25D366;
  --brand-soft: #D9F7E6;
  --brand-border: #9BE7BA;
  --info: #3B82F6;
  --info-2: #75A8F9;
  --warn: #F59E0B;
  --warn-soft: #FEF0D9;
  --warn-fg: #B45309;
  --danger: #EF4444;
  --danger-soft: #FEE2E2;
  --danger-fg: #B42318;
  --track: #F1F4F1;
  --divider: #EEF0EE;

  --chart-1: #25D366; --chart-2: #3B82F6; --chart-3: #F59E0B; --chart-4: #8B5CF6;
  --chart-5: #EC4899; --chart-6: #14B8A6; --chart-7: #EF4444; --chart-8: #0EA5E9;
  --chart-9: #A16207; --chart-10: #64748B;
}

@theme inline {
  --font-sans: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, Consolas, monospace;
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-popover: var(--popover);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary-hover: var(--primary-hover);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-subtle-foreground: var(--subtle-foreground);
  --color-accent: var(--accent);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-destructive: var(--destructive);
  --color-brand: var(--brand);
  --color-brand-soft: var(--brand-soft);
  --color-brand-border: var(--brand-border);
  --color-info: var(--info);
  --color-info-2: var(--info-2);
  --color-warn: var(--warn);
  --color-warn-soft: var(--warn-soft);
  --color-warn-fg: var(--warn-fg);
  --color-danger: var(--danger);
  --color-danger-soft: var(--danger-soft);
  --color-danger-fg: var(--danger-fg);
  --color-track: var(--track);
  --color-divider: var(--divider);
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
}

body { @apply bg-background text-foreground font-sans text-[13px] antialiased; }
```

Fontes no Next.js:
```ts
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
// <body className={`${sans.variable} ${mono.variable}`}>
```

## Tailwind v3 (`tailwind.config.ts`)
Inclua também o `:root` de `tokens.css` no CSS global — gauge e gráficos leem `var(--brand)`, `var(--track)` etc.
```ts
export default {
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "Consolas", "monospace"],
      },
      colors: {
        background: "#F4F7F4", foreground: "#171A17", card: "#FFFFFF",
        border: "#E3E7E3", divider: "#EEF0EE", track: "#F1F4F1",
        muted: { DEFAULT: "#FAFBFA", foreground: "#6B716C" }, subtle: { foreground: "#8F948F" },
        primary: { DEFAULT: "#0B7155", foreground: "#FFFFFF", hover: "#095E47" },
        brand: { DEFAULT: "#25D366", soft: "#D9F7E6", border: "#9BE7BA" },
        info: { DEFAULT: "#3B82F6", 2: "#75A8F9" },
        warn: { DEFAULT: "#F59E0B", soft: "#FEF0D9", fg: "#B45309" },
        danger: { DEFAULT: "#EF4444", soft: "#FEE2E2", fg: "#B42318" },
      },
      borderRadius: { lg: "8px", md: "6px", sm: "4px" },
    },
  },
};
```

## Classes recorrentes
| Peça | Classes |
|---|---|
| Card | `rounded-lg border border-border bg-card p-4` |
| Título de card | `text-sm font-semibold` |
| Subtítulo de card | `text-xs text-muted-foreground` |
| Rótulo | `text-[11px] font-medium uppercase tracking-wide text-muted-foreground` |
| Valor KPI | `font-mono tabular-nums text-xl font-bold` |
| Valor de coluna | `font-mono tabular-nums text-[13px] font-semibold text-right` |
| Micro-legenda | `text-[10px] text-muted-foreground` |
| Botão outline | `h-8 rounded-md border border-border bg-card px-3 text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-muted` |
| Botão primário | `h-8 rounded-md bg-primary px-3 text-xs font-semibold text-primary-foreground inline-flex items-center gap-1.5 hover:bg-primary-hover` |
| Ícone-bloco | `size-8 rounded-lg grid place-items-center text-white` + `bg-[cor do sistema]` |
| Badge % | `rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold bg-brand-soft text-primary` |
| Aviso / status | `bg-brand-soft text-primary` · `bg-warn-soft text-warn-fg` · `bg-danger-soft text-danger-fg` |
| Caixinha interna | `rounded-md bg-muted px-3 py-2` |

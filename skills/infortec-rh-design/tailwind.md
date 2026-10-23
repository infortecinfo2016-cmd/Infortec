# Infortec RH no Laravel + Tailwind (Vite)

Os componentes de `componentes.md` usam estes nomes de classe. Se o projeto já tem variáveis (Breeze, Jetstream, starter kit), **troque só os valores** e acrescente as que faltam (`brand`, `ok`, `info`, `warn`, `danger`, `neutral`, `track`, `divider`).

Descubra a versão: `tailwind.config.js` na raiz indica v3; `@import "tailwindcss";` em `resources/css/app.css` sem config indica v4.

## Fontes (layout Blade)
No `<head>` de `resources/views/layouts/app.blade.php` (o Laravel já usa a Bunny Fonts por padrão):
```blade
<link rel="preconnect" href="https://fonts.bunny.net">
<link href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700|jetbrains-mono:400,500,600,700&display=swap" rel="stylesheet" />
<link rel="icon" type="image/png" href="{{ asset('img/logo-azul.png') }}">
@vite(['resources/css/app.css', 'resources/js/app.js'])
```
Copie `assets/logo-azul.png` e `assets/logo-branca.png` desta skill para `public/img/`.
Como o RH roda em subpasta (`localhost:8080/RH/public`), mantenha `APP_URL=http://localhost:8080/RH/public` no `.env` para `asset()` e `@vite` acharem os arquivos depois do `npm run build`.

## Tailwind v4 (`resources/css/app.css`)
```css
@import "tailwindcss";
@source "../views";

:root {
  --background: #F4F6FA;
  --foreground: #151A23;
  --card: #FFFFFF;
  --primary: #0036B0;
  --primary-foreground: #FFFFFF;
  --primary-hover: #002B8C;
  --muted: #F9FAFC;
  --muted-foreground: #667085;
  --subtle: #8D94A5;
  --accent: #EEF1F6;
  --border: #E2E6EE;
  --input: #E2E6EE;
  --ring: #0042D7;
  --radius: 0.5rem;

  --brand: #0042D7;
  --brand-soft: #DCE6FB;
  --brand-border: #A9C1F5;
  --ok: #25D366;      --ok-soft: #D9F7E6;      --ok-fg: #0B7155;
  --info: #8B5CF6;    --info-soft: #EDE9FE;    --info-fg: #6D28D9;
  --warn: #F59E0B;    --warn-soft: #FEF0D9;    --warn-fg: #B45309;
  --danger: #EF4444;  --danger-soft: #FEE2E2;  --danger-fg: #B42318;
  --neutral: #64748B; --neutral-soft: #EEF1F6; --neutral-fg: #475467;
  --track: #EEF1F6;
  --divider: #ECEFF4;

  /* paleta categórica, nesta ordem */
  --c1: #0042D7; --c2: #25D366; --c3: #F59E0B; --c4: #8B5CF6; --c5: #EC4899;
  --c6: #14B8A6; --c7: #EF4444; --c8: #0EA5E9; --c9: #A16207; --c10: #64748B;
  --heat-0: #EEF1F6; --heat-1: #C7D6F7; --heat-2: #8FAEEF; --heat-3: #4F7FE3; --heat-4: #0042D7;
}

@theme inline {
  --font-sans: "Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, Consolas, monospace;
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary-hover: var(--primary-hover);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-subtle: var(--subtle);
  --color-accent: var(--accent);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-brand: var(--brand);
  --color-brand-soft: var(--brand-soft);
  --color-brand-border: var(--brand-border);
  --color-ok: var(--ok);         --color-ok-soft: var(--ok-soft);         --color-ok-fg: var(--ok-fg);
  --color-info: var(--info);     --color-info-soft: var(--info-soft);     --color-info-fg: var(--info-fg);
  --color-warn: var(--warn);     --color-warn-soft: var(--warn-soft);     --color-warn-fg: var(--warn-fg);
  --color-danger: var(--danger); --color-danger-soft: var(--danger-soft); --color-danger-fg: var(--danger-fg);
  --color-neutral: var(--neutral); --color-neutral-soft: var(--neutral-soft); --color-neutral-fg: var(--neutral-fg);
  --color-track: var(--track);
  --color-divider: var(--divider);
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
}

body { @apply bg-background text-foreground font-sans text-[13px] antialiased; }
:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }
```

## Tailwind v3 (`tailwind.config.js`)
Inclua também o `:root` de `tokens.css` no `resources/css/app.css`: gauge e gráficos leem `var(--brand)`, `var(--track)` etc.
```js
import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

export default {
  content: [
    './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    './storage/framework/views/*.php',
    './resources/views/**/*.blade.php',
    './resources/js/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', ...defaultTheme.fontFamily.sans],
        mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        background: '#F4F6FA', foreground: '#151A23', card: '#FFFFFF',
        border: '#E2E6EE', divider: '#ECEFF4', track: '#EEF1F6', subtle: '#8D94A5',
        muted: { DEFAULT: '#F9FAFC', foreground: '#667085' },
        primary: { DEFAULT: '#0036B0', foreground: '#FFFFFF', hover: '#002B8C' },
        brand: { DEFAULT: '#0042D7', soft: '#DCE6FB', border: '#A9C1F5' },
        ok: { DEFAULT: '#25D366', soft: '#D9F7E6', fg: '#0B7155' },
        info: { DEFAULT: '#8B5CF6', soft: '#EDE9FE', fg: '#6D28D9' },
        warn: { DEFAULT: '#F59E0B', soft: '#FEF0D9', fg: '#B45309' },
        danger: { DEFAULT: '#EF4444', soft: '#FEE2E2', fg: '#B42318' },
        neutral: { DEFAULT: '#64748B', soft: '#EEF1F6', fg: '#475467' },
      },
      borderRadius: { lg: '8px', md: '6px', sm: '4px' },
    },
  },
  plugins: [forms],
};
```
Atenção: no v3 o nome `neutral` substitui a escala `neutral-50…950` do Tailwind. Se o projeto já usa essa escala, renomeie para `inativo`.

## Ícones
```bash
composer require mallardduck/blade-lucide-icons
```
Uso: `<x-lucide-users class="size-4" />`, `<x-lucide-calendar-days class="size-3.5" />`. Sem o pacote, use o script do lucide (`<i data-lucide="users"></i>` + `lucide.createIcons()`).

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
| Botão perigo | `h-8 rounded-md border border-danger/30 bg-card px-3 text-xs font-semibold text-danger-fg hover:bg-danger-soft` |
| Input / select | `h-8 rounded-md border border-input bg-card px-2.5 text-[13px] focus:border-brand focus:ring-brand` |
| Ícone-bloco | `size-8 rounded-lg grid place-items-center text-white` + `bg-[cor]` |
| Badge da marca | `rounded px-1.5 py-0.5 font-mono text-[10px] font-semibold bg-brand-soft text-primary` |
| Item ativo do menu | `bg-brand-soft text-primary font-semibold` |
| Caixinha interna | `rounded-md bg-muted px-3 py-2` |

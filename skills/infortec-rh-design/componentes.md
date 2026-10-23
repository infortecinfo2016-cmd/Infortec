# Componentes Blade do Infortec RH

Componentes anônimos em `resources/views/components/rh/`, usados como `<x-rh.card>`. Classes conforme `tailwind.md`; ícones com `blade-lucide-icons`. O menu lateral usa Alpine.js, que já vem no Breeze.

## Formatação (`app/helpers.php`)
Registre no `composer.json` em `"autoload": { "files": ["app/helpers.php"] }` e rode `composer dump-autoload`.
```php
<?php

use Carbon\Carbon;

if (! function_exists('brl')) {
    function brl(?float $v): string { return $v === null ? '—' : 'R$ ' . number_format($v, 2, ',', '.'); } // R$ 4.250,00
}
if (! function_exists('pct')) {
    function pct(?float $v, int $d = 1): string {
        if ($v === null) return '—';
        $s = number_format($v, $d, ',', '.');
        return ($d > 0 ? rtrim(rtrim($s, '0'), ',') : $s) . '%'; // 2,3% · 10%
    }
}
if (! function_exists('num')) {
    function num(?float $v, int $d = 0): string { return $v === null ? '—' : number_format($v, $d, ',', '.'); } // 1.284
}
if (! function_exists('hhmm')) {
    function hhmm(int $min): string { return sprintf('%02d:%02d', intdiv(abs($min), 60), abs($min) % 60); } // 08:48
}
if (! function_exists('saldo_horas')) {
    function saldo_horas(int $min): string { return ($min > 0 ? '+' : ($min < 0 ? '−' : '')) . hhmm($min); } // +12:30 · −03:15
}
if (! function_exists('data_br')) {
    function data_br($d, string $f = 'd/m/Y'): string { return $d ? Carbon::parse($d)->locale('pt_BR')->translatedFormat($f) : '—'; } // 23/10/2026
}
if (! function_exists('cpf_mascarado')) {
    function cpf_mascarado(?string $cpf): string {
        $n = preg_replace('/\D/', '', (string) $cpf);
        return strlen($n) === 11 ? '***.' . substr($n, 3, 3) . '.' . substr($n, 6, 3) . '-**' : '—';
    }
}
if (! function_exists('cor_limite')) {
    // 'brand' quando está bem, 'warn' em atenção, 'danger' quando está ruim.
    // Alto é bom (presença): cor_limite(94, 95, 90). Baixo é bom (turnover): cor_limite(2.3, 2, 4).
    function cor_limite(float $v, float $bom, float $ruim): string {
        if ($bom < $ruim) return $v <= $bom ? 'brand' : ($v <= $ruim ? 'warn' : 'danger');
        return $v >= $bom ? 'brand' : ($v >= $ruim ? 'warn' : 'danger');
    }
}
```
Em `config/app.php`: `'locale' => 'pt_BR'`, `'timezone' => 'America/Sao_Paulo'`.

## Estrutura da tela
```
Menu lateral (232px, branco, borda direita)   Topbar (h-12, branco, borda inferior)
  [logo] Infortec [RH]                          [≡] Colaboradores › Ficha ........ [Buscar...  Ctrl K] [🔔 3] [avatar]
  PRINCIPAL                                   Página (bg-background, p-4 md:p-5, space-y-3, max-w-[1440px])
   ▣ Painel        ← ativo: bg-brand-soft       PageHeader   ← contexto · contexto / H1 ........ metadado [Outline] [Primário]
   ▢ Colaboradores                              Grade de KPIs (grid gap-3 sm:grid-cols-2 xl:grid-cols-4)
   ▢ Ponto · Férias · Folha · Documentos        Cards de seção (grade 1 ou 2 colunas, gap-3)
  GESTÃO
   ▢ Departamentos · Relatórios · Configurações
```

### `rh/layout.blade.php`
```blade
@props(['title', 'trail' => []])
@php
$menu = [
    'Principal' => [
        ['Painel', 'layout-dashboard', 'dashboard'],
        ['Colaboradores', 'users', 'colaboradores.*'],
        ['Ponto', 'clock', 'ponto.*'],
        ['Férias', 'calendar-days', 'ferias.*'],
        ['Folha', 'wallet', 'folha.*'],
        ['Documentos', 'file-text', 'documentos.*'],
    ],
    'Gestão' => [
        ['Departamentos', 'building-2', 'departamentos.*'],
        ['Relatórios', 'clipboard-list', 'relatorios.*'],
        ['Configurações', 'settings', 'configuracoes.*'],
    ],
];
@endphp
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $title }} · Infortec RH</title>
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=plus-jakarta-sans:400,500,600,700|jetbrains-mono:400,500,600,700&display=swap" rel="stylesheet" />
    <link rel="icon" type="image/png" href="{{ asset('img/logo-azul.png') }}">
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body x-data="{ menu: false }" class="min-h-screen">
    <aside :class="menu ? 'translate-x-0' : '-translate-x-full'"
           class="fixed inset-y-0 left-0 z-40 flex w-[232px] flex-col border-r border-border bg-card transition-transform lg:translate-x-0">
        <a href="{{ route('dashboard') }}" class="flex h-12 items-center gap-2 border-b border-border px-4">
            <img src="{{ asset('img/logo-azul.png') }}" alt="" class="h-6 w-auto">
            <span class="text-[15px] font-bold tracking-tight">Infortec</span>
            <span class="rounded bg-brand-soft px-1.5 py-0.5 font-mono text-[10px] font-bold text-primary">RH</span>
        </a>
        <nav class="flex-1 space-y-4 overflow-y-auto p-3">
            @foreach ($menu as $grupo => $itens)
                <div>
                    <p class="px-2 pb-1 text-[10px] font-medium uppercase tracking-wide text-subtle">{{ $grupo }}</p>
                    @foreach ($itens as [$rotulo, $icone, $padrao])
                        @php $ativo = request()->routeIs($padrao); $rota = str_replace('.*', '.index', $padrao); @endphp
                        <a href="{{ Route::has($rota) ? route($rota) : '#' }}"
                           @class(['flex h-8 items-center gap-2.5 rounded-md px-2 text-[13px]',
                                   'bg-brand-soft font-semibold text-primary' => $ativo,
                                   'text-muted-foreground hover:bg-muted hover:text-foreground' => ! $ativo])>
                            <x-dynamic-component :component="'lucide-' . $icone" class="size-4" />{{ $rotulo }}
                        </a>
                    @endforeach
                </div>
            @endforeach
        </nav>
    </aside>
    <div x-show="menu" x-cloak @click="menu = false" class="fixed inset-0 z-30 bg-foreground/20 lg:hidden"></div>

    <div class="lg:pl-[232px]">
        <header class="sticky top-0 z-20 flex h-12 items-center gap-3 border-b border-border bg-card px-4">
            <button @click="menu = true" class="lg:hidden" aria-label="Abrir menu"><x-lucide-panel-left class="size-4 text-muted-foreground" /></button>
            <nav class="flex min-w-0 items-center gap-1.5 text-xs">
                @foreach ($trail as $i => $t)
                    @if ($i > 0)<x-lucide-chevron-right class="size-3.5 shrink-0 text-muted-foreground" />@endif
                    <span @class(['truncate', 'text-foreground' => $loop->last, 'text-muted-foreground' => ! $loop->last])>{{ $t }}</span>
                @endforeach
            </nav>
            <div class="ml-auto flex items-center gap-3">
                <button class="hidden h-8 w-48 items-center gap-2 rounded-md border border-border bg-card px-2.5 text-xs text-muted-foreground md:flex">
                    <x-lucide-search class="size-3.5" /> Buscar...
                    <kbd class="ml-auto rounded border border-border bg-muted px-1.5 font-mono text-[10px]">Ctrl K</kbd>
                </button>
                <button class="relative" aria-label="Notificações"><x-lucide-bell class="size-4" />
                    <span class="absolute -right-1.5 -top-1.5 grid size-4 place-items-center rounded-full bg-danger font-mono text-[9px] font-bold text-white">3</span>
                </button>
                <x-rh.avatar :nome="auth()->user()->name" cor="#0042D7" />
            </div>
        </header>
        <main class="mx-auto max-w-[1440px] space-y-3 p-4 md:p-5">{{ $slot }}</main>
    </div>
</body>
</html>
```
Uso: `<x-rh.layout title="Colaboradores" :trail="['Colaboradores', 'Ficha']"> ... </x-rh.layout>`. Acrescente `[x-cloak]{display:none}` no CSS.

### `rh/page-header.blade.php`
```blade
@props(['context' => null, 'title', 'meta' => null])
<div class="flex flex-wrap items-end justify-between gap-3 pb-1">
    <div class="min-w-0">
        @if ($context)<p class="text-xs text-muted-foreground">{{ $context }}</p>@endif {{-- "Outubro de 2026 · 128 colaboradores ativos" --}}
        <h1 class="text-2xl font-bold tracking-tight">{{ $title }}</h1>
    </div>
    <div class="flex flex-wrap items-center gap-2">
        @if ($meta)<span class="text-[11px] text-muted-foreground">{{ $meta }}</span>@endif {{-- "Ponto sincronizado há 4 min" --}}
        {{ $slot }} {{-- botões outline primeiro, primário por último --}}
    </div>
</div>
```

### `rh/button.blade.php`
```blade
@props(['variant' => 'outline', 'icon' => null, 'href' => null])
@php
$classes = 'inline-flex h-8 items-center gap-1.5 rounded-md px-3 text-xs font-semibold ' . match ($variant) {
    'primary' => 'bg-primary text-primary-foreground hover:bg-primary-hover',
    'danger'  => 'border border-danger/30 bg-card text-danger-fg hover:bg-danger-soft',
    default   => 'border border-border bg-card text-foreground hover:bg-muted',
};
$tag = $href ? 'a' : 'button';
@endphp
<{{ $tag }} @if ($href) href="{{ $href }}" @endif {{ $attributes->merge(['class' => $classes]) }}>
    @if ($icon)<x-dynamic-component :component="'lucide-' . $icon" class="size-3.5" />@endif{{ $slot }}
</{{ $tag }}>
```

## Card de seção (`rh/card.blade.php`)
```blade
@props(['title', 'subtitle'])
<section {{ $attributes->merge(['class' => 'min-w-0 rounded-lg border border-border bg-card p-4']) }}>
    <div class="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div class="min-w-0">
            <h2 class="text-sm font-semibold">{{ $title }}</h2>
            <p class="text-xs text-muted-foreground">{{ $subtitle }}</p>
        </div>
        @isset($actions)<div class="flex flex-wrap items-center gap-2">{{ $actions }}</div>@endisset
    </div>
    {{ $slot }}
</section>
```
Uso: `<x-rh.card title="Fora hoje" subtitle="Quem não vem trabalhar hoje e por quê"> <x-slot:actions>...</x-slot:actions> ... </x-rh.card>`.

## KPI — duas variantes
**A) Com ícone-bloco** (contagens, dinheiro): rótulo em cima, valor mono, linha muted, ícone-bloco colorido no canto.
**B) Com gauge** (presença, turnover, absenteísmo): gauge 56px à esquerda, rótulo com ícone, valor ou frase, linha muted.

### `rh/kpi.blade.php`
```blade
@props(['label', 'value', 'sub' => null, 'icon', 'color' => 'var(--c1)'])
<div class="relative min-w-0 rounded-lg border border-border bg-card p-4">
    <p class="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{{ $label }}</p>
    <p class="mt-1 font-mono text-xl font-bold tabular-nums">{{ $value }}</p>
    @if ($sub)<p class="text-[11px] text-muted-foreground">{{ $sub }}</p>@endif {{-- "3 admissões este mês" --}}
    <span class="absolute right-3 top-3 grid size-8 place-items-center rounded-lg text-white" style="background: {{ $color }}">
        <x-dynamic-component :component="'lucide-' . $icon" class="size-4" />
    </span>
</div>
```

### `rh/gauge.blade.php` (arco de 270°, aberto embaixo)
```blade
@props(['value', 'max' => 100, 'size' => 56, 'stroke' => 6, 'cor' => 'brand'])
@php
$r = ($size - $stroke) / 2; $c = 2 * M_PI * $r; $arc = $c * 0.75;
$fill = max($arc * min($value / $max, 1), 0.01);
@endphp
<div class="relative grid shrink-0 place-items-center" style="width: {{ $size }}px; height: {{ $size }}px">
    <svg width="{{ $size }}" height="{{ $size }}" class="absolute inset-0 rotate-[135deg]">
        <circle cx="{{ $size / 2 }}" cy="{{ $size / 2 }}" r="{{ $r }}" fill="none" stroke="var(--track)" stroke-width="{{ $stroke }}" stroke-linecap="round" stroke-dasharray="{{ $arc }} {{ $c }}" />
        <circle cx="{{ $size / 2 }}" cy="{{ $size / 2 }}" r="{{ $r }}" fill="none" stroke="var(--{{ $cor }})" stroke-width="{{ $stroke }}" stroke-linecap="round" stroke-dasharray="{{ $fill }} {{ $c }}" />
    </svg>
    @if ($slot->isEmpty())
        <span class="font-mono text-[13px] font-bold">{{ pct($value, 0) }}</span>
    @else
        {{ $slot }}
    @endif
</div>
```
A cor vem de `cor_limite()`: azul quando está bem, âmbar em atenção, vermelho quando está ruim. Limites padrão do RH:

| Métrica | Bem (azul) | Atenção (âmbar) | Ruim (vermelho) | `max` do gauge |
|---|---|---|---|---|
| Presença hoje | ≥ 95% | 90–95% | < 90% | 100 |
| Turnover do mês | ≤ 2% | 2–4% | > 4% | 10 |
| Absenteísmo | ≤ 3% | 3–5% | > 5% | 10 |
| Ponto fechado no prazo | ≥ 90% | 70–90% | < 70% | 100 |

### `rh/kpi-gauge.blade.php`
```blade
@props(['label', 'icon', 'value', 'max' => 100, 'cor' => 'brand', 'headline', 'sub' => null])
<div class="flex min-w-0 items-center gap-4 rounded-lg border border-border bg-card p-4">
    <x-rh.gauge :value="$value" :max="$max" :cor="$cor" />
    <div class="min-w-0">
        <p class="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
            <x-dynamic-component :component="'lucide-' . $icon" class="size-3.5" />{{ $label }}
        </p>
        <p class="text-[15px] font-semibold">{{ $headline }}</p> {{-- "121 de 128 presentes" --}}
        @if ($sub)<p class="text-[11px] text-muted-foreground">{{ $sub }}</p>@endif {{-- "4 em férias · 3 faltas" --}}
    </div>
</div>
```
Gauge grande (presença do mês, ponto fechado): `size="140" stroke="12"`, centro com valor mono 28px/700 e legenda "no prazo" 11px muted; embaixo, 2 caixinhas internas lado a lado (rótulo muted + valor mono; valor ruim em `text-danger-fg`).

## Status (`rh/status.blade.php`)
Um selo por significado. Nunca invente cor nova para status.
```blade
@props(['tipo'])
@php
[$cor, $rotulo] = match ($tipo) {
    'ativo'       => ['ok', 'Ativo'],
    'experiencia' => ['brand', 'Experiência'],
    'ferias'      => ['info', 'Férias'],
    'afastado'    => ['warn', 'Afastado'],
    'desligado'   => ['neutral', 'Desligado'],
    'pendente'    => ['warn', 'Pendente'],
    'aprovado'    => ['ok', 'Aprovado'],
    'recusado'    => ['danger', 'Recusado'],
    'presente'    => ['ok', 'Presente'],
    'atraso'      => ['warn', 'Atraso'],
    'falta'       => ['danger', 'Falta'],
    'folga'       => ['neutral', 'Folga'],
    'vence'       => ['warn', 'Vence em breve'],
    'vencido'     => ['danger', 'Vencido'],
    default       => ['neutral', ucfirst($tipo)],
};
$classes = [
    'ok' => 'bg-ok-soft text-ok-fg', 'brand' => 'bg-brand-soft text-primary', 'info' => 'bg-info-soft text-info-fg',
    'warn' => 'bg-warn-soft text-warn-fg', 'danger' => 'bg-danger-soft text-danger-fg', 'neutral' => 'bg-neutral-soft text-neutral-fg',
][$cor];
@endphp
<span {{ $attributes->merge(['class' => "inline-flex h-5 items-center gap-1 whitespace-nowrap rounded px-1.5 text-[11px] font-semibold $classes"]) }}>
    <span class="size-1.5 rounded-full" style="background: var(--{{ $cor }})"></span>{{ $slot->isEmpty() ? $rotulo : $slot }}
</span>
```

## Avatar (`rh/avatar.blade.php`)
Iniciais sobre o tom suave da cor do departamento.
```blade
@props(['nome', 'cor' => '#0042D7', 'size' => 28])
@php
$partes = preg_split('/\s+/', trim($nome));
$ini = mb_strtoupper(mb_substr($partes[0], 0, 1) . (count($partes) > 1 ? mb_substr(end($partes), 0, 1) : ''));
@endphp
<span class="grid shrink-0 place-items-center rounded-md text-[10px] font-bold"
      style="width: {{ $size }}px; height: {{ $size }}px; background: color-mix(in srgb, {{ $cor }} 14%, white); color: color-mix(in srgb, {{ $cor }} 85%, black)">{{ $ini }}</span>
```
Se houver foto, use `<img class="rounded-md object-cover">` com o mesmo tamanho.

## Controle segmentado (`rh/segmented.blade.php`)
No Laravel o filtro vai na URL (`?status=ativos`), então o segmentado usa links.
```blade
@props(['opcoes', 'param' => 'filtro'])  {{-- ['ativos' => 'Ativos (128)', 'desligados' => 'Desligados (12)', 'todos' => 'Todos'] --}}
@php $atual = request($param, array_key_first($opcoes)); @endphp
<div class="inline-flex rounded-md border border-border bg-muted p-0.5">
    @foreach ($opcoes as $valor => $rotulo)
        <a href="{{ request()->fullUrlWithQuery([$param => $valor, 'page' => null]) }}"
           @class(['grid h-6 place-items-center rounded px-2.5 text-[11px] font-medium',
                   'bg-card text-foreground shadow-sm' => $atual === $valor,
                   'text-muted-foreground hover:text-foreground' => $atual !== $valor])>{{ $rotulo }}</a>
    @endforeach
</div>
```

## Vazio (`rh/empty.blade.php`)
```blade
@props(['icon' => 'inbox', 'texto'])
<div class="grid place-items-center gap-2 py-8 text-center">
    <x-dynamic-component :component="'lucide-' . $icon" class="size-5 text-muted-foreground" />
    <p class="text-xs text-muted-foreground">{{ $texto }}</p> {{-- "Ninguém de férias este mês." --}}
    {{ $slot }} {{-- ação outline opcional --}}
</div>
```
Nunca deixe card em branco. Carregando: `animate-pulse rounded bg-track` com a forma do conteúdo.

## Tabela
- Barra de filtros acima: busca larga (`h-9`, lupa, placeholder "Buscar por nome, CPF, matrícula ou cargo") + selects à direita ("Todos os departamentos", "↕ Nome (A–Z)"). Formulário `GET`, valores mantidos com `request()`.
- Contêiner: `-mx-4 -mb-4 overflow-x-auto` dentro do card; `<table class="w-full min-w-[720px]">`.
- Cabeçalho: `bg-muted text-[10px] uppercase tracking-wide text-muted-foreground font-medium`, linha `h-9`, borda `border-y border-divider`.
- Linha: `h-12 border-b border-divider hover:bg-muted/60`; a linha inteira leva à ficha.
- 1ª coluna (colaborador): avatar 28px + NOME em `font-semibold uppercase text-[12px]` + cargo · matrícula em `text-[11px] text-muted-foreground truncate`.
- Departamento: ponto 6px da cor + nome em caixa alta 11px.
- Status: `<x-rh.status>`.
- Datas: mono 12px (`23/10/2026`); tempo relativo embaixo em micro-legenda ("há 2 anos").
- Dinheiro: mono bold à direita, com micro-legenda ("salário base").
- Campo vazio: travessão "—" muted.
- Paginação: `{{ $itens->withQueryString()->links() }}` com a view de paginação publicada e restilizada (botões outline 32px, página atual `bg-brand-soft text-primary`).

## Formulário
- Card com título + subtítulo por grupo ("Dados pessoais", "Contrato", "Endereço"). Grade `grid gap-3 sm:grid-cols-2 lg:grid-cols-3`.
- Rótulo `text-xs font-medium` acima do campo; ajuda/erro embaixo em 11px (`text-muted-foreground` / `text-danger-fg`).
- Campo com erro: `border-danger focus:ring-danger`. Use `@error('campo')`.
- Campos de número (salário, CPF, horas) em `font-mono`. Máscara de CPF `000.000.000-00`, dinheiro `R$ 0.000,00`.
- Rodapé fixo do formulário: à direita, "Cancelar" outline + "Salvar colaborador" primário.

## Pequenos padrões
- **Delta:** `<span class="rounded bg-brand-soft px-1.5 font-mono text-[10px] font-semibold text-primary">↗ 3</span> <span class="text-[10px] text-muted-foreground">vs. setembro</span>`. Piora usa `bg-danger-soft text-danger-fg` e ↘.
- **Caixinha interna:** `rounded-md bg-muted px-3 py-2` com rótulo 10px muted + valor mono 13px bold.
- **Ocultar valores:** botão outline `eye-off` no cabeçalho do card de folha; valores viram `R$ ••••••` (guarde a escolha em `localStorage`).
- **Avisos tranquilizadores no subtítulo:** "só para conferência, nada é enviado à contabilidade".
- **Alertas (flash):** faixa `rounded-lg border px-3 py-2 text-xs` com o par suave/forte do estado (`bg-ok-soft border-ok/30 text-ok-fg`), ícone 14px à esquerda.

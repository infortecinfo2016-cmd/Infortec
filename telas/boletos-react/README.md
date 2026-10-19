# Boletos de fornecedores (React + Tailwind)

Tela de contas a pagar no Infortec Design. A pasta `src/features/boletos-fornecedores/` é o módulo; o resto é só para rodar a demonstração.

```bash
npm install
npm run dev     # abre a tela em http://localhost:5173
npm test        # testes da leitura do boleto, NF-e e parcelas
npm run build   # checa os tipos e gera dist/
```

## O que tem
| Arquivo | Papel |
|---|---|
| `BoletosFornecedoresPage.tsx` | a página: cabeçalho, KPIs, formulário, lista e agenda |
| `components/LancarBoletoForm.tsx` | formulário de lançamento (linha digitável, parcelas, XML) |
| `components/BoletosTable.tsx` | lista com filtros, busca e ações |
| `components/AgendaSemanal.tsx` | saída de caixa por semana |
| `components/ui.tsx` | Card, Button, KpiStat, Segmented, Note, Field |
| `lib/boleto.ts` | lê linha digitável/código de barras (FEBRABAN, dígitos verificadores) |
| `lib/nfe.ts` | lê emitente e duplicatas do XML da NF-e |
| `lib/regras.ts` | parcelas, situação, cores |
| `data/useBoletos.ts` | onde os dados são salvos (hoje: navegador) |

## Levar para o sistema
1. Copie `src/features/boletos-fornecedores/` para o projeto (ex.: `src/features/` ou `app/(painel)/financeiro/boletos/_components/`).
2. Tokens: copie o bloco `:root` + `@theme` de `src/index.css` para o `globals.css`. Se o sistema já usa shadcn, troque só os valores e acrescente os que faltam (`brand`, `warn-fg`, `danger-fg`, `track`, `divider`, `chart-*`).
3. Dependência: `lucide-react`. Fontes: Plus Jakarta Sans + JetBrains Mono (no Next, via `next/font/google`, ver a skill).
4. Next.js (App Router): crie a rota e renderize a página. Como ela usa estado, a página precisa de `"use client"` no topo de `BoletosFornecedoresPage.tsx`.
   ```tsx
   // app/(painel)/financeiro/boletos/page.tsx
   import { BoletosFornecedoresPage } from "@/features/boletos-fornecedores/BoletosFornecedoresPage";
   export default function Page() { return <BoletosFornecedoresPage />; }
   ```
5. Banco de dados: troque o corpo de `data/useBoletos.ts` por chamadas à API do sistema mantendo `{ boletos, adicionar, alternarPago, remover }`. A tela não muda.

O topo com menu (`src/demo/AppShell.tsx`) é só da demonstração; no sistema a página entra no layout que já existe.

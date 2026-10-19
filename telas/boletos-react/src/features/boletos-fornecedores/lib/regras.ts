import type { Boleto, Parcela, Situacao } from "../types";
import { diffDias, somarDias } from "./format";

/** Divide o total em parcelas iguais; os centavos que sobram vão para a última. */
export function dividirEmParcelas(total: number, primeiroVencimento: string, quantidade: number, intervaloDias: number): Parcela[] {
  const n = Math.min(Math.max(Math.trunc(quantidade) || 2, 2), 24);
  const centavos = Math.round(total * 100);
  const base = Math.floor(centavos / n);
  return Array.from({ length: n }, (_, i) => ({
    parcela: `${i + 1}/${n}`,
    valor: (i === n - 1 ? centavos - base * (n - 1) : base) / 100,
    vencimento: somarDias(primeiroVencimento, intervaloDias * i),
  }));
}

export function situacao(b: Boleto, hoje: string): Situacao {
  if (b.pagoEm) return "pago";
  const n = diffDias(b.vencimento, hoje);
  return n < 0 ? "vencido" : n === 0 ? "hoje" : "aberto";
}

export const SITUACAO_TEXTO: Record<Situacao, string> = {
  pago: "Pago",
  vencido: "Vencido",
  hoje: "Vence hoje",
  aberto: "A vencer",
};

export const soma = (l: { valor: number }[]) => l.reduce((s, b) => s + b.valor, 0);

const PALETA = [1, 2, 3, 4, 5, 6, 8, 9, 10].map((i) => `var(--chart-${i})`);

/** Cada fornecedor ganha uma cor fixa da paleta categórica. */
export function corFornecedor(nome: string) {
  let h = 0;
  for (const c of nome) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return PALETA[h % PALETA.length];
}

export function iniciais(nome: string) {
  const palavras = nome.split(/\s+/).filter((w) => w.length > 2);
  return (palavras.slice(0, 2).map((w) => w[0]).join("") || nome.slice(0, 2)).toUpperCase();
}

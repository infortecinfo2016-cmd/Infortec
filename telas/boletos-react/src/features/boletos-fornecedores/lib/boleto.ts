// Leitura de boleto bancário pelo padrão FEBRABAN: linha digitável (47 dígitos)
// ou código de barras do leitor (44 dígitos).
import { soDigitos, toISO } from "./format";

export const BANCOS: Record<string, string> = {
  "001": "Banco do Brasil", "033": "Santander", "041": "Banrisul", "070": "BRB", "077": "Inter",
  "104": "Caixa", "136": "Unicred", "208": "BTG Pactual", "212": "Original", "237": "Bradesco",
  "260": "Nubank", "336": "C6 Bank", "341": "Itaú", "380": "PicPay", "422": "Safra",
  "748": "Sicredi", "756": "Sicoob",
};

export const BANCO_COR: Record<string, string> = {
  "001": "var(--chart-3)", "033": "var(--chart-7)", "104": "var(--chart-8)", "237": "var(--chart-5)",
  "341": "#F97316", "748": "var(--chart-1)", "756": "var(--chart-6)", "077": "var(--chart-3)", "260": "var(--chart-4)",
};

export const nomeBanco = (codigo: string) => BANCOS[codigo] ?? `Banco ${codigo}`;

export type LeituraBoleto =
  | { tipo: "ok"; banco: string; vencimento: string | null; valor: number; linha: string }
  | { tipo: "dv" }
  | { tipo: "convenio" }
  | { tipo: "incompleto"; digitos: number };

export function dvMod11(digitos: string) {
  let soma = 0;
  let peso = 2;
  for (let i = digitos.length - 1; i >= 0; i--) {
    soma += Number(digitos[i]) * peso;
    peso = peso === 9 ? 2 : peso + 1;
  }
  const dv = 11 - (soma % 11);
  return dv === 0 || dv === 10 || dv === 11 ? 1 : dv;
}

export function dvMod10(campo: string) {
  let soma = 0;
  let peso = 2;
  for (let i = campo.length - 1; i >= 0; i--) {
    const p = Number(campo[i]) * peso;
    soma += p > 9 ? p - 9 : p;
    peso = peso === 2 ? 1 : 2;
  }
  return (10 - (soma % 10)) % 10;
}

/** O fator de vencimento reiniciou em 22/02/2025 com o valor 1000. Fator 0 = sem vencimento. */
export function vencimentoDoFator(fator: number) {
  if (fator === 0) return null;
  const d = new Date(2025, 1, 22);
  d.setDate(d.getDate() + (fator - 1000));
  return toISO(d);
}

export function barraDaLinha(l: string) {
  return l.slice(0, 4) + l[32] + l.slice(33, 47) + l.slice(4, 9) + l.slice(10, 20) + l.slice(21, 31);
}

export function linhaDaBarra(b: string) {
  const livre = b.slice(19);
  const c1 = b.slice(0, 4) + livre.slice(0, 5);
  const c2 = livre.slice(5, 15);
  const c3 = livre.slice(15);
  return c1 + dvMod10(c1) + c2 + dvMod10(c2) + c3 + dvMod10(c3) + b[4] + b.slice(5, 19);
}

export function formatarLinha(l: string) {
  if (l.length !== 47) return l;
  return `${l.slice(0, 5)}.${l.slice(5, 10)} ${l.slice(10, 15)}.${l.slice(15, 21)} ${l.slice(21, 26)}.${l.slice(26, 32)} ${l[32]} ${l.slice(33)}`;
}

export function lerBoleto(entrada: string): LeituraBoleto | null {
  const d = soDigitos(entrada);
  if (!d) return null;
  // Contas de consumo e tributos (começam com 8) seguem outro layout.
  if (d[0] === "8") return { tipo: "convenio" };
  if (d.length !== 47 && d.length !== 44) return { tipo: "incompleto", digitos: d.length };

  const barra = d.length === 47 ? barraDaLinha(d) : d;
  if (dvMod11(barra.slice(0, 4) + barra.slice(5)) !== Number(barra[4])) return { tipo: "dv" };

  return {
    tipo: "ok",
    banco: barra.slice(0, 3),
    vencimento: vencimentoDoFator(Number(barra.slice(5, 9))),
    valor: Number(barra.slice(9, 19)) / 100,
    linha: d.length === 47 ? d : linhaDaBarra(barra),
  };
}

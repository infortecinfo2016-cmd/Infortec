// Formatação pt-BR (Infortec Design: número sempre no padrão brasileiro).

export const brl = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const moedaInput = (v: number) =>
  v ? v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "";

export const parseMoeda = (s: string) => {
  const n = Number(s.replace(/[^\d,.-]/g, "").replace(/\./g, "").replace(",", "."));
  return Number.isFinite(n) ? Math.round(n * 100) / 100 : 0;
};

export const soDigitos = (s: string) => s.replace(/\D/g, "");

export const mascaraCNPJ = (s: string) =>
  soDigitos(s)
    .slice(0, 14)
    .replace(/^(\d{2})(\d)/, "$1.$2")
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");

// Datas como string ISO (yyyy-mm-dd) para não sofrer com fuso horário.
export const toISO = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
export const fromISO = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};
export const hojeISO = () => toISO(new Date());
export const somarDias = (iso: string, n: number) => {
  const d = fromISO(iso);
  d.setDate(d.getDate() + n);
  return toISO(d);
};
export const diffDias = (a: string, b: string) => Math.round((fromISO(a).getTime() - fromISO(b).getTime()) / 864e5);

export const dataBR = (iso: string) => iso.split("-").reverse().join("/");
export const diaMes = (iso: string) => dataBR(iso).slice(0, 5);

export const relativo = (n: number) =>
  n === 0 ? "hoje" : n === 1 ? "amanhã" : n === -1 ? "ontem" : n > 0 ? `em ${n} dias` : `há ${-n} dias`;

export const plural = (n: number, um: string, varios: string) => `${n} ${n === 1 ? um : varios}`;

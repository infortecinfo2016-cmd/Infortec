import type { Boleto } from "../types";
import { brl, diaMes, fromISO, hojeISO, plural, toISO } from "../lib/format";
import { soma } from "../lib/regras";
import { Card } from "./ui";

interface Linha { nome: string; periodo: string; valor: number; legenda: string; cor: string; atrasado?: boolean }

/** Quanto sai do caixa em cada uma das próximas 5 semanas (segunda a domingo), mais os atrasados. */
export function AgendaSemanal({ boletos }: { boletos: Boleto[] }) {
  const hoje = hojeISO();
  const abertos = boletos.filter((b) => !b.pagoEm);
  const linhas: Linha[] = [];

  const atrasados = abertos.filter((b) => b.vencimento < hoje);
  if (atrasados.length) {
    linhas.push({ nome: "Atrasados", periodo: plural(atrasados.length, "boleto", "boletos"), valor: soma(atrasados), legenda: "pagar já", cor: "var(--danger)", atrasado: true });
  }

  const segunda = fromISO(hoje);
  segunda.setDate(segunda.getDate() - ((segunda.getDay() + 6) % 7));
  for (let i = 0; i < 5; i++) {
    const ini = toISO(segunda);
    segunda.setDate(segunda.getDate() + 6);
    const fim = toISO(segunda);
    segunda.setDate(segunda.getDate() + 1);
    const desde = i === 0 ? hoje : ini;
    const daSemana = abertos.filter((b) => b.vencimento >= desde && b.vencimento <= fim);
    linhas.push({
      nome: i === 0 ? "Esta semana" : i === 1 ? "Próxima semana" : `${diaMes(ini)} a ${diaMes(fim)}`,
      periodo: i < 2 ? `${diaMes(desde)} a ${diaMes(fim)}` : plural(daSemana.length, "boleto", "boletos"),
      valor: soma(daSemana),
      legenda: daSemana.length ? plural(daSemana.length, "boleto", "boletos") : "nada a pagar",
      cor: i === 0 ? "var(--brand)" : "var(--info-2)",
    });
  }
  const max = Math.max(...linhas.map((l) => l.valor), 1);

  return (
    <Card title="Saída de caixa por semana" subtitle="Quanto você precisa ter no banco para pagar os boletos em aberto">
      {linhas.map((l) => (
        <div key={l.nome} className="flex items-center gap-3 border-b border-divider py-2.5 last:border-b-0">
          <div className="w-[118px] shrink-0">
            <p className="font-medium">{l.nome}</p>
            <p className="text-[10px] text-muted-foreground">{l.periodo}</p>
          </div>
          <div className="h-1.5 min-w-10 flex-1 overflow-hidden rounded-full bg-track">
            <div className="h-full rounded-full" style={{ width: `${(l.valor / max) * 100}%`, background: l.cor }} />
          </div>
          <div className="min-w-24 text-right">
            <p className={`font-mono font-bold ${l.atrasado ? "text-danger-fg" : ""}`}>{brl(l.valor)}</p>
            <p className="text-[10px] text-muted-foreground">{l.legenda}</p>
          </div>
        </div>
      ))}
    </Card>
  );
}

import { useMemo, useState } from "react";
import { Check, Copy, ReceiptText, Search, Trash2, Undo2 } from "lucide-react";
import type { Boleto, Situacao } from "../types";
import { BANCO_COR, nomeBanco } from "../lib/boleto";
import { brl, dataBR, diaMes, diffDias, hojeISO, plural, relativo, soDigitos } from "../lib/format";
import { SITUACAO_TEXTO, corFornecedor, iniciais, situacao, soma } from "../lib/regras";
import { Card, IconButton, Segmented, cx } from "./ui";

type Filtro = "pagar" | "vencido" | "pago" | "todos";
type Ordem = "vencimento" | "valor" | "fornecedor";

interface Props {
  boletos: Boleto[];
  onAlternarPago: (b: Boleto) => void;
  onRemover: (b: Boleto) => void;
  onCopiar: (b: Boleto) => void;
}

const CHIP: Record<Situacao, string> = {
  pago: "bg-brand-soft text-primary",
  vencido: "bg-danger-soft text-danger-fg",
  hoje: "bg-warn-soft text-warn-fg",
  aberto: "border border-border bg-muted text-muted-foreground",
};

export function BoletosTable({ boletos, onAlternarPago, onRemover, onCopiar }: Props) {
  const [filtro, setFiltro] = useState<Filtro>("pagar");
  const [busca, setBusca] = useState("");
  const [ordem, setOrdem] = useState<Ordem>("vencimento");
  const hoje = hojeISO();

  const contagem = {
    pagar: boletos.filter((b) => !b.pagoEm).length,
    vencido: boletos.filter((b) => situacao(b, hoje) === "vencido").length,
    pago: boletos.filter((b) => b.pagoEm).length,
  };

  const lista = useMemo(() => {
    const q = busca.trim().toLowerCase();
    const qd = soDigitos(busca);
    return boletos
      .filter((b) => filtro === "todos" || (filtro === "pagar" ? !b.pagoEm : filtro === "pago" ? !!b.pagoEm : situacao(b, hoje) === "vencido"))
      .filter((b) => !q || b.fornecedor.toLowerCase().includes(q) || b.documento.toLowerCase().includes(q) || (!!qd && soDigitos(b.cnpj).includes(qd)))
      .sort(ordem === "valor" ? (a, b) => b.valor - a.valor
        : ordem === "fornecedor" ? (a, b) => a.fornecedor.localeCompare(b.fornecedor)
        : (a, b) => a.vencimento.localeCompare(b.vencimento));
  }, [boletos, filtro, busca, ordem, hoje]);

  return (
    <Card
      title="Boletos lançados"
      subtitle={`${plural(lista.length, "boleto", "boletos")} · ${brl(soma(lista))}`}
      actions={
        <Segmented<Filtro>
          value={filtro}
          onChange={setFiltro}
          options={[
            { value: "pagar", label: `A pagar (${contagem.pagar})` },
            { value: "vencido", label: `Vencidos (${contagem.vencido})` },
            { value: "pago", label: `Pagos (${contagem.pago})` },
            { value: "todos", label: "Todos" },
          ]}
        />
      }
    >
      <div className="mb-3 flex flex-wrap gap-2">
        <label className="flex h-9 flex-[1_1_260px] items-center gap-2 rounded-md border border-border px-3 text-muted-foreground">
          <Search className="size-3.5" />
          <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Buscar por fornecedor, CNPJ ou nota" className="min-w-0 flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground" />
        </label>
        <select value={ordem} onChange={(e) => setOrdem(e.target.value as Ordem)} className="h-9 rounded-md border border-border bg-card px-2.5 text-xs">
          <option value="vencimento">↕ Vencimento</option>
          <option value="valor">↕ Maior valor</option>
          <option value="fornecedor">↕ Fornecedor (A–Z)</option>
        </select>
      </div>

      <div className="relative -mx-4 -mb-4 overflow-x-auto">
        <table className="w-full min-w-[780px] border-collapse">
          <thead>
            <tr className="[&>th]:h-9 [&>th]:whitespace-nowrap [&>th]:border-y [&>th]:border-divider [&>th]:bg-muted [&>th]:px-3 [&>th]:text-left [&>th]:text-[10px] [&>th]:font-medium [&>th]:uppercase [&>th]:tracking-wide [&>th]:text-muted-foreground [&>th:first-child]:pl-4 [&>th:last-child]:pr-4">
              <th>Fornecedor</th><th>Nota / parcela</th><th>Vencimento</th><th>Banco</th><th className="!text-right">Valor</th><th>Situação</th><th><span className="sr-only">Ações</span></th>
            </tr>
          </thead>
          <tbody>
            {lista.map((b) => {
              const s = situacao(b, hoje);
              const cor = corFornecedor(b.fornecedor);
              return (
                <tr key={b.id} className={cx("hover:[&>td]:bg-muted/70 [&>td]:h-[52px] [&>td]:border-b [&>td]:border-divider [&>td]:px-3 [&>td]:text-[11px] [&>td:first-child]:pl-4 [&>td:last-child]:pr-4", s === "pago" && "text-muted-foreground")}>
                  <td>
                    <div className="flex min-w-0 items-center gap-2.5">
                      <span className="grid size-7 shrink-0 place-items-center rounded-md text-[10px] font-bold"
                        style={{ background: `color-mix(in srgb, ${cor} 16%, white)`, color: `color-mix(in srgb, ${cor} 80%, black)` }}>
                        {iniciais(b.fornecedor)}
                      </span>
                      <div className="min-w-0">
                        <b className="block max-w-[220px] truncate text-xs font-semibold uppercase" title={b.fornecedor}>{b.fornecedor}</b>
                        <small className="font-mono text-[10px] text-muted-foreground">{b.cnpj || "sem CNPJ"}</small>
                      </div>
                    </div>
                  </td>
                  <td><span className="font-mono text-xs font-medium">{b.documento || "—"}</span> <span className="font-mono text-[10px] text-muted-foreground">{b.parcela}</span></td>
                  <td>
                    <b className="block font-mono text-xs font-semibold">{dataBR(b.vencimento)}</b>
                    <small className={cx("text-[10px]", s === "vencido" ? "text-danger-fg" : "text-muted-foreground")}>
                      {b.pagoEm ? `pago em ${diaMes(b.pagoEm)}` : relativo(diffDias(b.vencimento, hoje))}
                    </small>
                  </td>
                  <td>
                    {b.banco
                      ? <span className="flex items-center gap-1.5 whitespace-nowrap"><span className="size-1.5 rounded-full" style={{ background: BANCO_COR[b.banco] ?? "var(--chart-10)" }} />{nomeBanco(b.banco)}</span>
                      : <span className="italic text-subtle-foreground">sem código</span>}
                  </td>
                  <td className="whitespace-nowrap text-right font-mono !text-xs font-bold">{brl(b.valor)}</td>
                  <td>
                    <span className={cx("inline-flex h-5 items-center gap-1.5 whitespace-nowrap rounded-full px-2 text-[10.5px] font-semibold before:size-1.5 before:rounded-full before:bg-current", CHIP[s])}>
                      {SITUACAO_TEXTO[s]}
                    </span>
                  </td>
                  <td>
                    <div className="flex justify-end gap-0.5">
                      {b.linhaDigitavel && <IconButton icon={Copy} label="Copiar linha digitável" onClick={() => onCopiar(b)} />}
                      <IconButton icon={b.pagoEm ? Undo2 : Check} label={b.pagoEm ? "Desfazer pagamento" : "Marcar como pago"} onClick={() => onAlternarPago(b)} />
                      <IconButton icon={Trash2} label="Excluir" onClick={() => onRemover(b)} />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {lista.length === 0 && (
          <div className="grid justify-items-center gap-2 px-4 py-10 text-center text-muted-foreground">
            <ReceiptText className="size-5" />
            <p>{busca ? "Nenhum boleto encontrado para essa busca." : "Nenhum boleto aqui."}</p>
          </div>
        )}
      </div>
    </Card>
  );
}

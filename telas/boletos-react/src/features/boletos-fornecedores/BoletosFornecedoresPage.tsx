import { useEffect, useRef, useState } from "react";
import { CalendarDays, CheckCircle2, Clock, Download, FileCode2, Plus, Wallet } from "lucide-react";
import { useBoletos } from "./data/useBoletos";
import { LancarBoletoForm, type LancarBoletoFormHandle } from "./components/LancarBoletoForm";
import { BoletosTable } from "./components/BoletosTable";
import { AgendaSemanal } from "./components/AgendaSemanal";
import { Button, Card, KpiStat } from "./components/ui";
import type { Boleto } from "./types";
import { nomeBanco } from "./lib/boleto";
import { lerNFe } from "./lib/nfe";
import { brl, dataBR, diffDias, hojeISO, moedaInput, plural } from "./lib/format";
import { SITUACAO_TEXTO, situacao, soma } from "./lib/regras";

/** Contas a pagar › Boletos de fornecedores. Coloque dentro do layout (menu + topo) do sistema. */
export function BoletosFornecedoresPage() {
  const { boletos, adicionar, alternarPago, remover } = useBoletos();
  const formRef = useRef<LancarBoletoFormHandle>(null);
  const formCardRef = useRef<HTMLElement>(null);
  const arquivoRef = useRef<HTMLInputElement>(null);
  const { toast, mostrar } = useToast();

  const hoje = hojeISO();
  const abertos = boletos.filter((b) => !b.pagoEm);
  const vencidos = abertos.filter((b) => b.vencimento < hoje);
  const semana = abertos.filter((b) => b.vencimento >= hoje && diffDias(b.vencimento, hoje) <= 7);
  const pagosNoMes = boletos.filter((b) => b.pagoEm?.slice(0, 7) === hoje.slice(0, 7));

  const irParaFormulario = () => formCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  async function importarXML(arquivo: File) {
    const nfe = lerNFe(await arquivo.text());
    if (!nfe) return mostrar("Esse arquivo não parece um XML de NF-e");
    formRef.current?.importarNFe(nfe);
    irParaFormulario();
  }

  async function copiar(b: Boleto) {
    try {
      await navigator.clipboard.writeText(b.linhaDigitavel ?? "");
      mostrar("Linha digitável copiada, é só colar no app do banco");
    } catch {
      mostrar("Não deu para copiar");
    }
  }

  return (
    <div className="mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)] gap-3 p-4 md:p-5">
      <div className="flex flex-wrap items-end justify-between gap-3 pb-1">
        <div>
          <p className="text-xs text-muted-foreground">Contas a pagar · duplicatas dos fornecedores</p>
          <h1 className="text-2xl font-bold tracking-tight">Boletos de fornecedores</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] text-muted-foreground">{plural(boletos.length, "lançamento", "lançamentos")}</span>
          <Button icon={Download} onClick={() => exportarCSV(boletos)}>Exportar</Button>
          <Button icon={FileCode2} onClick={() => arquivoRef.current?.click()}>Importar XML da NF-e</Button>
          <input ref={arquivoRef} type="file" accept=".xml,text/xml" className="sr-only" aria-label="Arquivo XML da NF-e" data-testid="xml"
            onChange={(e) => { const a = e.target.files?.[0]; e.target.value = ""; if (a) importarXML(a); }} />
          <Button variant="primary" icon={Plus} onClick={() => { formRef.current?.limpar(); irParaFormulario(); }}>Novo boleto</Button>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiStat label="Total em aberto" value={brl(soma(abertos))} sub={plural(abertos.length, "boleto a pagar", "boletos a pagar")} icon={Wallet} color="var(--info)" />
        <KpiStat label="Vence nos próximos 7 dias" value={brl(soma(semana))} sub={`${plural(semana.length, "boleto", "boletos")} · separe esse valor`} icon={CalendarDays} color="var(--warn)" />
        <KpiStat label="Vencidos" value={brl(soma(vencidos))}
          sub={vencidos.length ? plural(vencidos.length, "boleto pede atenção", "boletos pedem atenção") : "nada atrasado"}
          icon={Clock} color={vencidos.length ? "var(--danger)" : "var(--chart-10)"} />
        <KpiStat label="Pago neste mês" value={brl(soma(pagosNoMes))} sub={plural(pagosNoMes.length, "boleto baixado", "boletos baixados")} icon={CheckCircle2} color="var(--brand)" />
      </div>

      <div className="grid items-start gap-3 grid-cols-[minmax(0,1fr)] xl:grid-cols-[minmax(0,400px)_minmax(0,1fr)]">
        <Card ref={formCardRef} title="Lançar boleto" subtitle="Cole a linha digitável ou passe o leitor: banco, valor e vencimento vêm sozinhos.">
          <LancarBoletoForm
            ref={formRef}
            boletos={boletos}
            onLancar={(novos) => {
              adicionar(novos);
              mostrar(novos.length > 1
                ? `${novos.length} parcelas lançadas · ${brl(soma(novos))}`
                : `Boleto lançado · ${novos[0].fornecedor} · ${brl(novos[0].valor)}`);
            }}
          />
        </Card>
        <div className="grid grid-cols-[minmax(0,1fr)] gap-3">
          <BoletosTable
            boletos={boletos}
            onCopiar={copiar}
            onAlternarPago={(b) => { alternarPago(b.id); mostrar(b.pagoEm ? "Pagamento desfeito" : `Pago · ${b.fornecedor} · ${brl(b.valor)}`); }}
            onRemover={(b) => { if (confirm(`Excluir ${b.documento || "boleto"} de ${b.fornecedor}?`)) { remover(b.id); mostrar("Boleto excluído"); } }}
          />
          <AgendaSemanal boletos={boletos} />
        </div>
      </div>

      <div role="status" aria-live="polite"
        className={`fixed bottom-4 right-4 flex max-w-[calc(100vw-32px)] items-center gap-2.5 rounded-lg border border-border bg-card px-3.5 py-2.5 text-xs shadow-[0_8px_24px_rgb(16_24_16/.08)] transition-all duration-200 ${toast ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-5 opacity-0"}`}>
        <span className="grid size-6 place-items-center rounded-md bg-brand text-white"><CheckCircle2 className="size-3.5" /></span>
        <span data-testid="toast">{toast}</span>
      </div>
    </div>
  );
}

function useToast() {
  const [toast, setToast] = useState<string | null>(null);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);
  return { toast, mostrar: (msg: string) => setToast(msg) };
}

function exportarCSV(boletos: Boleto[]) {
  const hoje = hojeISO();
  const cabecalho = ["Fornecedor", "CNPJ", "Nota", "Parcela", "Vencimento", "Valor", "Situação", "Banco", "Linha digitável", "Categoria", "Forma de pagamento"];
  const linhas = boletos.map((b) => [b.fornecedor, b.cnpj, b.documento, b.parcela, dataBR(b.vencimento), moedaInput(b.valor),
    SITUACAO_TEXTO[situacao(b, hoje)], b.banco ? nomeBanco(b.banco) : "", b.linhaDigitavel ?? "", b.categoria, b.formaPagamento]);
  const csv = [cabecalho, ...linhas].map((l) => l.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(";")).join("\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob(["﻿" + csv], { type: "text/csv" }));
  a.download = `boletos-fornecedores-${hoje}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}

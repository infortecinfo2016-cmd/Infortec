import { useImperativeHandle, useMemo, useRef, useState, type FormEvent, type ReactNode, type Ref } from "react";
import { Barcode, Check } from "lucide-react";
import { CATEGORIAS, FORMAS_PAGAMENTO, type Boleto, type NovoBoleto, type Parcela } from "../types";
import { formatarLinha, lerBoleto, nomeBanco, type LeituraBoleto } from "../lib/boleto";
import type { DadosNFe } from "../lib/nfe";
import { brl, dataBR, diffDias, hojeISO, mascaraCNPJ, moedaInput, parseMoeda, plural, relativo } from "../lib/format";
import { dividirEmParcelas, soma } from "../lib/regras";
import { Button, Field, Note, inputClass, type Tom } from "./ui";

export interface LancarBoletoFormHandle {
  limpar: () => void;
  importarNFe: (nfe: DadosNFe) => void;
}

interface Props {
  boletos: Boleto[];
  onLancar: (novos: NovoBoleto[]) => void;
  ref?: Ref<LancarBoletoFormHandle>;
}

const VAZIO = {
  linha: "", fornecedor: "", cnpj: "", documento: "", valor: "", vencimento: "",
  categoria: CATEGORIAS[0] as string, forma: FORMAS_PAGAMENTO[0] as string, observacao: "",
  dividir: false, quantidade: "3", intervalo: "30",
};

export function LancarBoletoForm({ boletos, onLancar, ref }: Props) {
  const [f, setF] = useState(VAZIO);
  const [leitura, setLeitura] = useState<LeituraBoleto | null>(null);
  const [auto, setAuto] = useState({ valor: false, vencimento: false });
  const [duplicatasNFe, setDuplicatasNFe] = useState<Parcela[] | null>(null);
  const [aviso, setAviso] = useState<{ tom: Tom; texto: ReactNode } | null>(null);
  const [confirmarRepetido, setConfirmarRepetido] = useState(false);
  const linhaRef = useRef<HTMLInputElement>(null);
  const fornecedorRef = useRef<HTMLInputElement>(null);
  const valorRef = useRef<HTMLInputElement>(null);
  const vencRef = useRef<HTMLInputElement>(null);

  const set = <K extends keyof typeof VAZIO>(k: K, v: (typeof VAZIO)[K]) => setF((s) => ({ ...s, [k]: v }));

  const fornecedores = useMemo(() => {
    const ultimo = new Map<string, Boleto>();
    boletos.forEach((b) => ultimo.set(b.fornecedor.toLowerCase(), b));
    return ultimo;
  }, [boletos]);

  const parcelas: Parcela[] = useMemo(() => {
    if (duplicatasNFe) return duplicatasNFe;
    const valor = parseMoeda(f.valor);
    if (!valor || !f.vencimento) return [];
    if (!f.dividir) return [{ parcela: "1/1", valor, vencimento: f.vencimento }];
    return dividirEmParcelas(valor, f.vencimento, Number(f.quantidade), Number(f.intervalo));
  }, [duplicatasNFe, f.valor, f.vencimento, f.dividir, f.quantidade, f.intervalo]);

  const repetidoPelaLinha = leitura?.tipo === "ok" ? boletos.find((b) => b.linhaDigitavel === leitura.linha) : undefined;

  function limpar() {
    setF(VAZIO);
    setLeitura(null);
    setAuto({ valor: false, vencimento: false });
    setDuplicatasNFe(null);
    setAviso(null);
    setConfirmarRepetido(false);
    linhaRef.current?.focus();
  }

  useImperativeHandle(ref, () => ({
    limpar,
    importarNFe(nfe) {
      limpar();
      setF({ ...VAZIO, fornecedor: nfe.fornecedor, cnpj: nfe.cnpj, documento: `NF ${nfe.numero}`,
        valor: moedaInput(nfe.duplicatas.length ? soma(nfe.duplicatas) : nfe.total),
        vencimento: nfe.duplicatas[0]?.vencimento ?? "" });
      if (nfe.duplicatas.length) {
        setDuplicatasNFe(nfe.duplicatas);
        setAviso({ tom: "ok", texto: <><b>NF {nfe.numero}</b> lida: {plural(nfe.duplicatas.length, "duplicata", "duplicatas")}. Confira e lance.</> });
      } else {
        setAviso({ tom: "warn", texto: "A nota não traz duplicatas. Informe o vencimento." });
        setTimeout(() => vencRef.current?.focus());
      }
    },
  }));

  function aoDigitarLinha(valor: string) {
    const r = lerBoleto(valor);
    setLeitura(r);
    setAuto({ valor: false, vencimento: false });
    if (r?.tipo !== "ok") return set("linha", valor);
    setF((s) => ({
      ...s,
      linha: formatarLinha(r.linha),
      valor: r.valor ? moedaInput(r.valor) : s.valor,
      vencimento: r.vencimento ?? s.vencimento,
      forma: "Boleto",
    }));
    setAuto({ valor: r.valor > 0, vencimento: !!r.vencimento });
    if (!f.fornecedor) fornecedorRef.current?.focus();
  }

  function aoEscolherFornecedor(nome: string) {
    set("fornecedor", nome);
    const ultimo = fornecedores.get(nome.trim().toLowerCase());
    if (ultimo) setF((s) => ({ ...s, fornecedor: nome, cnpj: s.cnpj || ultimo.cnpj, categoria: ultimo.categoria, forma: leitura?.tipo === "ok" ? s.forma : ultimo.formaPagamento }));
  }

  function lancar(e: FormEvent) {
    e.preventDefault();
    const fornecedor = f.fornecedor.trim();
    const documento = f.documento.trim();
    if (!fornecedor || !parcelas.length) {
      setAviso({ tom: "bad", texto: `Preencha ${[!fornecedor && "fornecedor", !parcelas.length && "valor e vencimento"].filter(Boolean).join(" e ")}.` });
      (!fornecedor ? fornecedorRef : valorRef).current?.focus();
      return;
    }
    const repetido = documento && boletos.find((b) =>
      b.fornecedor.toLowerCase() === fornecedor.toLowerCase() && b.documento.toLowerCase() === documento.toLowerCase() && parcelas.some((p) => p.parcela === b.parcela));
    if (repetido && !confirmarRepetido) {
      setConfirmarRepetido(true);
      setAviso({ tom: "warn", texto: <><b>{documento} parcela {repetido.parcela}</b> já está lançada para {fornecedor}. Clique em lançar de novo se for outro boleto.</> });
      return;
    }
    const lido = leitura?.tipo === "ok" ? leitura : null;
    onLancar(parcelas.map((p, i) => ({
      fornecedor, documento, cnpj: f.cnpj, parcela: p.parcela, valor: p.valor, vencimento: p.vencimento,
      categoria: f.categoria, formaPagamento: f.forma, observacao: f.observacao.trim(),
      banco: i === 0 && lido ? lido.banco : null,
      linhaDigitavel: i === 0 && lido ? lido.linha : null,
    })));
    limpar();
  }

  const varias = parcelas.length > 1;
  const dividindo = f.dividir && !duplicatasNFe;
  const hoje = hojeISO();

  return (
    <form onSubmit={lancar} autoComplete="off" noValidate className="grid gap-3">
      <Field label="Linha digitável ou código de barras">
        <span className="relative block">
          <Barcode className="pointer-events-none absolute left-3 top-3.5 size-4 text-muted-foreground" />
          <input
            ref={linhaRef}
            value={f.linha}
            onChange={(e) => aoDigitarLinha(e.target.value)}
            inputMode="numeric"
            placeholder="Cole aqui os 47 números do boleto"
            className={inputClass(false, true) + " h-11 pl-9 text-[12.5px] tracking-[.02em]"}
          />
        </span>
      </Field>
      <AvisoLinha leitura={leitura} repetido={repetidoPelaLinha} hoje={hoje} />

      <div className="h-px bg-divider" />

      <Field label="Fornecedor">
        <input ref={fornecedorRef} value={f.fornecedor} onChange={(e) => aoEscolherFornecedor(e.target.value)} list="fornecedores-conhecidos" placeholder="Comece a digitar o nome" className={inputClass()} />
        <datalist id="fornecedores-conhecidos">
          {[...new Set(boletos.map((b) => b.fornecedor))].sort().map((n) => <option key={n} value={n} />)}
        </datalist>
      </Field>
      <div className="grid grid-cols-2 gap-2.5">
        <Field label="CNPJ"><input value={f.cnpj} onChange={(e) => set("cnpj", mascaraCNPJ(e.target.value))} inputMode="numeric" placeholder="00.000.000/0000-00" className={inputClass(false, true)} /></Field>
        <Field label="Nº da nota / duplicata"><input value={f.documento} onChange={(e) => set("documento", e.target.value)} placeholder="NF 4521" className={inputClass(false, true)} /></Field>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <Field label={dividindo ? "Valor total da nota" : "Valor"}>
          <input ref={valorRef} value={f.valor} inputMode="decimal" placeholder="0,00" className={inputClass(auto.valor, true)}
            onChange={(e) => { set("valor", e.target.value); setAuto((a) => ({ ...a, valor: false })); }}
            onBlur={() => set("valor", moedaInput(parseMoeda(f.valor)))} />
        </Field>
        <Field label={dividindo ? "1º vencimento" : "Vencimento"}>
          <input ref={vencRef} type="date" value={f.vencimento} className={inputClass(auto.vencimento, true)}
            onChange={(e) => { set("vencimento", e.target.value); setAuto((a) => ({ ...a, vencimento: false })); }} />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <Field label="Categoria">
          <select value={f.categoria} onChange={(e) => set("categoria", e.target.value)} className={inputClass()}>
            {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
        <Field label="Forma de pagamento">
          <select value={f.forma} onChange={(e) => set("forma", e.target.value)} className={inputClass()}>
            {FORMAS_PAGAMENTO.map((c) => <option key={c}>{c}</option>)}
          </select>
        </Field>
      </div>

      <Interruptor checked={f.dividir} onChange={(v) => { set("dividir", v); setDuplicatasNFe(null); }}>
        Dividir em parcelas (a nota veio em várias duplicatas)
      </Interruptor>
      {dividindo && (
        <div className="grid grid-cols-2 gap-2.5">
          <Field label="Quantas parcelas"><input type="number" min={2} max={24} value={f.quantidade} onChange={(e) => set("quantidade", e.target.value)} className={inputClass(false, true)} /></Field>
          <Field label="Intervalo">
            <select value={f.intervalo} onChange={(e) => set("intervalo", e.target.value)} className={inputClass()}>
              <option value="30">a cada 30 dias</option><option value="28">a cada 28 dias</option><option value="21">a cada 21 dias</option>
              <option value="15">a cada 15 dias</option><option value="7">toda semana</option>
            </select>
          </Field>
        </div>
      )}
      {(dividindo || duplicatasNFe) && parcelas.length > 0 && (
        <div className="overflow-hidden rounded-md border border-border" data-testid="parcelas">
          <div className="flex items-center justify-between border-b border-divider bg-muted px-2.5 py-1.5">
            <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">{duplicatasNFe ? "Duplicatas da NF-e" : "Parcelas"}</span>
            <span className="font-mono text-xs font-bold">{brl(soma(parcelas))}</span>
          </div>
          {parcelas.map((p) => (
            <div key={p.parcela} className="flex items-center gap-2.5 border-b border-divider px-2.5 py-1.5 font-mono text-xs font-medium last:border-b-0">
              <span className="w-8 text-muted-foreground">{p.parcela}</span>
              <span>{dataBR(p.vencimento)}</span>
              <span className="text-[10px] text-muted-foreground">{relativo(diffDias(p.vencimento, hoje))}</span>
              <span className="ml-auto font-bold">{brl(p.valor)}</span>
            </div>
          ))}
        </div>
      )}

      <Field label="Observação">
        <textarea value={f.observacao} onChange={(e) => set("observacao", e.target.value)} placeholder="Opcional" className={inputClass() + " h-14 resize-y py-2"} />
      </Field>

      {aviso && <Note tone={aviso.tom}>{aviso.texto}</Note>}

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
        <span className="text-[11px] text-muted-foreground">Enter lança e já deixa pronto para o próximo.</span>
        <div className="flex gap-2">
          <Button onClick={limpar}>Limpar</Button>
          <Button type="submit" variant="primary" icon={Check}>{varias ? `Lançar ${parcelas.length} parcelas` : "Lançar boleto"}</Button>
        </div>
      </div>
    </form>
  );
}

function AvisoLinha({ leitura, repetido, hoje }: { leitura: LeituraBoleto | null; repetido?: Boleto; hoje: string }) {
  if (!leitura) return null;
  if (leitura.tipo === "convenio") return <Note tone="warn">Boleto de concessionária ou tributo: confira valor e vencimento à mão.</Note>;
  if (leitura.tipo === "incompleto") return <Note tone="warn">Faltam números: {leitura.digitos} de 47 da linha digitável.</Note>;
  if (leitura.tipo === "dv") return <Note tone="bad">Algum número não confere com o dígito verificador. Confira a linha digitada.</Note>;
  if (repetido) return <Note tone="warn"><b>Este boleto já foi lançado</b> para {repetido.fornecedor} ({repetido.documento}, vence {dataBR(repetido.vencimento)}).</Note>;
  return (
    <Note tone="ok">
      <b>{nomeBanco(leitura.banco)}</b> · <span className="font-mono">{leitura.valor ? brl(leitura.valor) : "valor em branco"}</span> ·{" "}
      {leitura.vencimento ? <>vence <span className="font-mono">{dataBR(leitura.vencimento)}</span> ({relativo(diffDias(leitura.vencimento, hoje))})</> : "sem vencimento"}
    </Note>
  );
}

function Interruptor({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: ReactNode }) {
  return (
    <label className="flex cursor-pointer select-none items-center gap-2 text-xs">
      <input type="checkbox" role="switch" checked={checked} onChange={(e) => onChange(e.target.checked)} className="peer sr-only" />
      <span className="relative h-[18px] w-[30px] shrink-0 rounded-full bg-border transition-colors peer-checked:bg-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring after:absolute after:left-0.5 after:top-0.5 after:size-3.5 after:rounded-full after:bg-white after:shadow-sm after:transition-[left] peer-checked:after:left-3.5" />
      {children}
    </label>
  );
}

// Leitura do XML da NF-e: emitente, número e duplicatas (<cobr><dup>).
import type { Parcela } from "../types";
import { mascaraCNPJ } from "./format";

export interface DadosNFe {
  fornecedor: string;
  cnpj: string;
  numero: string;
  total: number;
  duplicatas: Parcela[];
}

export function lerNFe(xml: string): DadosNFe | null {
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  const texto = (raiz: Element | Document | undefined, tag: string) =>
    raiz?.getElementsByTagName(tag)[0]?.textContent?.trim() ?? "";

  const emit = doc.getElementsByTagName("emit")[0];
  if (!emit) return null;

  const dups = [...doc.getElementsByTagName("dup")];
  return {
    fornecedor: texto(emit, "xNome"),
    cnpj: mascaraCNPJ(texto(emit, "CNPJ")),
    numero: texto(doc, "nNF"),
    total: Number(texto(doc, "vNF")) || 0,
    duplicatas: dups.map((d, i) => ({
      parcela: `${i + 1}/${dups.length}`,
      vencimento: texto(d, "dVenc"),
      valor: Number(texto(d, "vDup")),
    })),
  };
}

import { useCallback, useEffect, useState } from "react";
import type { Boleto, NovoBoleto } from "../types";
import { hojeISO, somarDias } from "../lib/format";

const CHAVE = "infortec-boletos-v1";

/**
 * Guarda os boletos no navegador. Para ligar ao sistema, troque o corpo destas
 * funções por chamadas à API (ex.: GET/POST /api/boletos) e mantenha a mesma assinatura:
 * a tela não precisa mudar.
 */
export function useBoletos() {
  const [boletos, setBoletos] = useState<Boleto[]>(carregar);

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(boletos));
    } catch {
      /* navegador sem armazenamento: segue só em memória */
    }
  }, [boletos]);

  const adicionar = useCallback((novos: NovoBoleto[]) => {
    setBoletos((atual) => [...atual, ...novos.map((n) => ({ ...n, id: crypto.randomUUID(), pagoEm: null }))]);
  }, []);

  const alternarPago = useCallback((id: string) => {
    setBoletos((atual) => atual.map((b) => (b.id === id ? { ...b, pagoEm: b.pagoEm ? null : hojeISO() } : b)));
  }, []);

  const remover = useCallback((id: string) => {
    setBoletos((atual) => atual.filter((b) => b.id !== id));
  }, []);

  return { boletos, adicionar, alternarPago, remover };
}

function carregar(): Boleto[] {
  try {
    const salvo = localStorage.getItem(CHAVE);
    if (salvo) return JSON.parse(salvo) as Boleto[];
  } catch {
    /* ignora e usa o exemplo */
  }
  return exemplo();
}

/** Lançamentos de exemplo, com datas relativas a hoje. */
function exemplo(): Boleto[] {
  const hoje = hojeISO();
  const b = (fornecedor: string, cnpj: string, documento: string, parcela: string, valor: number, dias: number, banco: string, categoria: string, pago = false): Boleto => ({
    id: crypto.randomUUID(), fornecedor, cnpj, documento, parcela, valor, banco, categoria,
    vencimento: somarDias(hoje, dias), pagoEm: pago ? somarDias(hoje, dias) : null,
    formaPagamento: "Boleto", linhaDigitavel: null, observacao: "",
  });
  return [
    b("Distribuidora Araguaia Ltda", "12.345.678/0001-90", "NF 4521", "1/3", 1850.4, -4, "341", "Mercadoria"),
    b("Frigorífico Boi Forte", "23.456.789/0001-01", "NF 889", "1/1", 3240, 0, "748", "Mercadoria"),
    b("Embalagens Floresta", "34.567.890/0001-12", "NF 1207", "2/4", 612.75, 3, "756", "Matéria-prima"),
    b("Transportadora Rápido Norte", "45.678.901/0001-23", "CT-e 3310", "1/1", 480, 6, "237", "Frete"),
    b("Distribuidora Araguaia Ltda", "12.345.678/0001-90", "NF 4521", "2/3", 1850.4, 26, "341", "Mercadoria"),
    b("Atacado Pará Alimentos", "56.789.012/0001-34", "NF 77310", "1/2", 2975.9, 12, "001", "Mercadoria"),
    b("Embalagens Floresta", "34.567.890/0001-12", "NF 1207", "1/4", 612.75, -11, "756", "Matéria-prima", true),
    b("Atacado Pará Alimentos", "56.789.012/0001-34", "NF 76102", "2/2", 2140, -8, "001", "Mercadoria", true),
  ];
}

// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { dvMod10, dvMod11, formatarLinha, lerBoleto, linhaDaBarra } from "./boleto";
import { lerNFe } from "./nfe";
import { dividirEmParcelas } from "./regras";
import { brl, mascaraCNPJ, parseMoeda } from "./format";

// Boleto Itaú de R$ 1.250,00 com vencimento em 25/10/2026, montado pelas regras FEBRABAN.
const fator = 1000 + Math.round((new Date(2026, 9, 25).getTime() - new Date(2025, 1, 22).getTime()) / 864e5);
const semDV = `3419${fator}0000125000` + "1790010104351004791020150";
const BARRA = semDV.slice(0, 4) + dvMod11(semDV) + semDV.slice(4);
const LINHA = linhaDaBarra(BARRA);

describe("lerBoleto", () => {
  it("lê banco, valor e vencimento da linha digitável", () => {
    expect(lerBoleto(formatarLinha(LINHA))).toEqual({ tipo: "ok", banco: "341", valor: 1250, vencimento: "2026-10-25", linha: LINHA });
  });

  it("aceita o código de barras do leitor e devolve a linha digitável", () => {
    expect(lerBoleto(BARRA)).toMatchObject({ tipo: "ok", valor: 1250, linha: LINHA });
  });

  it("os dígitos dos campos da linha seguem o módulo 10", () => {
    expect(Number(LINHA[9])).toBe(dvMod10(LINHA.slice(0, 9)));
  });

  it("acusa número trocado", () => {
    const errada = LINHA.slice(0, 40) + ((Number(LINHA[40]) + 1) % 10) + LINHA.slice(41);
    expect(lerBoleto(errada)).toEqual({ tipo: "dv" });
  });

  it("avisa linha incompleta e boleto de concessionária", () => {
    expect(lerBoleto("34191.7900")).toEqual({ tipo: "incompleto", digitos: 9 });
    expect(lerBoleto("8".repeat(48))).toEqual({ tipo: "convenio" });
    expect(lerBoleto("")).toBeNull();
  });
});

describe("dividirEmParcelas", () => {
  it("joga os centavos que sobram na última parcela", () => {
    expect(dividirEmParcelas(1000, "2026-11-10", 3, 30)).toEqual([
      { parcela: "1/3", valor: 333.33, vencimento: "2026-11-10" },
      { parcela: "2/3", valor: 333.33, vencimento: "2026-12-10" },
      { parcela: "3/3", valor: 333.34, vencimento: "2027-01-09" },
    ]);
  });
});

describe("lerNFe", () => {
  it("extrai emitente, número e duplicatas", () => {
    const xml = `<?xml version="1.0"?><nfeProc xmlns="http://www.portalfiscal.inf.br/nfe"><NFe><infNFe>
      <ide><nNF>9032</nNF></ide><emit><CNPJ>67890123000145</CNPJ><xNome>Laticínios Vale Verde Ltda</xNome></emit>
      <total><ICMSTot><vNF>3000.00</vNF></ICMSTot></total>
      <cobr><dup><nDup>001</nDup><dVenc>2026-11-03</dVenc><vDup>1500.00</vDup></dup><dup><nDup>002</nDup><dVenc>2026-12-03</dVenc><vDup>1500.00</vDup></dup></cobr>
    </infNFe></NFe></nfeProc>`;
    expect(lerNFe(xml)).toEqual({
      fornecedor: "Laticínios Vale Verde Ltda", cnpj: "67.890.123/0001-45", numero: "9032", total: 3000,
      duplicatas: [
        { parcela: "1/2", vencimento: "2026-11-03", valor: 1500 },
        { parcela: "2/2", vencimento: "2026-12-03", valor: 1500 },
      ],
    });
  });

  it("recusa arquivo que não é NF-e", () => {
    expect(lerNFe("<qualquer/>")).toBeNull();
  });
});

describe("formatação pt-BR", () => {
  it("formata moeda e CNPJ", () => {
    expect(brl(12386.08).replace(/\s/g, " ")).toBe("R$ 12.386,08");
    expect(parseMoeda("1.250,40")).toBe(1250.4);
    expect(mascaraCNPJ("12345678000190")).toBe("12.345.678/0001-90");
  });
});

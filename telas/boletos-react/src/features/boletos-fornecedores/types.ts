export type Situacao = "pago" | "vencido" | "hoje" | "aberto";

export interface Boleto {
  id: string;
  fornecedor: string;
  cnpj: string;
  documento: string;
  /** "1/3" */
  parcela: string;
  valor: number;
  /** ISO yyyy-mm-dd */
  vencimento: string;
  /** código do banco (341, 001...) ou null quando lançado sem código de barras */
  banco: string | null;
  categoria: string;
  formaPagamento: string;
  pagoEm: string | null;
  /** 47 dígitos, sem pontuação */
  linhaDigitavel: string | null;
  observacao: string;
}

export type NovoBoleto = Omit<Boleto, "id" | "pagoEm">;

export interface Parcela {
  parcela: string;
  valor: number;
  vencimento: string;
}

export const CATEGORIAS = ["Mercadoria", "Matéria-prima", "Serviços", "Frete", "Aluguel", "Outros"] as const;
export const FORMAS_PAGAMENTO = ["Boleto", "Pix", "Transferência", "Débito em conta"] as const;

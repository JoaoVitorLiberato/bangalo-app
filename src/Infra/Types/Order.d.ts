import { IproductData } from "@/types/types-product"

export interface IOrder {
  id?: string,
  canal: string,
  nome: string,
  telefone: string,
  messagem: string,
  produtos: IproductData[],
  pagamento: {
    formaPagamento: string,
    statusPagamento: string,
    valorFrete: number,
    valorProdutos: number,
    valorTotal: number,
  },
  analytics: {
		source: string,
		medium: string,
		campaign: string,
		params: Record<string, string|number|boolean>
  }
}

export interface IDataInfinity {
  transaction_id: string,
  slug: string,
  order_nsu: string
}

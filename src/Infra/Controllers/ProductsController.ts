import { ProductsRepository } from "../Repositories/ProductsRepository"
import { Request, Response } from "express"

export class ProductsController extends ProductsRepository {
  list = async (_request: Request, response: Response): Promise<Response> => {
    try {
      const PRODUCTS = await this.getAllProducts()
      if (!PRODUCTS || /^(error)$/i.test(String(PRODUCTS))) throw Error()
      return response.status(200).json(PRODUCTS)
    } catch {
      return response.status(400).json({
        codigo: "error-find-products",
        mensagem: "Houve um erro ao consultar os produtos, por favor, tente novamente.",
      })
    }
  }
}

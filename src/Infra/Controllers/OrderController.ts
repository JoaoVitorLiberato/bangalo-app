import { Response, Request } from "express";
import { OrderRepository } from "../Repositories/OrderReposity"

export class OrderController extends OrderRepository {
  listByPhone = async (_request: Request, response: Response): Promise<Response> => {
    const { telefone } = _request.params
    
    try {
      const responseRepository = await this.listOrderByPhone(telefone)
      return response.status(200).json({
        ...responseRepository
      })
    } catch {
      return response.status(404).json({
        codigo: "order-not-found",
        messagem: "Seu pedido não foi encontrado."
      })
    }
  }
}

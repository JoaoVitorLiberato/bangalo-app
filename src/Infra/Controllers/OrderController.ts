import { Response, Request } from "express";
import { OrderRepository } from "../Repositories/OrderReposity"

export class OrderController extends OrderRepository {
  create = async (_request: Request, response: Response): Promise<Response> => {
    const { body } = _request
    let validation;

    try {
      Object.keys(body).forEach((field) => {
        if (!body[field]) {
          validation = {
            codigo: `empty-${String(field).toLowerCase()}-field`
          }
        }
  
        if (/segmento/i.test(String(field))) {
          if (/^(local)$/i.test(String(body[field]))) {
            body.pagamento.valorFrete = 0
          }

          if (!/^(local|delivery)$/i.test(String(body[field]))) {
            validation = {
              codigo: `segment-${body[field]}-not-exist`
            }
          }
        }
  
        if (/pagamento/i.test(String(field))) {
          Object.keys(field).forEach(item => {
            if (!!body[field][item]) {
              validation = {
                codigo: `field-${field}.${item}-empty`,
              }
            }
          })
        }

        if (/endereco/i.test(String(field))) {
          if (
            ![
              "65272000"
            ].includes(String(body[field].cep))
          ) {
            validation = {
              codigo: `cep-invalid`,
              cep: String(body[field].cep)
            }
          }
        }
      })

      if (!!validation) return response.status(400).json(validation)

      const responseRepository = await this.createOrder(body)

      if (/error-create-order-model/i.test(String(responseRepository.error))) throw Error()

      return response.status(201).json({
        messagem: "Pedido criado com sucesso.",
      })
    } catch {
      return response.status(400).json({
        codigo: "error-create-order",
        messagem: "Houve um erro ao tentar criar o pedido."
      })
    }
  }

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

import { ORDER } from "../Models/Order"
import { IOrder } from "../Types/Order"

export class OrderRepository {
  createOrder (data:IOrder): Promise<any> {
    return new Promise((resolve, reject) => {
      ORDER.create({ ...data })
        .then((_) => resolve({ sucesso: true }))
        .catch((_) => resolve({ error: "error-create-order-model" }))
    })
  }

  listOrderByPhone (phone:string): Promise<any> {
    return new Promise((resolve, reject) => {
      ORDER.findOne({ where: { telefone: phone  } })
        .then((responseModel) => resolve(responseModel))
        .catch(_ => {
          resolve("erro-order-find-by-phone-model")
        })
    })
  }
}

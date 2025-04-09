import { ORDER } from "../Models/Order"

export class OrderRepository {
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

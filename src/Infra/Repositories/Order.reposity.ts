import { Op } from "sequelize"
import { ORDER } from "../Models/Order.model"
import { IOrder } from "../Types/Order"
import { dateDBQuery } from "../Helpers/DateFormated.helper"

export class OrderRepository {
  createOrder (data:IOrder): Promise<any> {
    return new Promise((resolve, reject) => {
      ORDER.create({ ...data })
        .then((responseModel) => resolve(responseModel))
        .catch((_) => resolve({ error: "error-create-order-model" }))
    })
  }

  listOrderByPhone (phone:string): Promise<any> {
    const startDate = new Date(`${dateDBQuery}T00:00:00`);
    const endDate = new Date(`${dateDBQuery}T23:59:59`);

    return new Promise((resolve, reject) => {
      ORDER.findOne({ 
        where: { 
          telefone: phone,
          createdAt: {
            [Op.between]: [startDate, endDate]
          }
        } 
      })
        .then((responseModel) => resolve(responseModel))
        .catch((_) => {
          resolve("erro-order-find-by-phone-model")
        })
    })
  }
}

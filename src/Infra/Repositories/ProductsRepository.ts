import { Products } from "../Models/Products";
import { Categories } from "../Models/Categories";
import { Iproduct } from "../Types/product";

export class ProductsRepository {
  async getAllProducts (): Promise<Iproduct[]|string> {
    return new Promise((resolve, reject) => {
      Products.findAll({ include: [{ model: Categories, attributes: { exclude: ["id"] } }]})
        .then((responseDatabase) => {
          if (!responseDatabase) reject(Error())
          resolve(responseDatabase as unknown as Iproduct[])
        }).catch(_ => {
          resolve("error")
        })
    })
  }
}

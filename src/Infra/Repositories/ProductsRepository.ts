import { Products } from "../Models/Products";
import { Categories } from "../Models/Categories";
import { IProduct } from "../Types/product";

export class ProductsRepository {
  async getAllProducts (): Promise<IProduct[]|string> {
    return new Promise((resolve, reject) => {
      Products.findAll({ include: [{ model: Categories, attributes: { exclude: ["id"] } }]})
        .then((responseModel) => {
          if (!responseModel) reject(Error())
          resolve(responseModel as unknown as IProduct[])
        }).catch(_ => {
          resolve("error")
        })
    })
  }

  async createProduct (data: IProduct): Promise<Record<string, string|boolean>> {
    return new Promise((resolve, reject) => {
      Products.create({ ...data })
        .then((_) => (resolve({ secesso: true })))
          .catch((err) => {
            console.error(err)
            resolve({ error:  "error-create-product-model"})
          })
    })
  }
}

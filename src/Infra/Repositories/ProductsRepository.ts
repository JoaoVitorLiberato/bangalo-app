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
          resolve("error-find-products-model")
        })
    })
  }

  async getProductByID (id:string): Promise<IProduct|string> {
    return new Promise((resolve, reject) => {
      Products.findByPk(id, { subQuery: false })
        .then((responseModel) => {
          if (!responseModel) reject(Error())
          resolve(responseModel as unknown as IProduct)
        }).catch(_ => {
          resolve("error-find-specific-model")
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

  async updateProduct (data: IProduct, id: string): Promise<Record<string, string|boolean>> {
    return new Promise((resolve, reject) => {
      Products.update(
        data,
        { where: { id } }
      )
      .then((_) => resolve({ sucesso: true }))
      .catch((_) => resolve({ error: "error-update-product-model" }))
    })
  }

  async deleteProduct (id: string): Promise<Record<string, string|boolean>> {
    return new Promise((resolve, reject) => {
      Products.destroy({ where: { id } })
        .then((_) => resolve({ sucesso: true }))
        .catch((_) => resolve({ error: "error-delete-product-model" }))
    })
  }
}

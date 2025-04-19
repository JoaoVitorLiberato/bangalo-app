import { Categories } from "../Models/Categories"
import { ICategories } from "../Types/Categories"

export class CategoriesRepository {
  getListCategories (): Promise<any> {
    return new Promise((resolve, reject) => {
      Categories.findAll({ limit: 25 })
        .then((responseModel) => {
          if (!responseModel) reject(Error())
          resolve(responseModel)
        }).catch(_ => {
          resolve({ error: "error-find-model" })
        })
    })
  }

  getListCategoriesByID (id:string): Promise<any> {
    return new Promise((resolve, _reject) => {
      Categories.findByPk(id)
        .then((responseModel) => {
          if (responseModel === null) {
            resolve({ error: "category-not-found-model" })
          }

          resolve(responseModel)
        }).catch(_ => {
          resolve({ error: "error-find-specific-model" })
        })
    })
  }

  setCreateCategory (data: ICategories): Promise<any> {
    return new Promise((resolve, _reject) => {
      Categories.create({ ...data })
        .then(_ => {
          resolve({
            codigo: "success"
          })
        })
        .catch(_ => {
          resolve({ error: "error-create-model" })
        })
    })
  }

  setUpdateCategory (data: ICategories, id:string): Promise<any> {
    return new Promise((resolve, _reject) => {
      Categories.findByPk(id)
        .then((responseModel) => {
          if (!responseModel) {
            resolve({ error: "category-not-found-model" })
          }

          Categories.update(
            data,
            { where: { id: id } }
          )
            .then(_ => {
              resolve({
                codigo: "success"
              })
            })
            .catch(_ => {
              resolve({ error: "error-update-model" })
            })
        }).catch(_ => {
          resolve({ error: "error-find-specific-update-model" })
        })
    })
  }
  
  setDeleteCategory (id:string): Promise<any> {
    return new Promise((resolve, _reject) => {
      Categories.findByPk(id)
        .then((responseModel) => {
          if (!responseModel) {
            resolve({ error: "category-not-found-model" })
          }

          Categories.destroy({ where: { id: id } })
            .then(_ => {
              resolve({
                codigo: "success"
              })
            })
            .catch(_ => {
              resolve({ error: "error-delete-model" })
            })
        }).catch(_ => {
          resolve({ error: "error-find-specific-delete-model" })
        })
    })
  }
}

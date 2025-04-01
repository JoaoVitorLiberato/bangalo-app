import { Request, Response } from "express"
import { IncomingForm } from "formidable"
import { ProductsRepository } from "../Repositories/ProductsRepository"
import { upload } from "../Services/StorageService"

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

  create = async (_request: Request, response: Response): Promise<any> => {
    try {
      const { fields, files } = await new Promise<{ fields: any; files?: any }>((resolve) => {
        new IncomingForm().parse(_request, (_, fields, files) => {
          resolve({ fields, files: files ?? null });
        })
      })
    
      const IMAGE = files.image[0] ?? null
      const PRODUCT = JSON.parse(fields.product[0])

      console.log(Object.keys(PRODUCT))
      if (Object.keys(PRODUCT).length === 0) {
        return response.status(400).json({
          messagem: "Os dados do produto é obrigatório.",
          codigo: "void-product-field"
        })
      }

      if (!PRODUCT.url_image  && IMAGE) {
        const responseUpload = await upload(IMAGE)
        if (responseUpload && /^(error-upload-image)$/i.test(String(responseUpload.codigo))) {
          // PRODUCT.url_image = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Fbr%2Ficone-gratis%2Fsem-foto_1695213&psig=AOvVaw2d88D_mQlsqHXYTZrg8IHP&ust=1743455141309000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPiMztTasowDFQAAAAAdAAAAABAI"
          return response.status(400).json({ ...responseUpload })
        }

        PRODUCT.url_image = responseUpload?.path
      }

      const responseRepository = await this.createProduct(PRODUCT)
      if (/^(error-create-product-model)$/i.test(String(responseRepository.error))) throw Error()

      return response.status(201).json({
        messagem: "O produto foi criado com sucesso."
      })
    } catch (_) {
      return response.status(400).json({
        messagem: "Houve um erro ao tentar criar o produto, por favor, tente novamente.",
        codigo: "error-create-product"
      })
    }
  }
}


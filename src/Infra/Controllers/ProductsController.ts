import { Request, Response } from "express"
import { ProductsRepository } from "../Repositories/ProductsRepository"
import { upload } from "../Services/StorageService"
import { processingFormDataHelper } from "../Helpers/ProcessingFormData"
import { IProduct } from "../Types/product"

export class ProductsController extends ProductsRepository {
  list = async (_request: Request, response: Response): Promise<Response> => {
    try {
      const PRODUCTS = await this.getAllProducts()
      if (!PRODUCTS || /^(error-find-products-model)$/i.test(String(PRODUCTS))) throw Error()
      return response.status(200).json(PRODUCTS)
    } catch {
      return response.status(400).json({
        codigo: "error-find-products",
        mensagem: "Houve um erro ao consultar os produtos, por favor, tente novamente.",
      })
    }
  }

  listByID = async (_request: Request, response: Response): Promise<Response> => {
    const { id } = _request.params

    try {
      const PRODUCT = await this.getProductByID(id)
      if (!PRODUCT || /^(error-find-products-model)$/i.test(String(PRODUCT))) throw Error()
      return response.status(200).json(PRODUCT as IProduct)
    } catch {
      return response.status(400).json({
        codigo: "error-find-products",
        mensagem: "Houve um erro ao consultar os produtos, por favor, tente novamente.",
      })
    }
  }

  create = async (_request: Request, response: Response): Promise<any> => {
    try {
      const { fields, files } = await processingFormDataHelper(_request)

      const IMAGE = files.image[0] ?? null
      const PRODUCT: IProduct = JSON.parse(fields.product[0])

      if (Object.keys(PRODUCT).length === 0) {
        return response.status(400).json({
          messagem: "Os dados do produto é obrigatório.",
          codigo: "void-product-field"
        })
      }

      if (!PRODUCT.url_image  && IMAGE) {
        const responseUpload = await upload(IMAGE)
        if (responseUpload && /^(error-upload-image)$/i.test(String(responseUpload.codigo))) {
          return response.status(400).json({ ...responseUpload })
        }

        PRODUCT.url_image = responseUpload?.path as string
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


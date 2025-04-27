import { Request, Response } from "express"
import { ProductsRepository } from "../Repositories/Products.repository"
import { upload } from "../Services/Storage.service"
import { processingFormDataHelper } from "../Helpers/ProcessingFormData.helper"
import { IProduct } from "../Types/Product"

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

  update = async (_request: Request, response: Response): Promise<any> => {
    const { id } = _request.params

    if (!id) {
      return response.status(400).json({
        codigo: "pamaras-user-not-found",
        messagem: "O ID do produto para ser atualizado, está vazio."
      })
    }

    try {
      const PRODUCT_FOUND = await this.getProductByID(id)

      if (!PRODUCT_FOUND) {
        return response.status(404).json({
          codigo: "product-not-found"
        })
      }

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

      const responseRepository = await this.updateProduct(PRODUCT, id)
      if (/^(error-update-product-model)$/i.test(String(responseRepository.error))) throw Error()

      return response.status(201).json({
        messagem: "O produto foi atualizado com sucesso."
      })
    } catch (_) {
      return response.status(400).json({
        messagem: "Houve um erro ao tentar atualizar o produto, por favor, tente novamente.",
        codigo: "error-update-product"
      })
    }
  }

  delete = async (_request: Request, response: Response): Promise<Response> => {
    const { id } = _request.params

    try {
      const PRODUCT_FOUND = await this.getProductByID(id)

      if (!PRODUCT_FOUND) {
        return response.status(404).json({
          codigo: "product-not-found"
        })
      }

      const PRODUCT = await this.deleteProduct(id)
      if (!PRODUCT || /^(error-delete-products-model)$/i.test(String(PRODUCT))) throw Error()

      return response.status(204).json({
        messagem: "O produto que foi deletado com sucesso."
      })
    } catch {
      return response.status(400).json({
        codigo: "error-delete-products",
        mensagem: "Houve um erro ao deletar os produtos, por favor, tente novamente.",
      })
    }
  }
}


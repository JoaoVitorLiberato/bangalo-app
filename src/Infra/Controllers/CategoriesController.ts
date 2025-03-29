import { Request, Response } from "express"
import { CategoriesRepository } from "../Repositories/CategoriesRepository"

export class CategoriesController extends CategoriesRepository {
  list = async (_request: Request, response: Response) => {
    try {
      const responseRepository = await this.getListCategories()
      if (!responseRepository || /^(error-find-model)$/i.test(String(responseRepository.error))) throw Error()
      return response.status(200).json(responseRepository)
    } catch {
      return response.status(400).json({
        codigo: "error-find-categories",
        messagem: "Houve um erro ao listar as categorias, por favor, tente novamente."
      })
    }
  }

  listByID = async (_request: Request, response: Response) => {
    const { id } = _request.params

    try {
      const responseRepository = await this.getListCategoriesByID(id)
      if (!responseRepository || /^(error-find-model)$/i.test(String(responseRepository.error))) throw Error()
      if (/^(category-not-found-model)$/i.test(String(responseRepository.error))) {
        return response.status(404).json({
          codigo: "category-not-found",
          messagem: "Categoria não encontrada."
        })
      }

      return response.status(200).json(responseRepository)
    } catch {
      return response.status(400).json({
        codigo: "error-find-specific-category",
        messagem: "Houve um erro ao buscar categoria especifica, por favor, tente novamente."
      })
    }
  }

  create = async (_request: Request, response: Response) => {
    const { body } = _request
    
    if (!Object.keys(body)[0]) {
      return response.status(400).json({
        codigo: "not-field-name",
        mensagem: "Adicione o nome da propriedade e tente novamente."
      })
    }

    if (!body.name) {
      return response.status(400).json({
        codigo: "field-name-empty",
        mensagem: "A propriedade name está vazia."
      })
    }

    try {
      await this.setCreateCategory(body)
      return response.status(201).json({
        messagem: "Categoria criada com sucesso.",
        sucesso: true
      })
    } catch {
      return response.status(400).json({
        messagem: "Houve um erro ao criar a categoria.",
        codigo: "error-create-category"
      })
    }
  }

  update = async (_request: Request, response: Response) => {
    const { id } = _request.params
    const { body } = _request

    if (!id) {
      return response.status(400).json({
        codigo: "empty-param-id",
        mensagem: "O parametro ID está vazio"
      })
    }
    
    if (!Object.keys(body)[0]) {
      return response.status(400).json({
        codigo: "not-field-name",
        mensagem: "Adicione o nome da propriedade e tente novamente."
      })
    }

    if (!body.name) {
      return response.status(400).json({
        codigo: "field-name-empty",
        mensagem: "A propriedade name está vazia."
      })
    }

    try {
      const responseRepository = await this.setUpdateCategory(body, id)

      if (/^(category-not-found-model)$/i.test(String(responseRepository.error))) {
        return response.status(404).json({
          codigo: "category-not-found",
          messagem: "O id da categoria que você quer atualizar não foi encontrada."
        })
      }

      return response.status(201).json({
        messagem: "Categoria atualizada com sucesso.",
        sucesso: true
      })
    } catch {
      return response.status(400).json({
        messagem: "Houve um erro ao tentar atualizar a categoria.",
        codigo: "error-update-category"
      })
    }
  }

  delete = async (_request: Request, response: Response) => {
    const { id } = _request.params

    try {
      const responseRepository = await this.setDeleteCategory(id)

      if (/^(error-find-specific-delete-model)$/i.test(String(responseRepository.error || ""))) throw Error()
      if (/^(category-not-found-model)$/i.test(String(responseRepository.error || ""))) {
        return response.status(404).json({
          codigo: "category-not-found",
          messagem: "O ID da categoria é invalido"
        })
      }
      
      return response.status(204).json({
        message: "Categoria deletada com sucesso."
      })
    } catch {
      return response.status(400).json({
        codigo: "error-delete-category",
        message: "Houve um erro ao tentar deletar a categoria."
      })
    }
  }
}

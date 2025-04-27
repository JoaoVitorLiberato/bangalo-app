import { Request, Response } from "express"
import { findImage } from "../Services/Storage.service"

export class StorrageAccessController {
  findByPathName = async (_request: Request, response: Response) => {
    if (_request.body && _request.body.pathName) {
      _request.body.pathName = _request.body.pathName.replace("public/storage/", "")
    }

    try {
      await findImage(response, _request.body.pathName)
    } catch {
      return response.status(400).json({
        codigo: "error-find-image",
        messagem: "Houve um erro ao tentar buscar a imagem na storage."
      })
    }
  }
}

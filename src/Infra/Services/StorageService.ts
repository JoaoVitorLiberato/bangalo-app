import axios from "axios"
import { Response } from "express"
import FormData from "form-data"
import { File } from "formidable"
import fs from "fs"


export const storageService = axios.create({
  baseURL: process.env.STORAGE_SERVICE
})

export async function upload (file: File): Promise<Record<string, string|boolean|number>|undefined> {  
  try {
    const UPLOAD = new FormData()
    UPLOAD.append("image", fs.createReadStream(file.filepath), { 
      filename: file.originalFilename as string,
    });


    const RESPONSE_PLUGIN = await storageService.post(`/upload/products`, UPLOAD, {
      headers: {
        "Content-Type": "multipart/form-data;"
      }
    })
    if ("path" in  RESPONSE_PLUGIN.data) return RESPONSE_PLUGIN.data
  } catch {
    return {
      message: "Houve um erro ao tentar fazer o upload.",
      codigo: "error-upload-image",
    }
  }
}

export async function findImage (response: Response, pathImage:string) {
  try {
    const { data } = await storageService.get(`/upload/${pathImage}`, {
      responseType: "stream",
    })
  
    return data.pipe(response)
  } catch {
    return response.status(400).json({
      codigo: "error-service-find-image",
      messagem: "Houve um erro ao tentar buscar a imagem na storage."
    })
  }
}

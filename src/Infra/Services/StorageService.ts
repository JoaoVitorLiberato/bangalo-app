import axios from "axios"
import FormData from "form-data"
import { File } from "formidable"
import fs from "fs"


export const storageService = axios.create({
  baseURL: process.env.STORAGE_SERVICE,
  headers: {
    "Content-Type": "multipart/form-data;"
  }
})

export async function upload (file: File): Promise<Record<string, string|boolean|number>|undefined> {  
  try {
    const UPLOAD = new FormData()
    UPLOAD.append("image", fs.createReadStream(file.filepath), { 
      filename: file.originalFilename as string,
    });


    const RESPONSE_MICROSERVICE = await storageService.post(`/upload/products`, UPLOAD)
    if ("path" in  RESPONSE_MICROSERVICE.data) return RESPONSE_MICROSERVICE.data
  } catch {
    return {
      message: "Houve um erro ao tentar fazer o upload.",
      codigo: "error-upload-image",
    }
  }
}

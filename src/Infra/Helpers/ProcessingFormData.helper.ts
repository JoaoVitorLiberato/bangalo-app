import { Request } from "express";
import { IncomingForm } from "formidable";

export async function processingFormDataHelper (_request: Request): 
  Promise<{ fields: any; files?: any }> {
    return await new Promise((resolve) => {
      new IncomingForm().parse(_request, (_, fields, files) => {
        resolve({ fields, files: files ?? null });
      })
    })
}
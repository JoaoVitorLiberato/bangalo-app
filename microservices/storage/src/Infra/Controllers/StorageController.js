import path from "path"

class StorageController {
  image = (request, response) => {
    const { folder, filename } = request.params
    const filePath = path.join(__dirname, `../../../public/storage/${folder}`, filename)

    return response.sendFile(filePath, (error) => {
      if (error) {
        return response.status(404).json({
          messagem: "Imagem não encontrada!"
        })
      }
    })
  }

  upload = async (request, response) => {
    if (request.file) {
      return response.status(200).json({
        messagem: "Upload realizado com sucesso!",
        nameImage: request.file.filename
      })
    }
  
    return response.status(400).json({
      error: true,
      messagem: `
        Houve um erro ao tentar realizar o upload. Verique se a imagem está correta, caso sim, verifique
        se as extenções das images são permitidas. [ ".jpeg", ".jpg", ".png", ".webp" ]
      `
    })
  }
}

export { StorageController }

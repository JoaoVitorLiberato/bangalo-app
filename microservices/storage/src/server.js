import app from "./app"
import dotenv from "dotenv"

dotenv.config()

app.get("/", (_request, response, _next) => {
  response.send("Storage está online")
})

app.listen(process.env.APPLICATION_STORAGE_PORT, () => {
  console.log(`Storage running at port ${process.env.APPLICATION_STORAGE_PORT}`)
})

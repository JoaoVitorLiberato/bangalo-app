import { Request, Response, NextFunction } from "express"
import dotenv from "dotenv"
import app from "./app"

dotenv.config()

app.use((_request: Request, response: Response, _next: NextFunction) => {
  return response.send("Bangalõ API")
})

app.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
  response.status(500).json(error.message)
})

app.listen(process.env.APPLICATION_PORT, () => {
  console.log(`Server running at port ${process.env.APPLICATION_PORT}`)
})
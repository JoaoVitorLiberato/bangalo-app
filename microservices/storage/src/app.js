import express from "express"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"

import { StorageRouter } from "./Infra/Routers/StorageRouter"

const app = express()

app.use(express.json())
app.use(cors({ origin: process.env.APPLICATION_STORAGE_ACCESS }))
app.use(helmet())
app.use(morgan("tiny"))

app.use("/v1", StorageRouter)

export default app

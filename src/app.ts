import "express-async-errors"
import express from "express"
import cors from "cors"
import morgan from "morgan"
import helmet from "helmet"
import swaggerUi from "swagger-ui-express"

import { connectDatabase } from "./Database"
import { ProductsRouter } from "./Infra/Routes/PorductsRouter"
import { CategoriesRouter } from "./Infra/Routes/CategoriesRouter"
import { swaggerSpec } from "./Documentation"

const app = express()
connectDatabase()


app.use(helmet())
app.use(morgan("combined"))
app.use(express.json())
app.use(
  cors({
    origin: /^(production)$/i.test(String(process.env.NODE_ENV)) ? "https://bangalosushi.app.br" : "http://localhost:8080"
  })
)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/v1", CategoriesRouter)
app.use("/v1", ProductsRouter)

export default app

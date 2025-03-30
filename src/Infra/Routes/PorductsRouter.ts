import express, { Request, Response } from "express"
import { ProductsController } from "../Controllers/ProductsController"

const router = express.Router()
const controller = new ProductsController()

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Retorna a lista de produtos.
 *     responses:
 *       200:
 *         description: Lista com todos produtos no banco de dados.
 *       400:
 *          description: Manda uma propriedade "codigo" = "error-find-products"
*/
router.get("/produtos", (req: Request, res: Response) => { controller.list(req, res) })

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Retorna a lista de produtos.
 *     responses:
 *       200:
 *         description: Lista com todos produtos no banco de dados.
 *       400:
 *          description: Manda uma propriedade "codigo" = "error-find-products"
*/
router.post("/produto", (req: Request, res: Response) => { controller.create(req, res) })

export { router as ProductsRouter }

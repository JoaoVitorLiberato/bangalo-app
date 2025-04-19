import express, { Request, Response } from "express"
import { OrderController } from "../Controllers/OrderController"

const router = express.Router()
const controller = new OrderController()

/**
 * @swagger
 * /pedido:
 *   post:
 *     summary: Retorna a lista de produtos.
 *     content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *           id:
 *             type: integer
 *     responses:
 *       200:
 *         description: Lista com todos produtos no banco de dados.
 *       400:
 *          description: Manda uma propriedade "codigo" = "error-find-products"
*/
router.post("/pedido", (req: Request, res: Response) => { controller.create(req, res) })

export { router as OrderRouter }

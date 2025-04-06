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
 * /produtos/{id}:
 *   get:
 *     summary: Retorna um produto específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Retorna um objeto com um produto específico.
 *       400:
 *          description: Manda uma propriedade "codigo" = "error-find-specific-products"
*/
router.get("/produto/:id", (req: Request, res: Response) => { controller.listByID(req, res) })

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

/**
 * @swagger
 * /produto/{id}:
 *   put:
 *     summary: Atualiza um produto específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Atualiza um produto específico.
 *       400:
 *          description: Manda uma propriedade "codigo" = "error-update-products"
*/
router.put("/produto/:id", (req: Request, res: Response) => { controller.update(req, res) })

/**
 * @swagger
 * /produto/{id}:
 *   put:
 *     summary: Deleta um produto específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleta um produto específico.
 *       400:
 *          description: Manda uma propriedade "codigo" = "error-delete-products"
*/
router.delete("/produto/:id", (req: Request, res: Response) => { controller.delete(req, res) })

export { router as ProductsRouter }

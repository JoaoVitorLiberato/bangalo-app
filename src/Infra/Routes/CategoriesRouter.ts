import express from "express"
import { CategoriesController } from "../Controllers/CategoriesController"

const router = express.Router()
const controller = new CategoriesController()

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Retorna a lista de categorias.
 *     responses:
 *       200:
 *         description: Lista com todoas as categorias no banco de dados.
 *       400:
 *          description: Envia uma propriedade codigo: error-find-cotegories
*/
router.get("/categorias", controller.list)

/**
 * @swagger
 * /categoria/:id:
 *   get:
 *     summary: Retorna uma categoria específica.
 *     responses:
 *       200:
 *         description: Lista uma categoria específica.
 *       400:
 *          description: Envia uma propriedade codigo: error-find-specific-category
*/
router.get("/categoria/:id", controller.listByID)

/**
 * @swagger
 * /categoria:
 *   post:
 *     summary: Cria uma categoria específica
 *     responses:
 *       200:
 *         description: Cria uma categoria específica.
 *       400:
 *          description: Envia uma propriedade codigo: error-create-category
*/
router.post("/categoria", controller.create)

/**
 * @swagger
 * /categoria/:id
 *   put:
 *     summary: Atualiza uma categoria específica
 *     responses:
 *       200:
 *         description: Atualiza uma categoria específica.
 *       400:
 *          description: Envia uma propriedade codigo: error-update-category
*/
router.put("/categoria/:id", controller.update)

/**
 * @swagger
 * /categoria/:id
 *   delete:
 *     summary: Deleta uma categoria específica
 *     responses:
 *       200:
 *         description: Deleta uma categoria específica.
 *       400:
 *          description: Envia uma propriedade codigo: error-delete-category
*/
router.delete("/categoria/:id", controller.delete)


export { router as CategoriesRouter }

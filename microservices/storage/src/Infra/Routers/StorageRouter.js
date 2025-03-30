import express from "express"
import { StorageMiddleware } from "../Middlewares/StorageMiddleware"
import { StorageController } from "../Controllers/StorageController"

const router = express.Router()
const { _storage } = new StorageMiddleware()
const controller = new StorageController()


router.get("/upload/:folder/:filename", controller.image)
router.post("/upload/:folder", _storage.single("image"), controller.upload)

export {
  router as StorageRouter
}

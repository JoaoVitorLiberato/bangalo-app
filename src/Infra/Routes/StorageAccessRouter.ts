import express from "express"
import { StorrageAccessController } from "../Controllers/StrorageAccess.controller"

const router = express.Router()
const controller = new StorrageAccessController()

router.post("/storage", controller.findByPathName)

export {
  router as StorageAccessRouter
}
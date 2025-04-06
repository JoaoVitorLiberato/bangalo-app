import express from "express"
import { StorrageAccessController } from "../Controllers/StrorageAccessController"

const router = express.Router()
const controller = new StorrageAccessController()

router.post("/storage", controller.findByPathName)

export {
  router as StorageAccessRouter
}
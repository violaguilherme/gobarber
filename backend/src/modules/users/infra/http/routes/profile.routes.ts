import { Router } from "express"

import ProfileController from "../controllers/ProfileController"
import ensureAuthenticeted from "../middlewares/ensureAuthenticated"

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.use(ensureAuthenticeted)

profileRouter.get("/", profileController.show)
profileRouter.put("/", profileController.update)

export default profileRouter
import { Router } from "express"

import ensureAuthenticeted from "../../../../users/infra/http/middlewares/ensureAuthenticated"
import ProvidersController from "../controllers/ProvidersController"

const providersRouter = Router()
const providersController = new ProvidersController()

providersRouter.use(ensureAuthenticeted)

providersRouter.get("/", providersController.index)

export default providersRouter
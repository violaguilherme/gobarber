import multer from "multer"
import { Router } from "express"
import { celebrate, Segments, Joi } from "celebrate"

import uploadConfig from "../../../../../config/upload"
import ensureAuthenticeted from "../middlewares/ensureAuthenticated"
import UsersController from "../controllers/UsersController"
import UserAvatarController from "../controllers/UserAvatarController"

const usersRouter = Router()
const usersController = new UsersController()
const userAvatarController = new UserAvatarController()

const upload = multer(uploadConfig.multer)

usersRouter.post("/", celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }
}), usersController.create)

usersRouter.patch("/avatar", ensureAuthenticeted, upload.single("avatar"), userAvatarController.update)

export default usersRouter
import { Router } from "express"
import multer from "multer"

import uploadConfig from "../config/upload"
import ensureAuthenticeted from "../middlewares/ensureAuthenticated"
import CreateUserService from "../services/CreateUserService"
import UpdateUserAvatarService from "../services/UpdateUserAvatarService"

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post("/", async (request, response) => {
    const { name, email, password } = request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({
        name, 
        email, 
        password
    })
    
    // @ts-ignore
    delete user.password    

    return response.json(user)
})

usersRouter.patch("/avatar", ensureAuthenticeted, upload.single("avatar"), async (request, response) => {
    const updateUserAvatar = new UpdateUserAvatarService()

    const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename
    })

    // @ts-ignore
    delete user.password

    return response.json(user)
})

export default usersRouter
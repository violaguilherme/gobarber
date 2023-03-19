import { Router } from "express"
import multer from "multer"

import uploadConfig from "../../../../../config/upload"
import ensureAuthenticeted from "../middlewares/ensureAuthenticated"
import CreateUserService from "../../../services/CreateUserService"
import UpdateUserAvatarService from "../../../services/UpdateUserAvatarService"
import UsersRepository from "../../typeorm/repositories/UsersRepository"

const usersRouter = Router()
const upload = multer(uploadConfig)

usersRouter.post("/", async (request, response) => {
    const { name, email, password } = request.body

    const usersRepository = new UsersRepository()
    const createUser = new CreateUserService(usersRepository)

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
    const usersRepository = new UsersRepository()
    const updateUserAvatar = new UpdateUserAvatarService(usersRepository)

    const user = await updateUserAvatar.execute({
        user_id: request.user.id,
        avatarFileName: request.file.filename
    })

    // @ts-ignore
    delete user.password

    return response.json(user)
})

export default usersRouter
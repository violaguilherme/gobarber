import { Router } from "express"

import AuthenticateUserService from "../../../services/AuthenticateUserService"
import UsersRepository from "../../typeorm/repositories/UsersRepository"

const sessionsRouter = Router()

sessionsRouter.post("/", async (request, response) => {
    const { email, password } = request.body

    const usersRepository = new UsersRepository()
    const authenticatedUser = new AuthenticateUserService(usersRepository)

    const { user, token } = await authenticatedUser.execute({
        email,
        password
    })

    // @ts-ignore
    delete user.password

    return response.json({ user, token })
})

export default sessionsRouter
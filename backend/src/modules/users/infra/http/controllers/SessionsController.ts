import { Request, Response } from "express"
import {  container } from "tsyringe"

import AuthenticateUserService from "../../../services/AuthenticateUserService"

class SessionsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { email, password } = request.body

        const authenticatedUser = container.resolve(AuthenticateUserService)
    
        const { user, token } = await authenticatedUser.execute({
            email,
            password
        })
    
        // @ts-ignore
        delete user.password
    
        return response.json({ user, token })
    }
}

export default SessionsController
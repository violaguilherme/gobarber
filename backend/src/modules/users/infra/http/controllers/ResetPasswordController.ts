import { container } from "tsyringe"
import { Request, Response } from "express"

import ResetPasswordService from "../../../services/ResetPasswordService"

class ResetPasswordController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { password, token } = request.body

        const resetpassword = container.resolve(ResetPasswordService)

        await resetpassword.execute({
            password,
            token
        })

        return response.status(204).json()
    }
}

export default ResetPasswordController
import { Request, Response } from "express"
import { container } from "tsyringe"
import { classToClass } from "class-transformer"

import UpdateUserAvatarService from "../../../services/UpdateUserAvatarService"

class UserAvatarController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateUserAvatar = container.resolve(UpdateUserAvatarService)

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename
        })
    
        return response.json(classToClass(user))
    }
}

export default UserAvatarController
import { getRepository } from "typeorm"
import path from "path"
import fs from "fs"

import User from "../infra/typeorm/entities/User"
import uploadConfig from "../../../config/upload"
import AppError from "../../../shared/errors/AppError"

interface RequestDTO {
    user_id: string
    avatarFileName: string
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFileName }: RequestDTO): Promise<User> {
        const usersRepository = getRepository(User)

        const user = await usersRepository.findOne(user_id)

        if (!user) {
            throw new AppError("Only authenticated users can change avatar", 401)
        }

        if(user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
            const avatarUserFileExists = await fs.promises.stat(userAvatarFilePath)

            if (avatarUserFileExists) {
                await fs.promises.unlink(userAvatarFilePath)
            }
        }

        user.avatar = avatarFileName

        await usersRepository.save(user)

        return user
    }
}

export default UpdateUserAvatarService
import path from "path"
import fs from "fs"

import User from "../infra/typeorm/entities/User"
import uploadConfig from "../../../config/upload"
import AppError from "../../../shared/errors/AppError"
import IUsersRepository from "../repositories/IUsersRepository"

interface IRequestDTO {
    user_id: string
    avatarFileName: string
}

class UpdateUserAvatarService {
    constructor(private usersRepository: IUsersRepository) {}

    public async execute({ user_id, avatarFileName }: IRequestDTO): Promise<User> {
        const user = await this.usersRepository.findById(user_id)

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

        await this.usersRepository.save(user)

        return user
    }
}

export default UpdateUserAvatarService
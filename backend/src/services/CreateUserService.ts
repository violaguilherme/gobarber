import { getRepository } from "typeorm"
import { hash } from "bcryptjs"

import User from "../models/User"
import AppError from "../errors/AppError"

interface RequestDto {
    name: string
    email: string
    password: string
}

class CreateUserService {
    public async execute({ name, email, password }: RequestDto): Promise<User> {
        const usersRepository = getRepository(User)

        const checkIfUserExists = await usersRepository.findOne({
            where: { email }
        })

        if (checkIfUserExists) {
            throw new AppError("Email adress already used")
        }

        const hashedPassword = await hash(password, 8)

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword
        })

        await usersRepository.save(user)

        return user
    }
}

export default CreateUserService
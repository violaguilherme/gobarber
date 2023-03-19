import { hash } from "bcryptjs"

import User from "../infra/typeorm/entities/User"
import AppError from "../../../shared/errors/AppError"
import IUsersRepository from "../repositories/IUsersRepository"

interface IRequestDto {
    name: string
    email: string
    password: string
}

class CreateUserService {
    constructor(private usersRepository: IUsersRepository) {}

    public async execute({ name, email, password }: IRequestDto): Promise<User> {
        const checkIfUserExists = await this.usersRepository.findByEmail(email)

        if (checkIfUserExists) {
            throw new AppError("Email adress already used")
        }

        const hashedPassword = await hash(password, 8)

        const user = this.usersRepository.create({
            name,
            email,
            password: hashedPassword
        })

        return user
    }
}

export default CreateUserService
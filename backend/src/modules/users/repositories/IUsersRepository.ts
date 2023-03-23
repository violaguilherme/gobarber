import ICreateUserDTO from "../dtos/ICreateUserDTO"
import IFindAllProviders from "../dtos/IFindAllProvidersDTO"
import User from "../infra/typeorm/entities/User"

interface IUsersRepository {
    findAllProviders(data : IFindAllProviders): Promise<User[]>
    findById(id: string): Promise<User | undefined>
    findByEmail(email: string): Promise<User | undefined>
    create(data : ICreateUserDTO): Promise<User>
    save(user: User): Promise<User>
}

export default IUsersRepository
import "reflect-metadata";

import FakeUsersRepository from "../../users/repositories/fakes/FakeUsersRepository";
import ListProvidersService from "./ListProvidersService";

let fakeUsersRepository: FakeUsersRepository
let listProviders: ListProvidersService

describe("ListProviders", () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        listProviders = new ListProvidersService(fakeUsersRepository)
    })

    it("should be able to list all providers", async () => {
        const user1 = await fakeUsersRepository.create({
            name: "John Doe",
            email: "johndoe@hotmail.com",
            password: "123456"
        })

        const user2 = await fakeUsersRepository.create({
            name: "John Doe2",
            email: "johndoe2@hotmail.com",
            password: "123456"
        })

        const loggedUser = await fakeUsersRepository.create({
            name: "John Doe3",
            email: "johndoe3@hotmail.com",
            password: "123456"
        })

        const providers = await listProviders.execute({
            user_id: loggedUser.id,
        })

        expect(providers).toEqual([
            user1,
            user2
        ])
    })
})

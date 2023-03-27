import "reflect-metadata";
import FakeCacheProvider from "../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider";

import FakeUsersRepository from "../../users/repositories/fakes/FakeUsersRepository";
import ListProvidersService from "./ListProvidersService";

let fakeUsersRepository: FakeUsersRepository
let listProviders: ListProvidersService
let fakeCacheProvider: FakeCacheProvider

describe("ListProviders", () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        fakeCacheProvider = new FakeCacheProvider()
        listProviders = new ListProvidersService(fakeUsersRepository, fakeCacheProvider)
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

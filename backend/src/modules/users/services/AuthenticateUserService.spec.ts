import "reflect-metadata";

import CreateUserService from "./CreateUserService";
import AuthenticateUserService from "./AuthenticateUserService";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import AppError from "../../../shared/errors/AppError";
import FakeCacheProvider from "../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider";

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let createUser: CreateUserService
let authenticateUser: AuthenticateUserService
let fakeCacheProvider: FakeCacheProvider

describe("AuthenticateUser", () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        fakeHashProvider = new FakeHashProvider()
        fakeCacheProvider = new FakeCacheProvider()
        createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider, fakeCacheProvider)
        authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider)
        
    })

    it("should be able to authenticate the user", async () => {
        const user = await createUser.execute({
            name: "John Doe",
            email: "johndoe@hotmail.com",
            password: "123456"
        })
        
        const response = await authenticateUser.execute({
            email: "johndoe@hotmail.com",
            password: "123456"
        })

        expect(response).toHaveProperty("token")
        expect(response.user).toEqual(user)
    })

    it("should not be able to authenticate non existing user", async () => {
        expect(authenticateUser.execute({
            email: "johndoe@hotmail.com",
            password: "123456"
        })).rejects.toBeInstanceOf(AppError)
    })

    it("should be able to authenticate with wrong password", async () => {
        await createUser.execute({
            name: "John Doe",
            email: "johndoe@hotmail.com",
            password: "123456"
        })

        await expect(authenticateUser.execute({
            email: "johndoe@hotmail.com",
            password: "wrong-password"
        })).rejects.toBeInstanceOf(AppError)
    })
})

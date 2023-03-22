import "reflect-metadata";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import UpdateProfileService from "./UpdateProfileService";
import AppError from "../../../shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository
let fakehashProvider: FakeHashProvider
let updateProfile: UpdateProfileService

describe("UpdateProfile", () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        fakehashProvider = new FakeHashProvider()
        updateProfile = new UpdateProfileService(fakeUsersRepository, fakehashProvider)
    })

    it("should be able to update user's profile", async () => {
        const user = await fakeUsersRepository.create({
            name: "John Doe",
            email: "johndoe@hotmail.com",
            password: "123456"
        })

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: "John Doe2",
            email: "johndoe2@hotmail.com"
        })

        expect(updatedUser.name).toBe("John Doe2")
        expect(updatedUser.email).toBe("johndoe2@hotmail.com")
    })

    
    it("should not be able to update user's profile from non-existing user", async () => {

        await expect(updateProfile.execute({
            user_id: "non-existing-user_id",
            name: "Test",
            email: "test@test.com"
        })).rejects.toBeInstanceOf(AppError)
    })

    it("should not be able to change your email to an existing one", async () => {
        await fakeUsersRepository.create({
            name: "John Doe",
            email: "johndoe@hotmail.com",
            password: "123456"
        })

        const user = await fakeUsersRepository.create({
            name: "Test",
            email: "test@hotmail.com",
            password: "123456"
        })

        await expect(updateProfile.execute({
            user_id: user.id,
            name: "Jhon Doe",
            email: "johndoe@hotmail.com",
        })).rejects.toBeInstanceOf(AppError)
    })

    it("should be able to update the password", async () => {
        const user = await fakeUsersRepository.create({
            name: "John Doe",
            email: "johndoe@hotmail.com",
            password: "123456"
        })

        const updatedUser = await updateProfile.execute({
            user_id: user.id,
            name: "John Doe2",
            email: "johndoe2@hotmail.com",
            old_password: "123456",
            password: "1234567"
        })

        expect(updatedUser.password).toBe("1234567")
    })

    it("should not be able to update the password without passing the old one", async () => {
        const user = await fakeUsersRepository.create({
            name: "John Doe",
            email: "johndoe@hotmail.com",
            password: "123456"
        })

        await expect(updateProfile.execute({
            user_id: user.id,
            name: "John Doe2",
            email: "johndoe2@hotmail.com",
            password: "1234567"
        })).rejects.toBeInstanceOf(AppError)
    })

    it("should not be able to update the password with wrong old one", async () => {
        const user = await fakeUsersRepository.create({
            name: "John Doe",
            email: "johndoe@hotmail.com",
            password: "123456"
        })

        await expect(updateProfile.execute({
            user_id: user.id,
            name: "John Doe2",
            email: "johndoe2@hotmail.com",
            old_password: "wrong-old-password",
            password: "1234567"
        })).rejects.toBeInstanceOf(AppError)
    })
})

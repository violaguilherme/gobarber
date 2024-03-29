import "reflect-metadata";
import AppError from "../../../shared/errors/AppError";

import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import ShowProfileService from "./ShowProfileService";

let fakeUsersRepository: FakeUsersRepository
let showProfile: ShowProfileService

describe("ShowProfile", () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        showProfile = new ShowProfileService(fakeUsersRepository)
    })

    it("should be able show user's profile", async () => {
        const user = await fakeUsersRepository.create({
            name: "John Doe",
            email: "johndoe@hotmail.com",
            password: "123456"
        })

        const profile = await showProfile.execute({
            user_id: user.id,
        })

        expect(profile.name).toBe("John Doe")
        expect(profile.email).toBe("johndoe@hotmail.com")
    })

    it("should not be able to show user's profile from an non-existing user", async () => {

        await expect(showProfile.execute({
            user_id: "non-existing-user_id",
        })).rejects.toBeInstanceOf(AppError)
    })
})

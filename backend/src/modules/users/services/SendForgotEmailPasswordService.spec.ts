import "reflect-metadata";

import FakeMailProvider from "../../../shared/container/providers/MailProvider/fakes/FakeMailProvider";
import AppError from "../../../shared/errors/AppError";
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeUserTokensRepository from "../repositories/fakes/FakeUserTokensRepository";
import SendForgotPasswordEmailService from "./SendForgotPasswordEmailService";

let fakeUsersRepository: FakeUsersRepository
let fakeUserTokensRepository: FakeUserTokensRepository
let fakeMailProvider: FakeMailProvider
let sendForgotPasswordEmail: SendForgotPasswordEmailService

describe("SendForgotEmailPassword", () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository()
        fakeMailProvider = new FakeMailProvider()
        fakeUserTokensRepository = new FakeUserTokensRepository()

        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository, 
            fakeMailProvider,
            fakeUserTokensRepository
        )
    })

    it("should be able to send an email to change the user's password", async () => {
        const sendMail = jest.spyOn(fakeMailProvider, "sendMail")
            
        await fakeUsersRepository.create({
            name: "John Doe",
            email: "johndoe@hotmail.com",
            password: "123456"
        })

        await sendForgotPasswordEmail.execute({
            email: "johndoe@hotmail.com",
        })

        expect(sendMail).toHaveBeenCalled()
    })

    it("should not be able to recover a non-existing user password", async () => {
        
        await expect(sendForgotPasswordEmail.execute({
            email: "johndoe@hotmail.com",
        })).rejects.toBeInstanceOf(AppError)
    })

    it("should generate a forgot password token", async () => {
        const generateToken = jest.spyOn(fakeUserTokensRepository, "generate")
        
        const user = await fakeUsersRepository.create({
            name: "John Doe",
            email: "johndoe@hotmail.com",
            password: "123456"
        })
    
        await sendForgotPasswordEmail.execute({
            email: "johndoe@hotmail.com",
        })

        expect(generateToken).toHaveBeenCalledWith(user.id)
    })
})

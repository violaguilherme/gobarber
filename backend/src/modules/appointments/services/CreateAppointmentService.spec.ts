import "reflect-metadata";

import AppError from "../../../shared/errors/AppError";
import CreateAppointmentService from "./CreateAppointmentService";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import FakeNotificationsRepository from "../../notifications/repositories/fakes/FakeNotificationsRepository";

let fakeAppointmentsRepository: FakeAppointmentsRepository
let fakeNotificationsRepository: FakeNotificationsRepository
let createAppointment: CreateAppointmentService

describe("CreateAppointment", () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository()
        fakeNotificationsRepository = new FakeNotificationsRepository()
        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository, 
            fakeNotificationsRepository
        )
    })

    it("should be able to create a new appointment", async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository()
        const createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
            fakeNotificationsRepository
        )

        jest.spyOn(Date, "now").mockImplementationOnce(() => {
            return new Date(2023, 2, 23, 12).getTime()
        })

        const appointment = await createAppointment.execute({
            date: new Date(2023, 2, 23, 14),
            user_id: "123",
            provider_id: "123456"
        })

        expect(appointment).toHaveProperty("id")
        expect(appointment.provider_id).toBe("123456")
    })

    it("should not be able to create two appointments in the same date", async () => {
        const appointmentDate = new Date(2023, 2, 31, 10)

        await createAppointment.execute({
            date: appointmentDate,
            user_id: "123",
            provider_id: "123456"
        })

        await expect(createAppointment.execute({
            date: appointmentDate,
            user_id: "123",
            provider_id: "123456"
        })).rejects.toBeInstanceOf(AppError)
    })

    it("should not be able to create an appointment on a past date", async () => {
        jest.spyOn(Date, "now").mockImplementationOnce(() => {
            return new Date(2023, 2, 23, 12).getTime()
        })

        await expect(createAppointment.execute({
            date: new Date(2023, 2, 23, 10),
            user_id: "123",
            provider_id: "123456"
        })).rejects.toBeInstanceOf(AppError)
    }) 

    it("should not be able to create an appointment with same user as provider", async () => {
        jest.spyOn(Date, "now").mockImplementationOnce(() => {
            return new Date(2023, 2, 23, 12).getTime()
        })

        await expect(createAppointment.execute({
            date: new Date(2023, 2, 23, 14),
            user_id: "user_id",
            provider_id: "user_id"
        })).rejects.toBeInstanceOf(AppError)
    }) 

    it("should not be able to create an appointment before 8am and after 5pm", async () => {
        jest.spyOn(Date, "now").mockImplementationOnce(() => {
            return new Date(2023, 2, 23, 12).getTime()
        })

        await expect(createAppointment.execute({
            date: new Date(2023, 2, 24, 7),
            user_id: "user_id",
            provider_id: "provider_id"
        })).rejects.toBeInstanceOf(AppError)

        await expect(createAppointment.execute({
            date: new Date(2023, 2, 24, 18),
            user_id: "user_id",
            provider_id: "provider_id"
        })).rejects.toBeInstanceOf(AppError)
    })  
})

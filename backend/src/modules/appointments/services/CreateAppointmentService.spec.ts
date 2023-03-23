import "reflect-metadata";

import CreateAppointmentService from "./CreateAppointmentService";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import AppError from "../../../shared/errors/AppError";

let fakeAppointmentsRepository: FakeAppointmentsRepository
let createAppointment: CreateAppointmentService

describe("CreateAppointment", () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository()
        createAppointment = new CreateAppointmentService(fakeAppointmentsRepository)
    })

    it("should be able to create a new appointment", async () => {
        const fakeAppointmentsRepository = new FakeAppointmentsRepository()
        const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository)

        const appointment = await createAppointment.execute({
            date: new Date(),
            user_id: "123",
            provider_id: "123456"
        })

        expect(appointment).toHaveProperty("id")
        expect(appointment.provider_id).toBe("123456")
    })

    it("should not be able to create two appointments in the same date", async () => {
        const appointmentDate = new Date()

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
})

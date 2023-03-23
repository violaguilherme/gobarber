import "reflect-metadata";

import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import ListProviderDayAvailabilityService from "./ListProviderDayAvailabilityService";

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderDayAvailability: ListProviderDayAvailabilityService

describe("ListProviderDayAvailability", () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository()
        listProviderDayAvailability = new ListProviderDayAvailabilityService(fakeAppointmentsRepository)
    })

    it("should be able to list all providers available in a day", async () => {
       await fakeAppointmentsRepository.create({
            provider_id: "user",
            date: new Date(2023, 2, 23, 8, 0, 0)
        })

       await fakeAppointmentsRepository.create({
            provider_id: "user",
            date: new Date(2023, 2, 23, 10, 0, 0)
        })
  
       const availablility = await listProviderDayAvailability.execute({
            provider_id: "user",
            day: 23,
            year: 2023,
            month: 3
        })

       expect(availablility).toEqual(expect.arrayContaining([
            { hour: 8, available: false },
            { hour: 9, available: true },
            { hour: 10, available: false },
            { hour: 11, available: true },

       ]))
    })
})

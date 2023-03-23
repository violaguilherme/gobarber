import "reflect-metadata";

import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import ListProviderMonthAvailabilityService from "./ListProviderMonthAvailabilityService";

let fakeAppointmentsRepository: FakeAppointmentsRepository
let listProviderMonthAvailability: ListProviderMonthAvailabilityService

describe("ListProviderMonthAvailability", () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository()
        listProviderMonthAvailability = new ListProviderMonthAvailabilityService(fakeAppointmentsRepository)
    })

    it("should be able to list all providers", async () => {
       await fakeAppointmentsRepository.create({
            provider_id: "user",
            date: new Date(2023, 4, 23, 11, 0, 0)
        })

       await fakeAppointmentsRepository.create({
            provider_id: "user",
            date: new Date(2023, 2, 23, 11, 0, 0)
        })
       
       await fakeAppointmentsRepository.create({
            provider_id: "user",
            date: new Date(2023, 2, 23, 15, 0, 0)
        })
              
       await fakeAppointmentsRepository.create({
            provider_id: "user",
            date: new Date(2023, 2, 24, 11, 0, 0)
        })
       
       const availablility = await listProviderMonthAvailability.execute({
            provider_id: "user",
            year: 2023,
            month: 3
        })

       expect(availablility).toEqual(expect.arrayContaining([
            { day: 23, available: false },
            { day: 24, available: false },
            { day: 22, available: true },
            { day: 25, available: true }
       ]))
    })
})

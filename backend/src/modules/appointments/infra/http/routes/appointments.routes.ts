import { Router } from "express"
import { parseISO } from "date-fns"

import AppointmentsRepository from "../../typeorm/repositories/AppointmentsRepository"
import CreateAppointmentService from "../../../services/CreateAppointmentService"
import ensureAuthenticeted from "../../../../users/infra/http/middlewares/ensureAuthenticated"

const appointmentsRouter = Router()

appointmentsRouter.use(ensureAuthenticeted)

// appointmentsRouter.get("/", async (request, response) => {
//     const appointments = await appoitmentsRepository.find()

//     return response.json(appointments)
// })

appointmentsRouter.post("/", async (request, response) => {
    const { provider_id, date } = request.body

    const parsedDate = parseISO(date)
    
    const appoitmentsRepository = new AppointmentsRepository()
    const createAppointment = new CreateAppointmentService(appoitmentsRepository)

    const appointment = await createAppointment.execute({
        provider_id,
        date: parsedDate
    })

    return response.json(appointment)
})

export default appointmentsRouter
import { Router } from "express"

import ensureAuthenticeted from "../../../../users/infra/http/middlewares/ensureAuthenticated"
import AppointmentsController from "../controllers/AppointmentsController"
import ProviderAppointmentsController from "../controllers/ProviderAppointmentsController"

const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()
const providerAppointmentsController = new ProviderAppointmentsController()

appointmentsRouter.use(ensureAuthenticeted)

// appointmentsRouter.get("/", async (request, response) => {
//     const appointments = await appoitmentsRepository.find()

//     return response.json(appointments)
// })

appointmentsRouter.post("/", appointmentsController.create)
appointmentsRouter.get("/me", providerAppointmentsController.index)

export default appointmentsRouter
import { Router } from "express"

import ensureAuthenticeted from "../../../../users/infra/http/middlewares/ensureAuthenticated"
import AppointmentsController from "../controllers/AppointmentsController"

const appointmentsRouter = Router()
const appointmentsController = new AppointmentsController()

appointmentsRouter.use(ensureAuthenticeted)

// appointmentsRouter.get("/", async (request, response) => {
//     const appointments = await appoitmentsRepository.find()

//     return response.json(appointments)
// })

appointmentsRouter.post("/", appointmentsController.create)

export default appointmentsRouter
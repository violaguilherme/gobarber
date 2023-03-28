import { classToClass } from "class-transformer"
import { Request, Response } from "express"
import { container } from "tsyringe"

import ListProviderAppointmentsService from "../../../services/ListProviderAppointmentsService"

class ProviderAppointmentsController {
    public async index(request: Request, response: Response): Promise<Response> {
        const provider_id = request.user.id
        const { day, month, year } = request.query
        
        const listproviderAppointments = container.resolve(ListProviderAppointmentsService)

        const appointments = await listproviderAppointments.execute({
            provider_id,
            day: Number(day),
            month: Number(month),
            year: Number(year)
        })

        return response.json(classToClass(appointments))
    }

}

export default ProviderAppointmentsController
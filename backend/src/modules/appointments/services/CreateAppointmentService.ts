import { startOfHour } from "date-fns";

import AppError from "../../../shared/errors/AppError";
import Appointment from "../infra/typeorm/entities/Appointment";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

interface IRequestDTO {
    provider_id: string
    date: Date
}

class CreateAppointmentService {
    constructor(private appointmentsRepository: IAppointmentsRepository) {}

    public async execute({ provider_id, date }: IRequestDTO): Promise<Appointment> {
        const appointmentDate = startOfHour(date)

        const findAppointmentsInSameDate = await this.appointmentsRepository.findByDate(appointmentDate)
    
        if(findAppointmentsInSameDate) {
            throw new AppError("This Appointment is already booked")
        }
    
        const appointment = await this.appointmentsRepository.create({
            provider_id,
            date: appointmentDate
        })

        return appointment
    }
}

export default CreateAppointmentService
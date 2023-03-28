import { format, getHours, isBefore, startOfHour } from "date-fns";
import { injectable, inject } from "tsyringe";
import ICacheProvider from "../../../shared/container/providers/CacheProvider/models/ICacheProvider";

import AppError from "../../../shared/errors/AppError";
import INotificationsRepository from "../../notifications/repositories/INotificationsRepository";
import Appointment from "../infra/typeorm/entities/Appointment";
import IAppointmentsRepository from "../repositories/IAppointmentsRepository";

interface IRequestDTO {
    provider_id: string
    user_id: string
    date: Date
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject("AppointmentsRepository") 
        private appointmentsRepository: IAppointmentsRepository,

        @inject("NotificationsRepository")
        private notificationsRepository: INotificationsRepository,

        @inject("CacheProvider")
        private cacheProvider: ICacheProvider
    ) {}

    public async execute({ provider_id, user_id, date }: IRequestDTO): Promise<Appointment> {
        const appointmentDate = startOfHour(date)

        if(isBefore(appointmentDate, Date.now())) {
            throw new AppError("You can't make an appointment on a past date")
        }

        if(user_id === provider_id) {
            throw new AppError("You can't create an appointment with yourself")
        }

        if(getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
            throw new AppError("You can only create an appointment between 8am and 5pm")
        }

        const findAppointmentsInSameDate = await this.appointmentsRepository.findByDate(
            appointmentDate,
            provider_id
        )
    
        if(findAppointmentsInSameDate) {
            throw new AppError("This Appointment is already booked")
        }
    
        const appointment = await this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: appointmentDate
        })

        const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'")

        await this.notificationsRepository.create({
            recipient_id: provider_id,
            content: `Novo agendamento com para dia ${dateFormatted}`
        })

        await this.cacheProvider.invalidate(
            `provider-appointments:${provider_id}:${format(appointmentDate, "yyyy-M-d")}`
        )

        return appointment
    }
}

export default CreateAppointmentService
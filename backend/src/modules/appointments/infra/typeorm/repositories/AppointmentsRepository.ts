import { getRepository, Raw, Repository } from "typeorm";

import Appointment from "../entities/Appointment";

import IAppointmentsRepository from "../../../repositories/IAppointmentsRepository";
import ICreateAppointmentDTO from "../../../dtos/ICreateAppointmentDTO";
import IFindAllInMonthFromProviderDTO from "../../../dtos/IFindAllInMonthFromProviderDTO";
import IFindAllInDayFromProviderDTO from "../../../dtos/IfindAllInDayFromProviderDTO";

class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment> 

    constructor() {
        this.ormRepository = getRepository(Appointment)
    }

    public async findByDate(date: Date, provider_id: string): Promise<Appointment | undefined> {
        const findAppointment = await this.ormRepository.findOne({
            where: { date, provider_id }
        })

        return findAppointment
    }

    public async findAllInMonthFromProvider({ 
        provider_id, 
        month, 
        year 
    }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
        const parsedMonth = String(month).padStart(2, "0")

        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    dateFieldName =>
                    `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
                ),
            },
        });

        return appointments
    }
    public async findAllInDayFromProvider({ 
        provider_id, 
        day,
        month, 
        year 
    }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
        const parsedDay = String(day).padStart(2, "0")
        const parsedMonth = String(month).padStart(2, "0")

        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    dateFieldName =>
                    `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
                ),
            },
            relations: ["user"],
        });

        return appointments
    }

    public async create({ provider_id, user_id, date }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({ provider_id, user_id, date })

        await this.ormRepository.save(appointment)

        return appointment
    }
}

export default AppointmentsRepository
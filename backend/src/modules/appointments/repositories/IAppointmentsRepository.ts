import IFindAllInDayFromProviderDTO from "../dtos/findAllInDayFromProvider";
import ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO";
import IFindAllInMonthFromProviderDTO from "../dtos/IFindAllInMonthFromProviderDTO";
import Appointment from "../infra/typeorm/entities/Appointment";

interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>
    findByDate(date: Date): Promise<Appointment | undefined>
    findAllInMonthFromProvider(data: IFindAllInMonthFromProviderDTO): Promise<Appointment[]>
    findAllInDayFromProvider(data: IFindAllInDayFromProviderDTO): Promise<Appointment[]>
}

export default IAppointmentsRepository
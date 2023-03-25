import ICreateNotificationsDTO from "../dtos/ICreateNotificationsDTO"
import Notification from "../infra/typeorm/schemas/Notification"

interface INotificationsRepository {
    create(data: ICreateNotificationsDTO): Promise<Notification>
}

export default INotificationsRepository
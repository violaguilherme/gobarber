import { getMongoRepository, MongoRepository } from "typeorm";

import ICreateNotificationsDTO from "../../../dtos/ICreateNotificationsDTO";
import INotificationsRepository from "../../../repositories/INotificationsRepository";
import Notification from "../schemas/Notification";

class NotificationsRepository implements INotificationsRepository {
    private ormRepository: MongoRepository<Notification>

    constructor() {
        this.ormRepository = getMongoRepository(Notification, "mongo")
    }

    public async create({ recipient_id, content }: ICreateNotificationsDTO): Promise<Notification> {
        const notification = this.ormRepository.create({ recipient_id, content })

        await this.ormRepository.save(notification)

        return notification
    }
}

export default NotificationsRepository
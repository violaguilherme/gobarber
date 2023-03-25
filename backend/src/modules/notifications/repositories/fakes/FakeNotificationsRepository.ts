import { ObjectID } from "mongodb";

import ICreateNotificationsDTO from "../../dtos/ICreateNotificationsDTO";
import INotificationsRepository from "../INotificationsRepository";
import Notification from "../../infra/typeorm/schemas/Notification";

class FakeNotificationsRepository implements INotificationsRepository {
    private notifications: Notification[] = []

    public async create({ recipient_id, content }: ICreateNotificationsDTO): Promise<Notification> {
        const notification = new Notification()

        Object.assign(notification, { id: new ObjectID, recipient_id, content })

        this.notifications.push(notification)

        return notification
    }
}

export default FakeNotificationsRepository
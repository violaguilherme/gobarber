import { Column, CreateDateColumn, Entity, Generated, UpdateDateColumn } from "typeorm"

@Entity("user_tokens")
class UserToken {

    @Column()
    @Generated("uuid")
    token: string

    @Column()
    user_id: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

export default UserToken
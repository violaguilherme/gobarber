import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddUserIdToAppointments1679600642694 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn("appointments", new TableColumn({
            name: "user_id",
            type: "uuid",
            isNullable: true
        }))

        await queryRunner.createForeignKey("appointments", new TableForeignKey({
            name: "AppointmentUser",
            columnNames: ["user_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "SET NULL",
            onUpdate: "CASCADE"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey("appointments", "AppointmentUser")

        await queryRunner.dropColumn("appointments", "user_id")
    }

}

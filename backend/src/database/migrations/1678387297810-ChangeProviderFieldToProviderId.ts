import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class ChangeProviderFieldToProviderId1678387297810 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn("appointments", "provider")

        await queryRunner.addColumn("appointments", new TableColumn({
            name: "provider_id",
            type: "uuid",
            isNullable: true
        }))

        await queryRunner.createForeignKey("appointments", new TableForeignKey({
            name: "appointmentProvider",
            columnNames: ["provider_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "users",
            onDelete: "SET NULL",
            onUpdate: "CASCADE"
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropForeignKey("appointments", "appointmentProvider")

        await queryRunner.dropColumn("appointments", "provider_id")

        await queryRunner.addColumn("appointments", new TableColumn({
            name: "provider",
            type: "varchar",
        }))
    }

}

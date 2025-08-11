import {MigrationInterface, QueryRunner} from "typeorm";

export class DeleteColunmMaintenanceFeeder1667589157876 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `maintenance_feeder` DROP FOREIGN KEY `FK_7b817060fb6b10f719c767ee7f3`");
        await queryRunner.dropColumn("maintenance_feeder", "id_action")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `maintenance_feeder` DROP FOREIGN KEY `FK_7b817060fb6b10f719c767ee7f3`");
        await queryRunner.dropColumn("maintenance_feeder", "id_action")
    }

}

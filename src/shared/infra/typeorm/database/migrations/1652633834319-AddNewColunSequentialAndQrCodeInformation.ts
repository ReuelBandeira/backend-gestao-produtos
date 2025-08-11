import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddNewColunSequentialAndQrCodeInformation1652633834319 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumns('smt_material_manager_setup', [
        new TableColumn({
          name: 'sequential',
          type: 'varchar(50)',
        }),
        new TableColumn({
          name: 'qr_code_information',
          type: 'varchar(250 )',
        }),
      ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumns('smt_material_manager_setup', [
        new TableColumn({
          name: 'sequential',
          type: 'varchar(50)',
        }),
        new TableColumn({
          name: 'qr_code_information',
          type: 'varchar(250 )',
        }),
      ]);
    }

}

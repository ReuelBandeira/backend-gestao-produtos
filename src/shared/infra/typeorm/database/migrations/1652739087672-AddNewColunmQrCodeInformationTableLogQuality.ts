import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddNewColunmQrCodeInformationTableLogQuality1652739087672 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('log_quality', [
      new TableColumn({
        name: 'qr_code_information',
        type: 'varchar(250 )',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('log_quality', [
      new TableColumn({
        name: 'qr_code_information',
        type: 'varchar(250 )',
      }),
    ]);
  }

}

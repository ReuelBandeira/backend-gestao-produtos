import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddNewColunmQrCodeInformationTableSMTQualityBody1652739318775 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('smt_quality_body', [
      new TableColumn({
        name: 'qr_code_information',
        type: 'varchar(250 )',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('smt_quality_body', [
      new TableColumn({
        name: 'qr_code_information',
        type: 'varchar(250 )',
      }),
    ]);
  }

}

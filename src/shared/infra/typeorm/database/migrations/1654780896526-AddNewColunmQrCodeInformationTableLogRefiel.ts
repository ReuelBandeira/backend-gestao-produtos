import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddNewColunmQrCodeInformationTableLogRefiel1654780896526 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('log_refil', [
      new TableColumn({
        name: 'qr_code_information_old',
        type: 'varchar(250 )',
      }),
      new TableColumn({
        name: 'qr_code_information_new',
        type: 'varchar(250 )',
      }),
    ]);
  }



  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('log_refil', [
      new TableColumn({
        name: 'qr_code_information_old',
        type: 'varchar(250 )',
      }),
      new TableColumn({
        name: 'qr_code_information_new',
        type: 'varchar(250 )',
      }),
    ]);
  }

}


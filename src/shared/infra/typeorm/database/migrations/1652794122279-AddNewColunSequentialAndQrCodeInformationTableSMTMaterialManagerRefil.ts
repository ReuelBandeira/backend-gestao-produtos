import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddNewColunSequentialAndQrCodeInformationTableSMTMaterialManagerRefil1652794122279 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('smt_material_manager_refil', [
      new TableColumn({
        name: 'sequential_old',
        type: 'varchar(50)',
      }),
      new TableColumn({
        name: 'qr_code_information_old',
        type: 'varchar(250 )',
      }),
      new TableColumn({
        name: 'sequential_new',
        type: 'varchar(50)',
      }),
      new TableColumn({
        name: 'qr_code_information_new',
        type: 'varchar(250 )',
      }),
    ]);
  }



  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('smt_material_manager_refil', [
      new TableColumn({
        name: 'sequential_old',
        type: 'varchar(50)',
      }),
      new TableColumn({
        name: 'qr_code_information_old',
        type: 'varchar(250 )',
      }),
      new TableColumn({
        name: 'sequential_new',
        type: 'varchar(50)',
      }),
      new TableColumn({
        name: 'qr_code_information_new',
        type: 'varchar(250 )',
      }),
    ]);
  }

}

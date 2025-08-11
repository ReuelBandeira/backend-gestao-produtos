import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterColumnToUpdateStatusSmtMaterialManager1642092117702 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'smt_material_manager',
      'status',
      new TableColumn({
        name: 'status',
        type: 'varchar(50)',
        default: '"available"',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'smt_material_manager',
      'status',
      new TableColumn({
        name: 'status',
        type: 'varchar(50)',
        default: '"available"',
      }),
    );
  }

}

import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnOvenProfileInSmtMaterialManager1685022709026 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'smt_material_manager',
      new TableColumn({
        name: 'oven_profile',
        type: 'varchar(200)',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      'smt_material_manager',
      new TableColumn({
        name: 'oven_profile',
        type: 'varchar(200)',
        isNullable: true,
      })
    );
  }

}

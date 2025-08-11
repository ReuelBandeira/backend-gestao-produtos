import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddNewColumnVersionSTMMaterialManagerTable1623943170509
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'smt_material_manager',
      new TableColumn({
        name: 'version',
        type: 'int(11)',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('smt_material_manager', 'version');
  }
}

import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddNewColumnSideSetup1624025331963 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'smt_material_manager_setup',
      new TableColumn({
        name: 'side',
        type: 'int(1)',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('smt_material_manager', 'side');
  }
}

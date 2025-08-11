import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableSmtMaterialManager1623849468612
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'smt_material_manager',
      new TableColumn({
        name: 'quantity',
        type: 'int(11)',
      }),
    );

    await queryRunner.renameColumn(
      'smt_material_manager',
      'qty_slots',
      'position',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      'smt_material_manager',
      'position',
      'qty_slots',
    );
    await queryRunner.dropColumn('smt_material_manager', 'quantity');
  }
}

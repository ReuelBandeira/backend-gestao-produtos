import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddNewColumnTrayModuleLocationSMTMaterialManager1625361859547
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'smt_material_manager',
      new TableColumn({
        name: 'tray_module_position',
        type: 'char(1)',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      'smt_material_manager',
      'tray_module_position',
    );
  }
}

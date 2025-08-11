import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddNewColumnTrayModuleLocation1625347474005
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tmp_machines',
      new TableColumn({
        name: 'tray_module_position',
        type: 'char(1)',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tmp_machines', 'tray_module_position');
  }
}

import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddAlterTypeSideSMTMAterialManager1623957718406
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'smt_material_manager',
      'side',
      new TableColumn({
        name: 'side',
        type: 'int(2)',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'smt_material_manager',
      'side',
      new TableColumn({
        name: 'side',
        type: 'int(2)',
      }),
    );
  }
}

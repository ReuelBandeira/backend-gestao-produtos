import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddNewColumnSmtMaterialManager1623681688761
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'smt_material_manager',
      new TableColumn({
        name: 'status_component',
        type: 'varchar(50)',
        default: '"online"',
        comment:
          '"This column has a three behavior - online, loading and offline."',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('smt_material_manager', 'status_component');
  }
}

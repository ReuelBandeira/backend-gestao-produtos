import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTypeColumnTableMaterialManager1623930183170
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'smt_material_manager',
      'module',
      new TableColumn({
        name: 'module',
        type: 'varchar(200)',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'smt_material_manager',
      'module',
      new TableColumn({
        name: 'module',
        type: 'int(11)',
      }),
    );
  }
}

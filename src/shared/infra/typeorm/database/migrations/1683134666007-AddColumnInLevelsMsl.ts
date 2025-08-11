import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnInLevelsMsl1683134666007 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'msl_levels',
      new TableColumn({
        name: 'time_baking',
        type: 'int(11)',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      'msl_levels',
      new TableColumn({
        name: 'time_baking',
        type: 'int(11)',
      })
    );
  }
}

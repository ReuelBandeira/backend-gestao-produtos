import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddUpdatedColumnInTableWorkStation1620307218765
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'workstations',
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('workstations', 'updated_at');
  }
}

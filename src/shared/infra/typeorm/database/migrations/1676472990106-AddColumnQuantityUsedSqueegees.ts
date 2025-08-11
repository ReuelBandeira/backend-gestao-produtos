import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnQuantityUsedSqueegees1676472990106
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'squeegees',
      new TableColumn({
        name: 'amount_used',
        type: 'int(11)',
        isNullable: true,
      })
    );

    await queryRunner.addColumn(
      'squeegees',
      new TableColumn({
        name: 'usage_limit',
        type: 'int(11)',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      'squeegees',
      new TableColumn({
        name: 'amount_used',
        type: 'int(11)',
        isNullable: true,
      })
    );

    await queryRunner.dropColumn(
      'squeegees',
      new TableColumn({
        name: 'usage_limit',
        type: 'int(11)',
      })
    );
  }
}

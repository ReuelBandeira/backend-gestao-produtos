import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterColumnToUpdateRouteHead1622055224080
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'route_head',
      'updated_at',
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'route_head',
      'updated_at',
      new TableColumn({
        name: 'updated_at',
        type: 'timestamp',
        isNullable: true,
      }),
    );
  }
}

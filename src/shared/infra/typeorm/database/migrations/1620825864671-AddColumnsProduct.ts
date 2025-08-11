import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnsProduct1620825864671 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('products', [
      new TableColumn({
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true,
      }),

      new TableColumn({
        name: 'type_side',
        type: 'varchar(20)',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('products', [
      new TableColumn({
        name: 'deleted_at',
        type: 'timestamp',
        isNullable: true,
      }),

      new TableColumn({
        name: 'type_side',
        type: 'varchar(20)',
      }),
    ]);
  }
}

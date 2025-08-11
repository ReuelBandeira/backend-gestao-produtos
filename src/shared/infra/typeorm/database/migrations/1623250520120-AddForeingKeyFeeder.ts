import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddForeingKeyFeeder1623250520120 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKeys('feeders', [
      new TableForeignKey({
        referencedTableName: 'type_feeder',
        referencedColumnNames: ['id'],
        columnNames: ['id_type_feeder'],
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys('feeders', [
      new TableForeignKey({
        referencedTableName: 'type_feeder',
        referencedColumnNames: ['id'],
        columnNames: ['id_type_feeder'],
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      }),
    ]);
  }
}

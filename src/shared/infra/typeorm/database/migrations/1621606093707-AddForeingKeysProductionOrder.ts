import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddForeingKeysProductionOrder1621606093707
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKeys('production_order', [
      new TableForeignKey({
        referencedTableName: 'products',
        referencedColumnNames: ['id'],
        columnNames: ['id_product'],
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      }),

      new TableForeignKey({
        referencedTableName: 'lines',
        referencedColumnNames: ['id'],
        columnNames: ['id_line'],
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys('production_order', [
      new TableForeignKey({
        referencedTableName: 'products',
        referencedColumnNames: ['id'],
        columnNames: ['id_product'],
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      }),

      new TableForeignKey({
        referencedTableName: 'lines',
        referencedColumnNames: ['id'],
        columnNames: ['id_line'],
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      }),
    ]);
  }
}

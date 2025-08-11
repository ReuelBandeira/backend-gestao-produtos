import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddColumnTypeFunctionSyncRasp1676297087299
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'sync_rasp',
      new TableColumn({
        name: 'id_type_function',
        type: 'int(11)',
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      'sync_rasp',
      new TableForeignKey({
        referencedTableName: 'type_function',
        referencedColumnNames: ['id'],
        columnNames: ['id_type_function'],
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('sync_rasp', [
      new TableColumn({
        name: 'id_type_function',
        type: 'int(11)',
        isNullable: true,
      }),
    ]);

    await queryRunner.dropForeignKeys('sync_rasp', [
      new TableForeignKey({
        referencedTableName: 'type_function',
        referencedColumnNames: ['id'],
        columnNames: ['id_type_function'],
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      }),
    ]);
  }
}

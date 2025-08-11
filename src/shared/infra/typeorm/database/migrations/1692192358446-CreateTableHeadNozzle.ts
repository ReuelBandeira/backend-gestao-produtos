import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableHeadNozzle1692192358446  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'head_nozzle',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'id_model',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'serial_number',
            type: 'varchar(250)',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },

        ],
        foreignKeys: [
          {
            referencedTableName: 'models',
            referencedColumnNames: ['id'],
            columnNames: ['id_model'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },

        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('head_nozzle');
  }
}





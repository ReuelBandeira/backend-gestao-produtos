import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableQualityBody1624473801186 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'smt_quality_body',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'list_code',
            type: 'varchar(200)',
          },
          {
            name: 'machine',
            type: 'varchar(50)',
          },

          {
            name: 'module',
            type: 'varchar(50)',
          },
          {
            name: 'side',
            type: 'int(11)',
          },
          {
            name: 'position',
            type: 'int(11)',
          },
          {
            name: 'component',
            type: 'varchar(50)',
          },

          {
            name: 'id_quality_head',
            type: 'int(11)',
          },
          {
            name: 'id_employee',
            type: 'int(11)',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            referencedTableName: 'employees',
            referencedColumnNames: ['id'],
            columnNames: ['id_employee'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'smt_quality_head',
            referencedColumnNames: ['id'],
            columnNames: ['id_quality_head'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('smt_quality_body');
  }
}

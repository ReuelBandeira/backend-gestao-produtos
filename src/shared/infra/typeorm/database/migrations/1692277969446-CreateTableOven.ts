
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableOven1692277969446 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'oven',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'oven_code',
            type: 'varchar(250)',
          },
          {
            name: 'description',
            type: 'varchar(250)',
          },
          {
            name: 'type_oven',
            type: 'varchar(250)',
          },
          {
            name: 'qty_zones',
            type: 'int(11)',
          },
          {
            name: 'qty_pressure',
            type: 'int(11)',
          },
          {
            name: 'id_employee',
            type: 'int(11)',
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
            referencedTableName: 'employees',
            referencedColumnNames: ['id'],
            columnNames: ['id_employee'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('oven');
  }
}





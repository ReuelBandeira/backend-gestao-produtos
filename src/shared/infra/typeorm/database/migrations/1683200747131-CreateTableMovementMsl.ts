import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableMovementMsl1683200747131 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'msl_movements',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'component',
            type: 'varchar(50)',
          },
          {
            name: 'serial',
            type: 'varchar(50)',
          },
          {
            name: 'start_date',
            type: 'timestamp',
          },
          {
            name: 'movement_type',
            type: 'varchar(50)',
          },
          {
            name: 'total_time_open',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'id_machine',
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
            referencedTableName: 'msl_machines',
            referencedColumnNames: ['id'],
            columnNames: ['id_machine'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('msl_movements');
  }
}

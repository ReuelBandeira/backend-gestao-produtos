
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableMachineRegisters1669602917011  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'machine_registers',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'model',
            type: 'varchar(50)',
          },
          {
            name: 'description',
            type: 'varchar(50)',
          },
          {
            name: 'manufacturer',
            type: 'varchar(50)',
          },
          {
            name: 'serial_number',
            type: 'varchar(50)',
          },
          {
            name: 'voltage',
            type: 'varchar(50)',
          },
          {
            name: 'id_line',
            type: 'int(11)',
          },
          {
            name: 'manufacturing_date',
            type: 'varchar(50)',
          },
          {
            name: 'id_employee',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'line_layout',
            type: 'int(11)',
          },
          {
            name: 'module',
            type: 'varchar(10)',
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
          {
            referencedTableName: 'lines',
            referencedColumnNames: ['id'],
            columnNames: ['id_line'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('machine_registers');
  }
}



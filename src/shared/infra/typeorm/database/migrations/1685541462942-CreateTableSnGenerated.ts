import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableSnGenerated1685541462942 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sn_generated',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'serial_number',
            type: 'varchar(30)',
          },
          {
            name: 'sequential',
            type: 'varchar(20)',
          },
          {
            name: 'isUsed',
            type: 'boolean',
            isNullable: true
          },
          {
            name: 'date_used',
            type: 'timestamp',
            isNullable: true
          },
          {
            name: 'id_production_order',
            type: 'int(11)',
          },
          {
            name: 'id_employee',
            type: 'int(11)',
          },
          {
            name: 'id_employee_laser_marker',
            type: 'int(11)',
            isNullable: true
          },
          {
            name: 'id_machine',
            type: 'int(11)',
            isNullable: true
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
            referencedTableName: 'production_order',
            referencedColumnNames: ['id'],
            columnNames: ['id_production_order'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'machine_registers',
            referencedColumnNames: ['id'],
            columnNames: ['id_machine'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'employees',
            referencedColumnNames: ['id'],
            columnNames: ['id_employee_laser_marker'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          }
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sn_generated');
  }

}

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableDowtimeManagement1670508395979  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'dowtime_management',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'id_department',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'id_type',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'reason',
            type: 'varchar(50)',
            isNullable: true,

          },
          {
            name: 'stop_start_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'id_line',
            type: 'int(11)',
            isNullable: true,

          },
          {
            name: 'id_machine',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'equipment',
            type: 'varchar(50)',
            isNullable: true,

          },
          {
            name: 'id_cause',
            type: 'int(11)',
            isNullable: true,

          },
          {
            name: 'module',
            type: 'varchar(50)',
            isNullable: true,

          },
          {
            name: 'final_stop_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar(50)',
            default: '"OPEN"'
          },
          {
            name: 'name_machine',
            type: 'varchar(50)',
            isNullable: true,
          },
          {
            name: 'id_employee',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'id_employee_checkin',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'date_accompanying_checkin',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'serial_number',
            type: 'varchar(50)',
            isNullable: true,
          },
          {
            name: 'component',
            type: 'varchar(50)',
            isNullable: true,
          },
          {
            name: 'id_action',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'comment',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'id_employee_closed',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'zone_type',
            type: 'varchar(50)',
            isNullable: true,
          },
          {
            name: 'post',
            type: 'varchar(50)',
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
          {
            referencedTableName: 'lines',
            referencedColumnNames: ['id'],
            columnNames: ['id_line'],
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
            referencedTableName: 'cause_downtime',
            referencedColumnNames: ['id'],
            columnNames: ['id_cause'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'type_downtime',
            referencedColumnNames: ['id'],
            columnNames: ['id_type'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'action_downtime',
            referencedColumnNames: ['id'],
            columnNames: ['id_action'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'departments',
            referencedColumnNames: ['id'],
            columnNames: ['id_department'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          }
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('dowtime_management');
  }
}


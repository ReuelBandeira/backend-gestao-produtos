
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableOvenTemperatureRecord1692294321308 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'oven_temperature_record',
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
            type: 'varchar(250)',
            isNullable: true,
          },
          {
            name: 'struct_code',
            type: 'varchar(250)',
            isNullable: true,
          },
          {
            name: 'id_oven',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'pressure_1',
            type: 'varchar(250)',
            isNullable: true,
          },
          {
            name: 'pressure_2',
            type: 'varchar(250)',
            isNullable: true,
          },
          {
            name: 'pressure_3',
            type: 'varchar(250)',
            isNullable: true,
          },
          {
            name: 'pressure_4',
            type: 'varchar(250)',
            isNullable: true,
          },
          {
            name: 'speed',
            type: 'varchar(250)',
            isNullable: true,
          },
          {
            name: 'user_approver_1',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'user_approver_2',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'user_approver_3',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'date_approver_1',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'date_approver_2',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'date_approver_3',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'zone_1',
            type: 'varchar(250)',
            isNullable: true,
          },
          {
            name: 'zone_2',
            type: 'varchar(250)',
            isNullable: true,
          },
          {
            name: 'zone_3',
            type: 'varchar(250)',
            isNullable: true,
          },
          {
            name: 'zone_4',
            type: 'varchar(250)',
            isNullable: true,
          },
          {
            name: 'zone_5',
            type: 'varchar(250)',
            isNullable: true,
          },
          {
            name: 'zone_6',
            type: 'varchar(250)',
            isNullable: true,
          },
          {
            name: 'zone_7',
            type: 'varchar(250)',
            isNullable: true,
          },
          {
            name: 'zone_8',
            type: 'varchar(250)',
            isNullable: true,
          },
          {
            name: 'zone_9',
            type: 'varchar(250)',
            isNullable: true,
          },
          {
            name: 'zone_10',
            type: 'varchar(250)',
            isNullable: true,
          },
          {
            name: 'zone_11',
            type: 'varchar(250)',
            isNullable: true,
          },
          {
            name: 'zone_12',
            type: 'varchar(250)',
            isNullable: true,
          },
          {
            name: 'zone_13',
            type: 'varchar(250)',
            isNullable: true,
          },
          {
            name: 'observation_2',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'observation_3',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'status_approver_2',
            type: 'varchar(250)',
            default: '"waiting for approval"',
            isNullable: true,
          },
          {
            name: 'status_approver_3',
            type: 'varchar(250)',
            default: '"waiting for approval"',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar(250)',
            default: '"waiting for approval"',
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
            columnNames: ['user_approver_1'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'employees',
            referencedColumnNames: ['id'],
            columnNames: ['user_approver_2'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'employees',
            referencedColumnNames: ['id'],
            columnNames: ['user_approver_3'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'oven',
            referencedColumnNames: ['id'],
            columnNames: ['id_oven'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('oven_temperature_record');
  }
}





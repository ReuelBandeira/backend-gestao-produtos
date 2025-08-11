import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableDowntimeCheckinControl1678394618243  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'dowtime_checkin_control',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'id_downtime',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'zone_type',
            type: 'varchar(50)',
            isNullable: true,
          },
          {
            name: 'id_employee_checkin',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'varchar(50)',
            isNullable: true,
          },
          {
            name: 'date_accompanying_checkin',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'type',
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
            columnNames: ['id_employee_checkin'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'dowtime_management',
            referencedColumnNames: ['id'],
            columnNames: ['id_downtime'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          }
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('dowtime_checkin_control');
  }
}



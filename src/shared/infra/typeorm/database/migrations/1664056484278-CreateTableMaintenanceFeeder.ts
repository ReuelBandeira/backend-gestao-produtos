
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableMaintenanceFeeder1664056484278 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'maintenance_feeder',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'id_feeders',
            type: 'int(11)',
          },
          {
            name: 'id_action',
            type: 'int(11)',
          },
          {
            name: 'id_cause',
            type: 'int(11)',
          },
          {
            name: 'id_defect',
            type: 'int(11)',
          },
          {
            name: 'type_maintenance',
            type: 'varchar(100)',
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
            referencedTableName: 'feeders',
            referencedColumnNames: ['id'],
            columnNames: ['id_feeders'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'action',
            referencedColumnNames: ['id'],
            columnNames: ['id_action'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'cause',
            referencedColumnNames: ['id'],
            columnNames: ['id_cause'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'defect',
            referencedColumnNames: ['id'],
            columnNames: ['id_defect'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
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
    await queryRunner.dropTable('maintenance_feeder');
  }
}



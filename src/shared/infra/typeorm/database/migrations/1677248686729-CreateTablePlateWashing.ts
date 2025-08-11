import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTablePlateWashing1677248686729  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'plate_washing',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'serial_number_plate',
            type: 'varchar(50)',
            isNullable: true,
          },
          {
            name: 'struct_code',
            type: 'varchar(50)',
            isNullable: true,
          },
          {
            name: 'list_code',
            type: 'varchar(50)',
            isNullable: true,
          },
          {
            name: 'main_component',
            type: 'varchar(100)',
            isNullable: true,
          },
          {
            name: 'quantity_component',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'id_employee',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'id_workstations',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'number_plates_panel',
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
          // {
          //   referencedTableName: 'workstations',
          //   referencedColumnNames: ['id'],
          //   columnNames: ['id_workstations'],
          //   onUpdate: 'CASCADE',
          //   onDelete: 'RESTRICT',
          // },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('plate_washing');
  }
}




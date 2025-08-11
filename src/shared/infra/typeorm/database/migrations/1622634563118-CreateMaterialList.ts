import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMaterialList1622634563118 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'smt_material_manager',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isGenerated: true,
            generationStrategy: 'increment',
            isPrimary: true,
          },
          {
            name: 'list_code',
            type: 'varchar(200)',
          },
          {
            name: 'main_components',
            type: 'varchar(50)',
          },
          {
            name: 'alternative_components',
            type: 'varchar(50)',
            isNullable: true,
          },
          {
            name: 'side',
            type: 'varchar(1)',
          },
          {
            name: 'machine',
            type: 'varchar(50)',
          },
          {
            name: 'status',
            type: 'varchar(50)',
            default: '"online"',
            comment:
              '"This column has a three behavior - online, loading and offline."',
          },
          {
            name: 'module',
            type: 'int(2)',
          },
          {
            name: 'qty_slots',
            type: 'int(2)',
          },
          {
            name: 'struct_code',
            type: 'varchar(50)',
          },
          {
            name: 'id_employee',
            type: 'int(11)',
          },
          {
            name: 'id_feeder',
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
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('smt_material_manager');
  }
}

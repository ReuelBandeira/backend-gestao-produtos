import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSmtMaterialManagerSetupTable1623848849359
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'smt_material_manager_setup',
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
            name: 'machine',
            type: 'varchar(200)',
          },
          {
            name: 'module',
            type: 'varchar(50)',
          },
          {
            name: 'position',
            type: 'int(11)',
          },
          {
            name: 'id_feeder',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'component',
            type: 'varchar(50)',
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
            referencedTableName: 'feeders',
            referencedColumnNames: ['id'],
            columnNames: ['id_feeder'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('smt_material_manager_setup');
  }
}

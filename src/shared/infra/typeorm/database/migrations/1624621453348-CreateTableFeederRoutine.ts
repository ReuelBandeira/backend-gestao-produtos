import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableFeederRoutine1624621453348
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'smt_material_manager_change_feeder',
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
            name: 'side',
            type: 'int(11)',
          },
          {
            name: 'position',
            type: 'int(11)',
          },

          {
            name: 'id_feeder_old',
            type: 'int(11)',
          },

          {
            name: 'id_feeder_new',
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
            referencedTableName: 'feeders',
            referencedColumnNames: ['id'],
            columnNames: ['id_feeder_old'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'feeders',
            referencedColumnNames: ['id'],
            columnNames: ['id_feeder_new'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('smt_material_manager_change_feeder');
  }
}

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTableStencilWash1675098702041 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'stencil_washes',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'id_tooling_control',
            type: 'int(11)',
          },
          {
            name: 'id_machine',
            type: 'int(11)',
            isNullable: true,
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
            referencedTableName: 'machine_registers',
            referencedColumnNames: ['id'],
            columnNames: ['id_machine'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'tooling_control',
            referencedColumnNames: ['id'],
            columnNames: ['id_tooling_control'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('stencil_washes');
  }
}

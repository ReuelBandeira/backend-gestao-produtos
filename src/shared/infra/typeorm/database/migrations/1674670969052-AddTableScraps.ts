import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class AddTableScraps1674670969052 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'scraps',
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
            name: 'number_plates_panel',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'material_quantity',
            type: 'int(11)',
          },
          {
            name: 'type',
            type: 'varchar(15)',
          },
          {
            name: 'list_code',
            type: 'varchar(200)',
            isNullable: true,
          },
          {
            name: 'reason',
            type: 'varchar(280)',
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
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('scraps');
  }
}

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBOM1621950078464 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'bom',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'struct_code',
            type: 'varchar(50)',
          },
          {
            name: 'main_component',
            type: 'varchar(30)',
          },
          {
            name: 'description',
            type: 'varchar(200)',
          },
          {
            name: 'alternative_component',
            type: 'varchar(30)',
            isNullable: true,
          },
          {
            name: 'qty_used',
            type: 'int(11)',
          },
          {
            name: 'status_bom',
            type: 'varchar(1)',
            default: '"Y"',
          },
          {
            name: 'id_production_order',
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
            referencedTableName: 'production_order',
            referencedColumnNames: ['id'],
            columnNames: ['id_production_order'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('bom');
  }
}

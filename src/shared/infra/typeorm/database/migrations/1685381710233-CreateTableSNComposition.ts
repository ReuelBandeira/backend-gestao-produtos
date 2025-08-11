import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableSNComposition1685381710233 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sn_composition',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'array_format_sn',
            type: 'varchar(700)',
          },
          {
            name: 'id_product',
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
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            columnNames: ['id_product'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          }
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sn_composition');
  }

}

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableProductDelimiter1681841549845 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product_delimiter',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'id_product',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'delimiter',
            type: 'varchar(50)',
            isNullable: true,
          },
          {
            name: 'position_quantity',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'varchar(50)',
            isNullable: true,
          },
          {
            name: 'id_employee',
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
          {
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            columnNames: ['id_product'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('product_delimiter');
  }
}




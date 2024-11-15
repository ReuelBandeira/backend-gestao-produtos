import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableProducts1724190957019 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar(50)',
          },
          {
            name: 'description',
            type: 'varchar(200)',
          },
          {
            name: 'price',
            type: 'int(11)',
          },
          {
            name: 'expirationDate',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'image',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'categoryId',
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
            name: 'FK_categoryId',
            referencedTableName: 'categorys',
            referencedColumnNames: ['id'],
            columnNames: ['categoryId'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}

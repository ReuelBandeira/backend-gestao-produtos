import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableCartCriticals1689333626226 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cart_criticals',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'id_cart',
            type: 'int(11)',
          },
          {
            name: 'id_line',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'list_code',
            type: 'varchar(200)',
          },
          {
            name: 'component',
            type: 'varchar(50)',
          },
          {
            name: 'component_quantity',
            type: 'int(11)',
          },
          {
            name: 'usage_percentage',
            type: 'int(11)',
            default: 70
          },
          {
            name: 'quantity_kit',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'used_quantity',
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
            referencedTableName: 'cart',
            referencedColumnNames: ['id'],
            columnNames: ['id_cart'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'lines',
            referencedColumnNames: ['id'],
            columnNames: ['id_line'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cart_criticals');
  }

}

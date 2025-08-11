import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableCartManageShelf1684866145359 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cart_manage_shelf',
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
            isNullable: true,
          },
          {
            name: 'id_cart_shelf',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'qty_position',
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
              referencedTableName: 'cart',
              referencedColumnNames: ['id'],
              columnNames: ['id_cart'],
              onUpdate: 'CASCADE',
              onDelete: 'RESTRICT',
            },
            {
              referencedTableName: 'cart_shelf',
              referencedColumnNames: ['id'],
              columnNames: ['id_cart_shelf'],
              onUpdate: 'CASCADE',
              onDelete: 'RESTRICT',
            }
          ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cart_manage_shelf');
  }

}

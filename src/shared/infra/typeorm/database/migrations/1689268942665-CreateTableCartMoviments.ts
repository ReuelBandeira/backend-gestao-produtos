import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableCartMoviments1689268942665 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cart_moviments',
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
            name: 'id_shelf',
            type: 'int(11)',
          },
          {
            name: 'id_employee_entrance',
            type: 'int(11)',
          },
          {
            name: 'id_employee_removal',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'qrcode',
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
            name: 'component_sequential',
            type: 'varchar(250)',
          },
          {
            name: 'position',
            type: 'int(11)',
          },
          {
            name: 'entrance_date',
            type: 'timestamp',
          },
          {
            name: 'removal_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'status',
            type: 'int(11)',
          },
          {
            name: 'status_cart',
            type: 'varchar(30)',
          },
          {
            name: 'list_code',
            type: 'varchar(200)',
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
            columnNames: ['id_shelf'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'employees',
            referencedColumnNames: ['id'],
            columnNames: ['id_employee_entrance'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'employees',
            referencedColumnNames: ['id'],
            columnNames: ['id_employee_removal'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          }
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cart_moviments');
  }

}

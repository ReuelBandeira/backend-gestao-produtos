import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableHourlyProduction1670501495241 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'hourly_production',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'id_production_order',
            type: 'int(11)',
          },
          {
            name: 'id_product',
            type: 'int(11)',
          },
          {
            name: 'id_line',
            type: 'int(11)',
          },
          {
            name: 'hit_target',
            type: 'int(11)',
          },
          {
            name: 'full_datatime',
            type: 'timestamp',
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
          {
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            columnNames: ['id_product'],
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
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('hourly_production');
  }

}

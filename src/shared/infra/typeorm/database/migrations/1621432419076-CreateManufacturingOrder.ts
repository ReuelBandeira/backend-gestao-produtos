import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateManufacturingOrder1621432419076
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'production_order',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'mo_code',
            type: 'varchar(50)',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'mo_status',
            type: 'varchar(50)',
            default: '"not in"',
          },
          {
            name: 'target_qty',
            type: 'int(11)',
          },
          {
            name: 'mo_created',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'mo_start_date',
            type: 'timestamp',
            isNullable: true,
            comment:
              '"This field just insert data when starting the first PCBA in the process"',
          },
          {
            name: 'mo_prevision_start_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'mo_close_date',
            type: 'timestamp',
            isNullable: true,
            comment: '"This field just insert data when to finish the PCBAs"',
          },
          {
            name: 'input_qty',
            type: 'int(11)',
            default: 0,
          },
          {
            name: 'output_qty',
            type: 'int(11)',
            default: 0,
          },
          {
            name: 'customer',
            type: 'varchar(50)',
            default: '"MULTILASER"',
          },
          {
            name: 'process_number',
            type: 'varchar(50)',
            comment: '"This field should be block the process"',
          },
          {
            name: 'id_route_code',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'id_line',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'id_product',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('production_order');
  }
}

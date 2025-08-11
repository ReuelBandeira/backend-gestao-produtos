import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMachine1622462093894 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tmp_machines',
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
            name: 'machine_code',
            type: 'varchar(2)',
            default: '"M1"',
          },
          {
            name: 'side',
            type: 'int(2)',
          },
          {
            name: 'qty_slots',
            type: 'int(2)',
          },
          {
            name: 'customer_code',
            type: 'varchar(100)',
          },
          {
            name: 'multilaser_code',
            type: 'varchar(20)',
          },
          {
            name: 'feeder_code',
            type: 'varchar(20)',
          },
          {
            name: 'thickness',
            type: 'varchar(5)',
          },
          {
            name: 'feed_pitch',
            type: 'int(2)',
          },
          {
            name: 'qty',
            type: 'int(3)',
          },
          {
            name: 'status',
            type: 'varchar(1)',
            default: '"Y"',
          },
          {
            name: 'side_product',
            type: 'varchar(1)',
          },
          {
            name: 'struct_bom_code',
            type: 'varchar(20)',
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tmp_machines');
  }
}

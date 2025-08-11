import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFeeder1623241434628 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'feeders',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'feeder_code',
            type: 'varchar(50)',
            isUnique: true,
          },
          {
            name: 'status',
            type: 'varchar(20)',
            default: '"available"',
          },
          {
            name: 'mouting_limit',
            type: 'int(11)',
          },
          {
            name: 'used_qty',
            type: 'int(11)',
          },
          {
            name: 'id_type_feeder',
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('feeders');
  }
}

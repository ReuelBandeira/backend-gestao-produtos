import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableProviders1648591580276 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'provider',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'provider_name',
            type: 'varchar(100)',
          },
          {
            name: 'description_provider',
            type: 'varchar(100)',
          },
          {
            name: 'type_paste',
            type: 'varchar(100)',
          },
          {
           name: 'acronym',
           type: 'varchar(4)',
           isUnique: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
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
    await queryRunner.dropTable('provider');
  }
}


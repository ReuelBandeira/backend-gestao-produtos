import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableEmployees1698023380214 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employees',
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
            name: 'username',
            type: 'varchar(50)',
          },
          {
            name: 'email',
            type: 'varchar(50)',
          },
          {
            name: 'password',
            type: 'varchar(100)',
          },
          {
            name: 'role',
            type: 'varchar(50)',
          },
          {
            name: 'departament',
            type: 'varchar(50)',
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
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('employees');
  }
}

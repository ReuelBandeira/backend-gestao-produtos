import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEmployees1619550146677 implements MigrationInterface {
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
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('employees');
  }
}

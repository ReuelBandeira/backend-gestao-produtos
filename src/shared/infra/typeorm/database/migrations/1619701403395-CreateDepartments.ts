import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDepartment1619701403395 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'departments',
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
        ],
      }),
    );
    await queryRunner.query(
      `INSERT INTO departments (name) VALUES ('Engenharia'), ('SMT'), ('Qualidade'), ('Produção')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('departments');
  }
}

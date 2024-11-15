import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateInsertAdminUserInEmployees1724337435298
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO employees (name, username, email, password, role, departament, created_at)
      VALUES (
        'admin',
        'admin',
        'admin@gmail.com',
        '$2a$08$t73USxcwVmKOHdJP8WG1EeMKSwcr4RILfX.7zW4gOfMKYGgoL/w8G',
        'administrativo',
        'engenharia',
        NOW()
      )`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM employees WHERE username = 'admin'`);
  }
}

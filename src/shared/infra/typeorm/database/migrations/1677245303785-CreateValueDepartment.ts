import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateValueDepartment1677245303785 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO departments (name) VALUES ('Assistência Técnica')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM departments WHERE name = 'Assistência Técnica'`
    );
  }
}

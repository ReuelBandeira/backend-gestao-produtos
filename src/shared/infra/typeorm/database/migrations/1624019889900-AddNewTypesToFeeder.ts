import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNewTypesToFeeder1624019889900 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO type_feeder (name) VALUES ('16MM'),('24MM'),('32MM'),('44MM')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM type_feeder WHERE name IN ('16MM'),('24MM'),('32MM'),('44MM') `,
    );
  }
}

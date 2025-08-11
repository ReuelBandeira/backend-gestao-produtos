import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterTableProviderAcronym1687289060086 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE provider MODIFY COLUMN acronym VARCHAR(20)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE provider MODIFY COLUMN acronym VARCHAR(4)');
  }
}

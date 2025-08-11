import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateViewQualityAllDefects1688759280602 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE VIEW vw_quality_all_defects AS
      select
        t.model_name as model_name,
        r.created_at as defeitos
      from repairs r
      join trackings t on t.id = r.id_tracking
      order by r.created_at
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS vw_quality_all_defects`);
  }
}








import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateViewQualityIndicatorDefect1688762381900 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE VIEW vw_quality_indicator_defects AS
      select
        l.id as id_line,
        l.line_name as line_name,
        t.model_name as model_name,
        count(t.model_name) as defeitos,
        date(r.created_at) as dates
      from repairs r
      join trackings t on t.id = r.id_tracking
      join \`lines\` l on l.id = t.id_line
      group by l.id, t.model_name, DATE(r.created_at)
      order by DATE(r.created_at)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS vw_quality_indicator_defects`);
  }
}









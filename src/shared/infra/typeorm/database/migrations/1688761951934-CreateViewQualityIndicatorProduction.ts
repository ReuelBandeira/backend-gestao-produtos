import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateViewQualityIndicatorProduction1688761951934 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE VIEW vw_quality_indicator_production AS
      select
        l.id as id_line,
        l.line_name as line_name,
        t.model_name as model_name,
        count(t.model_name) as production,
        date(t.out_line_time) as dates
      from trackings t
      join \`lines\` l on l.id = t.id_line
      where t.id_next_workgroup is null
      group by l.id, t.model_name, date(t.out_line_time)
      order by date(t.out_line_time)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS vw_quality_indicator_production`);
  }
}









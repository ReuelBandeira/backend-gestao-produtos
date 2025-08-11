
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateViewDowtimeRankingOp1683915044858 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE OR REPLACE
      ALGORITHM = UNDEFINED VIEW vw_dowtime_ranking_op AS
      select
          dm.id_line AS id_line,
          l.line_name AS line_name,
          cd.id AS id_cause,
          count(distinct cd.id) AS occurrence,
          cd.description AS description_cause,
          rank() OVER (PARTITION BY dm.id_line
      ORDER BY
          count(cd.id) desc,
          cd.id ) AS ranking
      from
          ((((check_tool_printer ctp
      join \`lines\` l on
          ((ctp.id_line = l.id)))
      join dowtime_management dm on
          ((ctp.id_line = dm.id_line)))
      join cause_downtime cd on
          ((dm.id_cause = cd.id)))
      join production_order po on
          (((ctp.id_production_order = po.id)
              and (dm.stop_start_date >= po.mo_start_date)
                  and (po.mo_status = 'online')
                      and (dm.status = 'FINALIZADO'))))
      where dm.deleted_at is null
      group by
          dm.id_line,
          cd.id,
          cd.description
      order by
          dm.id_line,
          count(cd.id) desc;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS vw_dowtime_ranking_op`);
  }
}



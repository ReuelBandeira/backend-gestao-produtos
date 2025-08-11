
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateViewDowtimeRankingTeam1684158650138 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE OR REPLACE VIEW vw_dowtime_ranking_team AS
    select
        dm.id_line AS id_line,
        cd.id AS id_cause,
        count(cd.id) AS occurrence,
        cd.description AS description_cause,
        row_number() OVER (PARTITION BY dm.id_line
    ORDER BY
        count(distinct cd.id) desc,
        cd.id ) AS ranking
    from
        ((((check_tool_printer ctp
    join dowtime_management dm on
        ((ctp.id_line = dm.id_line)))
    join cause_downtime cd on
        ((dm.id_cause = cd.id)))
    join shifts s on
        ((s.status = 'true')))
    join production_order po on
        ((ctp.id_production_order = po.id)))
    where
        ((dm.status = 'FINALIZADO')
            and (0 <> (case
                when (s.start_hour > s.end_hour) then (((now() >= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.start_hour, ':', 1) hour) + interval substring_index(s.start_hour, ':',-(1)) minute))
                    and (now() <= (((cast(date_format(now(), '%Y-%m-%d') as date) + interval 1 day) + interval substring_index(s.end_hour, ':', 1) hour) + interval substring_index(s.end_hour, ':',-(1)) minute)))
                    or ((now() >= (((cast(date_format(now(), '%Y-%m-%d') as date) - interval 1 day) + interval substring_index(s.start_hour, ':', 1) hour) + interval substring_index(s.start_hour, ':',-(1)) minute))
                        and (now() <= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.end_hour, ':', 1) hour) + interval substring_index(s.end_hour, ':',-(1)) minute))))
                else ((now() >= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.start_hour, ':', 1) hour) + interval substring_index(s.start_hour, ':',-(1)) minute))
                    and (now() <= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.end_hour, ':', 1) hour) + interval substring_index(s.end_hour, ':',-(1)) minute)))
            end))
                and (0 <> (case
                    when (s.start_hour > s.end_hour) then (((dm.final_stop_date >= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.start_hour, ':', 1) hour) + interval substring_index(s.start_hour, ':',-(1)) minute))
                        and (dm.final_stop_date <= (((cast(date_format(now(), '%Y-%m-%d') as date) + interval 1 day) + interval substring_index(s.end_hour, ':', 1) hour) + interval substring_index(s.end_hour, ':',-(1)) minute)))
                        or ((dm.final_stop_date >= (((cast(date_format(now(), '%Y-%m-%d') as date) - interval 1 day) + interval substring_index(s.start_hour, ':', 1) hour) + interval substring_index(s.start_hour, ':',-(1)) minute))
                            and (dm.final_stop_date <= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.end_hour, ':', 1) hour) + interval substring_index(s.end_hour, ':',-(1)) minute))))
                    else ((dm.final_stop_date >= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.start_hour, ':', 1) hour) + interval substring_index(s.start_hour, ':',-(1)) minute))
                        and (dm.final_stop_date <= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.end_hour, ':', 1) hour) + interval substring_index(s.end_hour, ':',-(1)) minute)))
                end)) and (dm.deleted_at is null))
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
    await queryRunner.query(`DROP VIEW IF EXISTS vw_dowtime_ranking_team`);
  }
}



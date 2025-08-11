import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateViewListOrderProductTeam1684249057736 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create or replace
          algorithm = UNDEFINED view vw_list_order_product_team as
          select
            distinct l.id AS id_line,
            l.line_name AS line_name,
            (((((sum(distinct po.target_qty) / count(distinct po.id)) / (sum(distinct trgt.target) / count(distinct po.id))) * 3600) - (((((sum(distinct po.target_qty) / count(distinct po.id)) / (sum(distinct trgt.target) / count(distinct po.id))) * (sum(distinct p.exception) / count(distinct po.id))) * 60) + (
            select
                coalesce(sum(distinct timestampdiff(SECOND, dm1.stop_start_date, dm1.final_stop_date)), 0) AS interval_col
            from
                ((check_tool_printer ctp1
            join dowtime_management dm1 on
                (((ctp1.id_line = dm1.id_line)
                    and (dm1.final_stop_date is not null) and (dm1.deleted_at is null))))
            join production_order po_2 on
                (((ctp1.id_production_order = po_2.id)
                    and (0 <> (case
                        when (s.start_hour > s.end_hour) then (((now() >= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.start_hour, ':', 1) hour) + interval substring_index(s.start_hour, ':',-(1)) minute))
                            and (now() <= (((cast(date_format(now(), '%Y-%m-%d') as date) + interval 1 day) + interval substring_index(s.end_hour, ':', 1) hour) + interval substring_index(s.end_hour, ':',-(1)) minute)))
                            or ((now() >= (((cast(date_format(now(), '%Y-%m-%d') as date) - interval 1 day) + interval substring_index(s.start_hour, ':', 1) hour) + interval substring_index(s.start_hour, ':',-(1)) minute))
                                and (now() <= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.end_hour, ':', 1) hour) + interval substring_index(s.end_hour, ':',-(1)) minute))))
                        else ((now() >= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.start_hour, ':', 1) hour) + interval substring_index(s.start_hour, ':',-(1)) minute))
                            and (now() <= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.end_hour, ':', 1) hour) + interval substring_index(s.end_hour, ':',-(1)) minute)))
                    end))
                        and (0 <> (case
                            when (s.start_hour > s.end_hour) then (((dm1.final_stop_date >= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.start_hour, ':', 1) hour) + interval substring_index(s.start_hour, ':',-(1)) minute))
                                and (dm1.final_stop_date <= (((cast(date_format(now(), '%Y-%m-%d') as date) + interval 1 day) + interval substring_index(s.end_hour, ':', 1) hour) + interval substring_index(s.end_hour, ':',-(1)) minute)))
                                or ((dm1.final_stop_date >= (((cast(date_format(now(), '%Y-%m-%d') as date) - interval 1 day) + interval substring_index(s.start_hour, ':', 1) hour) + interval substring_index(s.start_hour, ':',-(1)) minute))
                                    and (dm1.final_stop_date <= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.end_hour, ':', 1) hour) + interval substring_index(s.end_hour, ':',-(1)) minute))))
                            else ((dm1.final_stop_date >= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.start_hour, ':', 1) hour) + interval substring_index(s.start_hour, ':',-(1)) minute))
                                and (dm1.final_stop_date <= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.end_hour, ':', 1) hour) + interval substring_index(s.end_hour, ':',-(1)) minute)))
                        end)))))
            where
                ((ctp1.id_line = dm1.id_line)
                    and (ctp1.id_line = dm.id_line))))) / ((((sum(distinct po.target_qty) / count(distinct po.id)) / (sum(distinct trgt.target) / count(distinct po.id))) * 3600) - ((((sum(distinct po.target_qty) / count(distinct po.id)) / (sum(distinct trgt.target) / count(distinct po.id))) * (sum(distinct p.exception) / count(distinct po.id))) * 60))) AS disponibilidade,
            time_format(sec_to_time((((((sum(distinct po.target_qty) / count(distinct po.id)) / (sum(distinct trgt.target) / count(distinct po.id))) * 3600) - (((((sum(distinct po.target_qty) / count(distinct po.id)) / (sum(distinct trgt.target) / count(distinct po.id))) * (sum(distinct p.exception) / count(distinct po.id))) * 60) + (select coalesce(sum(distinct timestampdiff(SECOND, dm1.stop_start_date, dm1.final_stop_date)), 0) AS interval_col from ((check_tool_printer ctp1 join dowtime_management dm1 on(((ctp1.id_line = dm1.id_line) and (dm1.final_stop_date is not null) and dm1.deleted_at is null))) join production_order po_2 on(((ctp1.id_production_order = po_2.id) and (0 <> (case when (s.start_hour > s.end_hour) then (((now() >= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.start_hour, ':', 1) hour) + interval substring_index(s.start_hour, ':',-(1)) minute)) and (now() <= (((cast(date_format(now(), '%Y-%m-%d') as date) + interval 1 day) + interval substring_index(s.end_hour, ':', 1) hour) + interval substring_index(s.end_hour, ':',-(1)) minute))) or ((now() >= (((cast(date_format(now(), '%Y-%m-%d') as date) - interval 1 day) + interval substring_index(s.start_hour, ':', 1) hour) + interval substring_index(s.start_hour, ':',-(1)) minute)) and (now() <= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.end_hour, ':', 1) hour) + interval substring_index(s.end_hour, ':',-(1)) minute)))) else ((now() >= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.start_hour, ':', 1) hour) + interval substring_index(s.start_hour, ':',-(1)) minute)) and (now() <= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.end_hour, ':', 1) hour) + interval substring_index(s.end_hour, ':',-(1)) minute))) end)) and (0 <> (case when (s.start_hour > s.end_hour) then (((dm1.final_stop_date >= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.start_hour, ':', 1) hour) + interval substring_index(s.start_hour, ':',-(1)) minute)) and (dm1.final_stop_date <= (((cast(date_format(now(), '%Y-%m-%d') as date) + interval 1 day) + interval substring_index(s.end_hour, ':', 1) hour) + interval substring_index(s.end_hour, ':',-(1)) minute))) or ((dm1.final_stop_date >= (((cast(date_format(now(), '%Y-%m-%d') as date) - interval 1 day) + interval substring_index(s.start_hour, ':', 1) hour) + interval substring_index(s.start_hour, ':',-(1)) minute)) and (dm1.final_stop_date <= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.end_hour, ':', 1) hour) + interval substring_index(s.end_hour, ':',-(1)) minute)))) else ((dm1.final_stop_date >= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.start_hour, ':', 1) hour) + interval substring_index(s.start_hour, ':',-(1)) minute)) and (dm1.final_stop_date <= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.end_hour, ':', 1) hour) + interval substring_index(s.end_hour, ':',-(1)) minute))) end))))) where ((ctp1.id_line = dm1.id_line) and (ctp1.id_line = dm.id_line))))) / (sum(distinct po.output_qty) / count(distinct po.id)))), '%H:%i:%s') AS rate
        from
            ((((((check_tool_printer ctp
        join \`lines\` l on
            ((ctp.id_line = l.id)))
        join shifts s on
            ((s.status = 'true')))
        join production_order po on
            ((ctp.id_production_order = po.id)))
        join products p on
            ((ctp.id_product = p.id)))
        join targets trgt on
            (((ctp.id_line = trgt.id_line)
                and (ctp.id_product = trgt.id_product))))
        left join dowtime_management dm on
            ((ctp.id_line = dm.id_line) and (dm.deleted_at is null)))
        where
            ((0 <> (case
                when (s.start_hour > s.end_hour) then (((now() >= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.start_hour, ':', 1) hour) + interval substring_index(s.start_hour, ':',-(1)) minute))
                    and (now() <= (((cast(date_format(now(), '%Y-%m-%d') as date) + interval 1 day) + interval substring_index(s.end_hour, ':', 1) hour) + interval substring_index(s.end_hour, ':',-(1)) minute)))
                    or ((now() >= (((cast(date_format(now(), '%Y-%m-%d') as date) - interval 1 day) + interval substring_index(s.start_hour, ':', 1) hour) + interval substring_index(s.start_hour, ':',-(1)) minute))
                        and (now() <= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.end_hour, ':', 1) hour) + interval substring_index(s.end_hour, ':',-(1)) minute))))
                else ((now() >= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.start_hour, ':', 1) hour) + interval substring_index(s.start_hour, ':',-(1)) minute))
                    and (now() <= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.end_hour, ':', 1) hour) + interval substring_index(s.end_hour, ':',-(1)) minute)))
            end))
                and (0 <> (case
                    when (s.start_hour > s.end_hour) then (((po.updated_at >= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.start_hour, ':', 1) hour) + interval substring_index(s.start_hour, ':',-(1)) minute))
                        and (po.updated_at <= (((cast(date_format(now(), '%Y-%m-%d') as date) + interval 1 day) + interval substring_index(s.end_hour, ':', 1) hour) + interval substring_index(s.end_hour, ':',-(1)) minute)))
                        or ((po.updated_at >= (((cast(date_format(now(), '%Y-%m-%d') as date) - interval 1 day) + interval substring_index(s.start_hour, ':', 1) hour) + interval substring_index(s.start_hour, ':',-(1)) minute))
                            and (po.updated_at <= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.end_hour, ':', 1) hour) + interval substring_index(s.end_hour, ':',-(1)) minute))))
                    else ((po.updated_at >= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.start_hour, ':', 1) hour) + interval substring_index(s.start_hour, ':',-(1)) minute))
                        and (po.updated_at <= ((cast(date_format(now(), '%Y-%m-%d') as date) + interval substring_index(s.end_hour, ':', 1) hour) + interval substring_index(s.end_hour, ':',-(1)) minute)))
                end)))
        group by
            l.id,
            dm.final_stop_date,
            s.start_hour,
            s.end_hour;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS vw_list_order_product_team`);
  }
}






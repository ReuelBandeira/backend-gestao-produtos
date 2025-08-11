import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateViewStatusCurrentOrder1684516927929 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    create or replace
    algorithm = UNDEFINED view vw_status_current_order as
    select
    distinct l.id AS id_line,
    l.line_name AS line_name,
    po.output_qty AS quantidades_de_placas_produzidas,
    (trgt.target * timestampdiff(HOUR,
    po.mo_start_date,
    now())) AS quantidades_de_placas_teorica,
    po.target_qty AS meta_op,
    (po.output_qty - round(((trgt.target / 60) * timestampdiff(MINUTE, po.mo_start_date, now())), 0)) AS saldo,
    (case
        when (((((((((((po.target_qty / trgt.target) * 3600) - ((((po.target_qty / trgt.target) * p.exception) * 60) + (
        select
            coalesce(sum(distinct timestampdiff(SECOND, dm1.stop_start_date, dm1.final_stop_date)), 0) AS interval_col
        from
            ((check_tool_printer ctp1
        join dowtime_management dm1 on
            (((ctp1.id_line = dm1.id_line)
                and (dm1.final_stop_date is not null) and dm1.deleted_at is null)))
        join production_order po1 on
            (((ctp1.id_production_order = po1.id)
                and (dm1.stop_start_date >= po1.mo_start_date)
                    and (dm1.final_stop_date >= (now() - interval 3 hour))
                        and (po1.mo_status = 'online'))))
        where
            ((ctp1.id_line = dm1.id_line)
                and (ctp1.id_line = dm.id_line))))) / (((po.target_qty / trgt.target) * 3600) - (((po.target_qty / trgt.target) * p.exception) * 60))) * ((po.output_qty - (
        select
            count(r.id) AS count
        from
            (repairs r
        join trackings t on
            (((r.id_tracking = t.id)
                and (t.mo_number = po.mo_code)))))) / po.output_qty)) * (po.output_qty / po.target_qty)) * 0.30) + (((((((po.target_qty / trgt.target) * 3600) - ((((po.target_qty / trgt.target) * p.exception) * 60) + (
        select
            coalesce(sum(distinct timestampdiff(SECOND, dm1.stop_start_date, dm1.final_stop_date)), 0) AS interval_col
        from
            ((check_tool_printer ctp1
        join dowtime_management dm1 on
            (((ctp1.id_line = dm1.id_line)
                and (dm1.final_stop_date is not null) and dm1.deleted_at is null)))
        join production_order po1 on
            (((ctp1.id_production_order = po1.id)
                and (dm1.stop_start_date >= po1.mo_start_date)
                    and (dm1.final_stop_date >= (now() - interval 2 hour))
                        and (po1.mo_status = 'online'))))
        where
            ((ctp1.id_line = dm1.id_line)
                and (ctp1.id_line = dm.id_line))))) / (((po.target_qty / trgt.target) * 3600) - (((po.target_qty / trgt.target) * p.exception) * 60))) * ((po.output_qty - (
        select
            count(r.id) AS count
        from
            (repairs r
        join trackings t on
            (((r.id_tracking = t.id)
                and (t.mo_number = po.mo_code)))))) / po.output_qty)) * (po.output_qty / po.target_qty)) * 0.30)) + (((((((po.target_qty / trgt.target) * 3600) - ((((po.target_qty / trgt.target) * p.exception) * 60) + (
        select
            coalesce(sum(distinct timestampdiff(SECOND, dm1.stop_start_date, dm1.final_stop_date)), 0) AS interval_col
        from
            ((check_tool_printer ctp1
        join dowtime_management dm1 on
            (((ctp1.id_line = dm1.id_line)
                and (dm1.final_stop_date is not null) and dm1.deleted_at is null)))
        join production_order po1 on
            (((ctp1.id_production_order = po1.id)
                and (dm1.stop_start_date >= po1.mo_start_date)
                    and (dm1.final_stop_date >= (now() - interval 1 hour))
                        and (po1.mo_status = 'online'))))
        where
            ((ctp1.id_line = dm1.id_line)
                and (ctp1.id_line = dm.id_line))))) / (((po.target_qty / trgt.target) * 3600) - (((po.target_qty / trgt.target) * p.exception) * 60))) * ((po.output_qty - (
        select
            count(r.id) AS count
        from
            (repairs r
        join trackings t on
            (((r.id_tracking = t.id)
                and (t.mo_number = po.mo_code)))))) / po.output_qty)) * (po.output_qty / po.target_qty)) * 0.40)) / 1) >= ((((((po.target_qty / trgt.target) * 3600) - ((((po.target_qty / trgt.target) * p.exception) * 60) + (
        select
            coalesce(sum(distinct timestampdiff(SECOND, dm1.stop_start_date, dm1.final_stop_date)), 0) AS interval_col
        from
            ((check_tool_printer ctp1
        join dowtime_management dm1 on
            (((ctp1.id_line = dm1.id_line)
                and (dm1.final_stop_date is not null) and dm1.deleted_at is null)))
        join production_order po1 on
            (((ctp1.id_production_order = po1.id)
                and (dm1.stop_start_date >= po1.mo_start_date)
                    and (po1.mo_status = 'online'))))
        where
            ((ctp1.id_line = dm1.id_line)
                and (ctp1.id_line = dm.id_line))))) / (((po.target_qty / trgt.target) * 3600) - (((po.target_qty / trgt.target) * p.exception) * 60))) * ((po.output_qty - (
        select
            count(r.id) AS count
        from
            (repairs r
        join trackings t on
            (((r.id_tracking = t.id)
                and (t.mo_number = po.mo_code)))))) / po.output_qty)) * (po.output_qty / po.target_qty))) then 'true'
        else 'false'
    end) AS trend_oee_signal,
    floor((((((((po.target_qty / trgt.target) * 3600) - ((((po.target_qty / trgt.target) * p.exception) * 60) + (select coalesce(sum(distinct timestampdiff(SECOND, dm1.stop_start_date, dm1.final_stop_date)), 0) AS interval_col from ((check_tool_printer ctp1 join dowtime_management dm1 on(((ctp1.id_line = dm1.id_line) and (dm1.final_stop_date is not null) and dm1.deleted_at is null))) join production_order po1 on(((ctp1.id_production_order = po1.id) and (dm1.stop_start_date >= po1.mo_start_date) and (dm1.final_stop_date >= (now() - interval 24 hour)) and (po1.mo_status = 'online')))) where ((ctp1.id_line = dm1.id_line) and (ctp1.id_line = dm.id_line))))) / (((po.target_qty / trgt.target) * 3600) - (((po.target_qty / trgt.target) * p.exception) * 60))) * ((po.output_qty - (select count(r.id) AS count from (repairs r join trackings t on(((r.id_tracking = t.id) and (t.mo_number = po.mo_code)))))) / po.output_qty)) * (po.output_qty / po.target_qty)) * 100)) AS oee_po_day,
    floor((((((((po.target_qty / trgt.target) * 3600) - ((((po.target_qty / trgt.target) * p.exception) * 60) + (select coalesce(sum(distinct timestampdiff(SECOND, dm1.stop_start_date, dm1.final_stop_date)), 0) AS interval_col from ((check_tool_printer ctp1 join dowtime_management dm1 on(((ctp1.id_line = dm1.id_line) and (dm1.final_stop_date is not null) and dm1.deleted_at is null))) join production_order po1 on(((ctp1.id_production_order = po1.id) and (dm1.stop_start_date >= po1.mo_start_date) and (po1.mo_status = 'online')))) where ((ctp1.id_line = dm1.id_line) and (ctp1.id_line = dm.id_line))))) / (((po.target_qty / trgt.target) * 3600) - (((po.target_qty / trgt.target) * p.exception) * 60))) * ((po.output_qty - (select count(r.id) AS count from (repairs r join trackings t on(((r.id_tracking = t.id) and (t.mo_number = po.mo_code)))))) / po.output_qty)) * (po.output_qty / po.target_qty)) * 100)) AS oee_po
from
    (((((check_tool_printer ctp
join \`lines\` l on
    ((ctp.id_line = l.id)))
join production_order po on
    (((ctp.id_production_order = po.id)
        and (po.mo_status = 'online'))))
join products p on
    ((ctp.id_product = p.id)))
join targets trgt on
    (((ctp.id_line = trgt.id_line)
        and (p.id = trgt.id_product)
            and (trgt.deleted_at is null))))
left join dowtime_management dm on
    ((ctp.id_line = dm.id_line) and dm.deleted_at is null))
group by
    l.id, po.output_qty, trgt.target, po.mo_start_date, po.target_qty, p.exception, po.mo_code;
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS vw_status_current_order`);
  }
}







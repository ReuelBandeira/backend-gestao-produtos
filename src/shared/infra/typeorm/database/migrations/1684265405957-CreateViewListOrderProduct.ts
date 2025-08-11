import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateViewListOrderProduct1684265405957 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    create or replace
    algorithm = UNDEFINED view vw_list_order_product as
    select
      distinct l.id AS id_line,
      l.line_name AS line_name,
      po.id AS id_production_order,
      po.mo_code AS mo_code,
      po.mo_status AS mo_status,
      po.target_qty AS target_qty,
      po.mo_start_date AS mo_start_date,
      po.output_qty AS output_qty,
      p.id AS id_product,
      p.product_name AS product_name,
      p.description AS product_description,
      (
      select
          count(r.id) AS count
      from
          (repairs r
      join trackings t on
          (((r.id_tracking = t.id)
              and (t.mo_number = po.mo_code))))) AS regected_amount,
      ((((po.target_qty / trgt.target) * 3600) - ((((po.target_qty / trgt.target) * p.exception) * 60) + (
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
              and (ctp1.id_line = dm.id_line))))) / (((po.target_qty / trgt.target) * 3600) - (((po.target_qty / trgt.target) * p.exception) * 60))) AS disponibilidade,
      ((((((po.target_qty / trgt.target) * 3600) - ((((po.target_qty / trgt.target) * p.exception) * 60) + (
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
              and (t.mo_number = po.mo_code)))))) / po.output_qty)) * (po.output_qty / po.target_qty)) AS oee_po,
      time_format(sec_to_time(((((po.target_qty / trgt.target) * 3600) - ((((po.target_qty / trgt.target) * p.exception) * 60) + (select coalesce(sum(distinct timestampdiff(SECOND, dm1.stop_start_date, dm1.final_stop_date)), 0) AS interval_col from ((check_tool_printer ctp1 join dowtime_management dm1 on(((ctp1.id_line = dm1.id_line) and (dm1.final_stop_date is not null) and dm1.deleted_at is null))) join production_order po1 on(((ctp1.id_production_order = po1.id) and (dm1.stop_start_date >= po1.mo_start_date) and (po1.mo_status = 'online')))) where ((ctp1.id_line = dm1.id_line) and (ctp1.id_line = dm.id_line))))) / po.output_qty)), '%H:%i:%s') AS rate
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
      ((ctp.id_line = dm.id_line) and (dm.deleted_at is null)))
  group by
      l.id,
      po.id,
      p.id,
      trgt.target;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS vw_list_order_product`);
  }
}







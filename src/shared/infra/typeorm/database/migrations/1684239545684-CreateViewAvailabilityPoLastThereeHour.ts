import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateViewAvailabilityPoLastThreeHour1684239545684 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`create or replace
    algorithm = UNDEFINED view vw_availability_po_last_three_hour as
    select
      l.id AS id_line,
      l.line_name AS line_name,
      (((((sum(distinct po.target_qty) / count(distinct po.id)) / (sum(distinct trgt.target) / count(distinct po.id))) * 3600) - (((((sum(distinct po.target_qty) / count(distinct po.id)) / (sum(distinct trgt.target) / count(distinct po.id))) * (sum(distinct p.exception) / count(distinct po.id))) * 60) + (
      select
          coalesce(sum(distinct timestampdiff(SECOND, dm1.stop_start_date, dm1.final_stop_date)), 0) AS interval_col
      from
          ((check_tool_printer ctp1
      join dowtime_management dm1 on
          (((ctp1.id_line = dm1.id_line)
              and (dm1.final_stop_date is not null) and dm1.deleted_at is null)))
      join production_order po_2 on
          (((ctp1.id_production_order = po_2.id)
              and (dm1.final_stop_date >= (now() - interval 3 hour)))))
      where
          ((ctp1.id_line = dm1.id_line)
              and (ctp1.id_line = dm.id_line))))) / ((((sum(distinct po.target_qty) / count(distinct po.id)) / (sum(distinct trgt.target) / count(distinct po.id))) * 3600) - ((((sum(distinct po.target_qty) / count(distinct po.id)) / (sum(distinct trgt.target) / count(distinct po.id))) * (sum(distinct p.exception) / count(distinct po.id))) * 60))) AS disponibilidade
  from
      (((((check_tool_printer ctp
  join \`lines\` l on
      ((ctp.id_line = l.id)))
  join production_order po on
      (((ctp.id_production_order = po.id)
          and (po.updated_at >= (now() - interval 3 hour)))))
  join products p on
      ((ctp.id_product = p.id)))
  join targets trgt on
      (((ctp.id_line = trgt.id_line)
          and (ctp.id_product = trgt.id_product))))
  left join dowtime_management dm on
      ((ctp.id_line = dm.id_line and dm.deleted_at is null)))
  group by
      l.id;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS vw_availability_po_last_three_hour`);
  }
}





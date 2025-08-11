import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateViewListOrderProductOeeCurrentWeek1684262903678 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    create or replace view vw_list_order_product_oee_current_week as
    select
            l.id AS id_line,
            l.line_name AS line_name,
            coalesce((((((((sum( po.target_qty) / count( po.id)) / (sum( trgt.target) / count( po.id))) * 3600) -
            (((((sum( po.target_qty) / count( po.id)) / (sum( trgt.target) / count( po.id))) * (sum( p.exception) / count( po.id))) * 60) +
            (select coalesce(sum(distinct timestampdiff(SECOND, dm1.stop_start_date, dm1.final_stop_date)), 0) AS interval_col
            from ((check_tool_printer ctp1
            join dowtime_management dm1 on(((ctp1.id_line = dm1.id_line)
              and (dm1.final_stop_date is not null)
              and (dm1.deleted_at is null))))
            join production_order po_2 on(((ctp1.id_production_order = po_2.id)
              and (dm1.final_stop_date >= (now() - interval 168 hour)))))
            where ((ctp1.id_line = dm1.id_line)
              and (ctp1.id_line = dm.id_line))))) / ((((sum( po.target_qty) / count( po.id)) / (sum( trgt.target) / count( po.id))) * 3600) -
              ((((sum( po.target_qty) / count( po.id)) / (sum( trgt.target) / count( po.id))) * (sum( p.exception) / count( po.id))) * 60))) *
              (((sum( po.output_qty) -
              sum(distinct (select count(r.id) AS count
              from (repairs r
                  join trackings t on(((r.id_tracking = t.id)
                    and (t.mo_number = po.mo_code))))))) / count( po.id)) / (sum( po.output_qty) / count( po.id)))) *
              ((sum( po.output_qty) / count( po.id)) / (sum( po.target_qty) / count( po.id)))), 0) AS oee_week
            FROM
            \`lines\` l
        JOIN
            (
                SELECT DISTINCT
                    id_line,
                    id_production_order,
                    id_product,
                    list_code
                FROM
                    check_tool_printer
                WHERE
                    deleted_at IS NULL
            ) AS ctp ON l.id = ctp.id_line
        JOIN
            production_order po ON ctp.id_production_order = po.id
        JOIN
            products p ON ctp.id_product = p.id
        JOIN
            targets trgt ON ctp.id_line = trgt.id_line AND ctp.id_product = trgt.id_product
        LEFT JOIN
            dowtime_management dm ON ctp.id_line = dm.id_line AND dm.deleted_at IS NULL and dm.final_stop_date = (NOW() - INTERVAL 168 HOUR)
        WHERE
            (po.updated_at >= (NOW() - INTERVAL 168 HOUR)
            AND (po.mo_status IN ('online', 'finished manually', 'finish_op_list', 'finish')))
        GROUP BY
            l.id, l.line_name;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS vw_list_order_product_oee_current_week`);
  }
}






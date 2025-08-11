import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateViewQuantityCurrentOrder1684432394298 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    create or replace
    algorithm = UNDEFINED view vw_quantity_current_order as
        select
        distinct l.id as id_line,
        l.line_name as line_name,
        case
            when dm.final_stop_date is not null then 'OPERATION'
            else cd.description
        end as status,
        count(distinct t.serial_number) as total_placas,
        count(distinct t.serial_number) - (
        select
            count(r.id) as count
        from
            (repairs r
        join trackings t on
            (r.id_tracking = t.id
                and t.mo_number = po.mo_code
                and r.created_at >= cast(date_format(current_timestamp(), '%Y-%m-%d') as date) + interval s.start_hour hour_minute
                    and r.created_at <= cast(date_format(current_timestamp(), '%Y-%m-%d') as date) + interval s.end_hour hour_minute))) as quantidade_placas_aceitas,
        t2.target * timestampdiff(hour,
        str_to_date(s.start_hour,
        '%H:%i'),
        str_to_date(s.end_hour,
        '%H:%i')) as target
    from
        (((((((trackings t
    join production_order po on
        (t.mo_number = po.mo_code
            and po.mo_status = 'online'))
    join \`lines\` l on
        (t.id_line = l.id))
    join products p on
        (t.model_name = p.product_name))
    join shifts s on
        (s.status = 'true'
            and current_timestamp() >= cast(date_format(current_timestamp(), '%Y-%m-%d') as date) + interval s.start_hour hour_minute
                and current_timestamp() <= cast(date_format(current_timestamp(), '%Y-%m-%d') as date) + interval s.end_hour hour_minute))
    join targets t2 on
        (l.id = t2.id_line
            and p.id = t2.id_product
            and t2.deleted_at is null))
    left join dowtime_management dm on
        (dm.id_line = t.id_line))
    join cause_downtime cd on
        (dm.id_cause = cd.id))
    where
        t.id_next_workgroup is null
        and t.out_line_time >= cast(date_format(current_timestamp(), '%Y-%m-%d') as date) + interval s.start_hour hour_minute
        and t.out_line_time <= cast(date_format(current_timestamp(), '%Y-%m-%d') as date) + interval s.end_hour hour_minute
    group by
        l.id,
        l.line_name,
        cd.description,
        dm.final_stop_date,
        po.mo_code,
        s.start_hour,
        s.end_hour,
        t2.target;

    `);
  }


  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS vw_quantity_current_order`);
  }
}









import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateViewHourlyProductionDetail1687898968091 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    create or replace
    algorithm = UNDEFINED view vw_hourly_production_detail as
      select
          t.out_line_time as out_line_time,
          t.serial_number as serial_number,
          t.id_line as id_line,
          s.id as turno
      from
          (trackings t
      join shifts s on
          (s.status = 'true'))
      where
          t.id_next_workgroup is null
          and (case
              when s.start_hour > s.end_hour then current_timestamp() >= cast(date_format(current_timestamp(), '%Y-%m-%d') as date) + interval substring_index(s.start_hour, ':', 1) hour + interval substring_index(s.start_hour, ':',-1) minute
              and current_timestamp() <= cast(date_format(current_timestamp(), '%Y-%m-%d') as date) + interval 1 day + interval substring_index(s.end_hour, ':', 1) hour + interval substring_index(s.end_hour, ':',-1) minute
              or current_timestamp() >= cast(date_format(current_timestamp(), '%Y-%m-%d') as date) - interval 1 day + interval substring_index(s.start_hour, ':', 1) hour + interval substring_index(s.start_hour, ':',-1) minute
              and current_timestamp() <= cast(date_format(current_timestamp(), '%Y-%m-%d') as date) + interval substring_index(s.end_hour, ':', 1) hour + interval substring_index(s.end_hour, ':',-1) minute
              else current_timestamp() >= cast(date_format(current_timestamp(), '%Y-%m-%d') as date) + interval substring_index(s.start_hour, ':', 1) hour + interval substring_index(s.start_hour, ':',-1) minute
              and current_timestamp() <= cast(date_format(current_timestamp(), '%Y-%m-%d') as date) + interval substring_index(s.end_hour, ':', 1) hour + interval substring_index(s.end_hour, ':',-1) minute
          end
          and case
              when s.start_hour > s.end_hour then t.out_line_time >= cast(date_format(current_timestamp(), '%Y-%m-%d') as date) + interval substring_index(s.start_hour, ':', 1) hour + interval substring_index(s.start_hour, ':',-1) minute
              and t.out_line_time <= cast(date_format(current_timestamp(), '%Y-%m-%d') as date) + interval 1 day + interval substring_index(s.end_hour, ':', 1) hour + interval substring_index(s.end_hour, ':',-1) minute
              or t.out_line_time >= cast(date_format(current_timestamp(), '%Y-%m-%d') as date) - interval 1 day + interval substring_index(s.start_hour, ':', 1) hour + interval substring_index(s.start_hour, ':',-1) minute
              and t.out_line_time <= cast(date_format(current_timestamp(), '%Y-%m-%d') as date) + interval substring_index(s.end_hour, ':', 1) hour + interval substring_index(s.end_hour, ':',-1) minute
              else t.out_line_time >= cast(date_format(current_timestamp(), '%Y-%m-%d') as date) + interval substring_index(s.start_hour, ':', 1) hour + interval substring_index(s.start_hour, ':',-1) minute
              and t.out_line_time <= cast(date_format(current_timestamp(), '%Y-%m-%d') as date) + interval substring_index(s.end_hour, ':', 1) hour + interval substring_index(s.end_hour, ':',-1) minute
          end)
      group by
          t.out_line_time,
          t.serial_number,
          t.id_line,
          s.id;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS vw_hourly_production_detail`);
  }
}








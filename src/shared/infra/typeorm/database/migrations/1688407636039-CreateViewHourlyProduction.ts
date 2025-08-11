import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateViewHourlyProduction1688407636039 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    create view vw_hourly_production as
        select
        l.id as id_linha,
        l.line_name as line_name,
        h.hour as hora,
        h.turno as turno,
        count(vhpd.serial_number) as quantidade_placa
    from
        ((\`lines\` l
    join hour h)
    left join vw_hourly_production_detail vhpd on
        (hour(vhpd.out_line_time) = hour(h.hour) and minute(vhpd.out_line_time) >= minute(h.hour) and l.id = vhpd.id_line))
    group by
        h.hour,
        l.id,
        l.line_name
    order by
        l.id,
        l.line_name,
        h.hour;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS vw_hourly_production`);
  }
}
// teste








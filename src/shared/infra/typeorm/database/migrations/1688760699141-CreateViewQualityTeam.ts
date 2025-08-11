import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateViewQualityTeam1688760699141 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    create or replace
    algorithm = UNDEFINED view vw_quality_team as
    select
        s.id as turno,
        r.created_at as dates
    from
        repairs r
    join shifts s on s.status = 'true'  AND (
            (s.start_hour <= s.end_hour AND TIME(r.created_at) BETWEEN TIME(s.start_hour) AND TIME(s.end_hour)) OR
            (s.start_hour > s.end_hour AND (TIME(r.created_at) >= TIME(s.start_hour) OR TIME(r.created_at) <= TIME(s.end_hour))))
    order by
    r.created_at desc;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS vw_quality_team`);
  }
}








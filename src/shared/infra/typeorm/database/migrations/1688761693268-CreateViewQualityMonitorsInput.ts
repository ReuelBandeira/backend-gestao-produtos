import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateViewQualityMonitorsInput1688761693268 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    create view vw_quality_monitors_input  as
    select
      e.name as name,
      r.created_at as dates
      from repairs r
      join employees e on e.id = id_operator
      order by r.created_at desc
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS vw_quality_monitors_input`);
  }
}









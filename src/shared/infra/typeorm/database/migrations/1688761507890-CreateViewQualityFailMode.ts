import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateViewQualityFailMode1688761507890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    create or replace
    algorithm = UNDEFINED view vw_quality_fail_mode as
    select
        d.description as defect,
        r.created_at as dates
    from
        (repairs r
    join defect d on
        (d.id = r.id_defect))
    order by
        r.created_at desc;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS vw_quality_fail_mode`);
  }
}









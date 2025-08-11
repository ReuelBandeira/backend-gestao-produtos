import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateViewQualityDefectsPosition1688759936412 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    create view vw_quality_defects_position as
      select
        UPPER(r.mechanical_position) AS mechanical_position,
        r.created_at as dates
        from repairs r
        order by dates desc
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS vw_quality_defects_position`);
  }
}








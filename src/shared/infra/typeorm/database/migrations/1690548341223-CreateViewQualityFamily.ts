import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateViewQualityFamily1690548341223 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE VIEW vw_quality_family AS
      select
        fr.description as familia,
        r.created_at  as dates
      from repairs r
      join trackings t on r.id_tracking = t.id
      join products p on t.model_name = p.product_name
      join family_record fr on fr.id = p.id_family
      order by r.created_at desc
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS vw_quality_family`);
  }
}








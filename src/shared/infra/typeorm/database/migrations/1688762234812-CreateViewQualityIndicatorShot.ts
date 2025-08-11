import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateViewQualityIndicatorShot1688762234812 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE VIEW vw_quality_indicator_shot AS
        select
          b.struct_code as model_name,
          sum(b.qty_used) as qty
        from bom b
      group by b.struct_code
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS vw_quality_indicator_shot`);
  }
}









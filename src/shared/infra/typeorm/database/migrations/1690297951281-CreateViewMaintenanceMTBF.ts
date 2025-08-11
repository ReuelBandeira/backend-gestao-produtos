
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateViewMaintenanceMTBF1690297951281 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create view vw_maintenance_mtbf as
select
	dm.id,
	dm.stop_start_date as dates,
    	coalesce(TIMESTAMPDIFF(second,
        dm.stop_start_date,
        LEAD(dm.stop_start_date) OVER (ORDER BY dm.stop_start_date)),0) AS intervalo
  FROM dowtime_management dm
  WHERE dm.deleted_at is null;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS vw_maintenance_mtbf`);
  }
}






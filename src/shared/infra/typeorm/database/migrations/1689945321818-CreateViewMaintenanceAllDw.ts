
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateViewMaintenanceAllDw1689945321818 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    create view vw_maintenance_all_dw as
      select
        dm.id,
        dm.stop_start_date as dates
        from dowtime_management dm
        where dm.deleted_at is null;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS vw_maintenance_all_dw`);
  }
}



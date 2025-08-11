
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateViewMaintenanceMTTR1689946489743 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      create view vw_maintenance_mttr as
        select
        dm.id,
        dm.name_machine,
        dm.stop_start_date,
        dm.final_stop_date,
        timestampdiff(second,dm.stop_start_date, dm.final_stop_date) as intervalo
      from dowtime_management dm
      where dm.status = 'FINALIZADO'
      and dm.deleted_at is null;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS vw_maintenance_mttr`);
  }
}
// teste





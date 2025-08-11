
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateViewMaintenanceTechnician1689945050065 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    create view vw_maintenance_technician as
      select
        dm.id,
        e.name as tecnico,
        dm.stop_start_date as dates
        from dowtime_management dm
        join employees e on e.id = dm.id_employee_closed
        where dm.deleted_at is null;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS vw_maintenance_technician`);
  }
}



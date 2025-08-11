
import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateViewMaintenanceTeam1689944468468 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    create or replace
    algorithm = UNDEFINED view vw_maintenance_team as
    SELECT
        dm.id AS id,
        s.id AS turno,
        dm.stop_start_date AS dates
    FROM
        dowtime_management dm
    JOIN
        shifts s ON s.status = 'true' AND (
            (s.start_hour <= s.end_hour AND TIME(dm.stop_start_date) BETWEEN TIME(s.start_hour) AND TIME(s.end_hour)) OR
            (s.start_hour > s.end_hour AND (TIME(dm.stop_start_date) >= TIME(s.start_hour) OR TIME(dm.stop_start_date) <= TIME(s.end_hour))))
    WHERE dm.deleted_at is null;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP VIEW IF EXISTS vw_maintenance_team`);
  }
}



import {MigrationInterface, QueryRunner} from "typeorm";

export class  CreateDefaultValuesWorkstationAndWorkgroup1686149772805 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO workgroups (name) VALUES ('Laser Marker')`);

    await queryRunner.query(
      `INSERT INTO workstations (name, workgroup_id) VALUES ('Laser Marker_01', 3)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM workstations WHERE name = 'Laser Marker_01'`
    );

    await queryRunner.query(`DELETE FROM workgroups WHERE name = 'Laser Marker'`);
  }
}

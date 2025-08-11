import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDefaultValuesWorkstationAndWorkgroup1677692417201 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO workgroups (name) VALUES ('Lavagem de Placa')`);

    await queryRunner.query(
      `INSERT INTO workstations (name, workgroup_id) VALUES ('Lavagem de Placa_01', 2)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM workstations WHERE name = 'Lavagem de Placa_01'`
    );

    await queryRunner.query(`DELETE FROM workgroups WHERE name = 'Lavagem de Placa'`);
  }
}

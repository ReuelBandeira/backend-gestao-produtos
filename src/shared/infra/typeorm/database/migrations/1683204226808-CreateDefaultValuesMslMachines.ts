import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDefaultValuesMslMachines1683204226808 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(
      `INSERT INTO msl_machines (machine, type) VALUES ('PRODUÇÃO', 'PRODUÇÃO')`
    );
    await queryRunner.query(
      `INSERT INTO msl_machines (machine, type) VALUES ('IQC', 'IQC')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM msl_machines WHERE machine = 'PRODUÇÃO' `
    );
    await queryRunner.query(
      `DELETE FROM msl_machines WHERE machine = 'IQC' `
    );

  }
}


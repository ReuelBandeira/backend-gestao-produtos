import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDefaultValuesInShifts1689272455843 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(
      `INSERT INTO shifts (id,name,start_hour,end_hour,status) VALUES (1,'1º Turno','06:00','14:20','true')`
    );
    await queryRunner.query(
      `INSERT INTO shifts (id,name,start_hour,end_hour,status) VALUES (2,'2º Turno','14:20','22:35','true')`
    );
    await queryRunner.query(
      `INSERT INTO shifts (id,name,start_hour,end_hour,status) VALUES (3,'3º Turno','22:35','06:00','true')`
    );

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM shifts WHERE name = '1º Turno' `
    );
    await queryRunner.query(
      `DELETE FROM shifts WHERE name = '2º Turno' `
    );
    await queryRunner.query(
      `DELETE FROM shifts WHERE name = '3º Turno' `
    );

  }
}


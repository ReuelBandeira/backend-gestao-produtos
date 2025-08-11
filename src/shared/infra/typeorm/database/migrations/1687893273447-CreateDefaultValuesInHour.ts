import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDefaultValuesInHour1687893273447 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(
      `INSERT INTO hour (hour,turno) VALUES ('00:00:00',3)`
    );
    await queryRunner.query(
      `INSERT INTO hour (hour,turno) VALUES ('01:00:00',3)`
    );
    await queryRunner.query(
      `INSERT INTO hour (hour,turno) VALUES ('02:00:00',3)`
    );
    await queryRunner.query(
      `INSERT INTO hour (hour,turno) VALUES ('03:00:00',3)`
    );
    await queryRunner.query(
      `INSERT INTO hour (hour,turno) VALUES ('04:00:00',3)`
    );
    await queryRunner.query(
      `INSERT INTO hour (hour,turno) VALUES ('05:00:00',3)`
    );
    await queryRunner.query(
      `INSERT INTO hour (hour,turno) VALUES ('06:00:00',1)`
    );
    await queryRunner.query(
      `INSERT INTO hour (hour,turno) VALUES ('07:00:00',1)`
    );
    await queryRunner.query(
      `INSERT INTO hour (hour,turno) VALUES ('08:00:00',1)`
    );
    await queryRunner.query(
      `INSERT INTO hour (hour,turno) VALUES ('09:00:00',1)`
    );
    await queryRunner.query(
      `INSERT INTO hour (hour,turno) VALUES ('10:00:00',1)`
    );
    await queryRunner.query(
      `INSERT INTO hour (hour,turno) VALUES ('11:00:00',1)`
    );
    await queryRunner.query(
      `INSERT INTO hour (hour,turno) VALUES ('12:00:00',1)`
    );
    await queryRunner.query(
      `INSERT INTO hour (hour,turno) VALUES ('13:00:00',1)`
    );
    await queryRunner.query(
      `INSERT INTO hour (hour,turno) VALUES ('14:00:00',1)`
    );
    await queryRunner.query(
      `INSERT INTO hour (hour,turno) VALUES ('14:20:00',2)`
    );
    await queryRunner.query(
      `INSERT INTO hour (hour,turno) VALUES ('15:00:00',2)`
    );
    await queryRunner.query(
      `INSERT INTO hour (hour,turno) VALUES ('16:00:00',2)`
    );
    await queryRunner.query(
      `INSERT INTO hour (hour,turno) VALUES ('17:00:00',2)`
    );
    await queryRunner.query(
      `INSERT INTO hour (hour,turno) VALUES ('18:00:00',2)`
    );
    await queryRunner.query(
      `INSERT INTO hour (hour,turno) VALUES ('19:00:00',2)`
    );
    await queryRunner.query(
      `INSERT INTO hour (hour,turno) VALUES ('20:00:00',2)`
    );
    await queryRunner.query(
      `INSERT INTO hour (hour,turno) VALUES ('21:00:00',2)`
    );
    await queryRunner.query(
      `INSERT INTO hour (hour,turno) VALUES ('22:00:00',2)`
    );
    await queryRunner.query(
      `INSERT INTO hour (hour,turno) VALUES ('22:35:00',3)`
    );
    await queryRunner.query(
      `INSERT INTO hour (hour,turno) VALUES ('23:00:00',3)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM hour WHERE hour = '00:00:00' `
    );
    await queryRunner.query(
      `DELETE FROM hour WHERE hour = '01:00:00' `
    );
    await queryRunner.query(
      `DELETE FROM hour WHERE hour = '02:00:00' `
    );
    await queryRunner.query(
      `DELETE FROM hour WHERE hour = '03:00:00' `
    );
    await queryRunner.query(
      `DELETE FROM hour WHERE hour = '04:00:00' `
    );
    await queryRunner.query(
      `DELETE FROM hour WHERE hour = '05:00:00' `
    );
    await queryRunner.query(
      `DELETE FROM hour WHERE hour = '06:00:00' `
    );
    await queryRunner.query(
      `DELETE FROM hour WHERE hour = '07:00:00' `
    );
    await queryRunner.query(
      `DELETE FROM hour WHERE hour = '08:00:00' `
    );
    await queryRunner.query(
      `DELETE FROM hour WHERE hour = '09:00:00' `
    );
    await queryRunner.query(
      `DELETE FROM hour WHERE hour = '10:00:00' `
    );
    await queryRunner.query(
      `DELETE FROM hour WHERE hour = '11:00:00' `
    );
    await queryRunner.query(
      `DELETE FROM hour WHERE hour = '12:00:00' `
    );
    await queryRunner.query(
      `DELETE FROM hour WHERE hour = '13:00:00' `
    );
    await queryRunner.query(
      `DELETE FROM hour WHERE hour = '14:00:00' `
    );
    await queryRunner.query(
      `DELETE FROM hour WHERE hour = '14:20:00' `
    );
    await queryRunner.query(
      `DELETE FROM hour WHERE hour = '15:00:00' `
    );
    await queryRunner.query(
      `DELETE FROM hour WHERE hour = '16:00:00' `
    );
    await queryRunner.query(
      `DELETE FROM hour WHERE hour = '17:00:00' `
    );
    await queryRunner.query(
      `DELETE FROM hour WHERE hour = '18:00:00' `
    );
    await queryRunner.query(
      `DELETE FROM hour WHERE hour = '19:00:00' `
    );
    await queryRunner.query(
      `DELETE FROM hour WHERE hour = '20:00:00' `
    );
    await queryRunner.query(
      `DELETE FROM hour WHERE hour = '21:00:00' `
    );
    await queryRunner.query(
      `DELETE FROM hour WHERE hour = '22:00:00' `
    );
    await queryRunner.query(
      `DELETE FROM hour WHERE hour = '22:35:00' `
    );
    await queryRunner.query(
      `DELETE FROM hour WHERE hour = '23:00:00' `
    );
  }
}


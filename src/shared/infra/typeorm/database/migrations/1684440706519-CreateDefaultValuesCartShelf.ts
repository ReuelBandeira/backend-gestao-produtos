import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDefaultValuesCartShelf1684440706519 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.query(
      `INSERT INTO cart_shelf (code_shelf, description) VALUES ('PR_01', 'Prateleira 01')`
    );
    await queryRunner.query(
      `INSERT INTO cart_shelf (code_shelf, description) VALUES ('PR_02', 'Prateleira 02')`
    );
    await queryRunner.query(
      `INSERT INTO cart_shelf (code_shelf, description) VALUES ('PR_03', 'Prateleira 03')`
    );
    await queryRunner.query(
      `INSERT INTO cart_shelf (code_shelf, description) VALUES ('PR_04', 'Prateleira 04')`
    );
    await queryRunner.query(
      `INSERT INTO cart_shelf (code_shelf, description) VALUES ('PR_05', 'Prateleira 05')`
    );
    await queryRunner.query(
      `INSERT INTO cart_shelf (code_shelf, description) VALUES ('PR_06', 'Prateleira 06')`
    );
    await queryRunner.query(
      `INSERT INTO cart_shelf (code_shelf, description) VALUES ('PR_07', 'Prateleira 07')`
    );
    await queryRunner.query(
      `INSERT INTO cart_shelf (code_shelf, description) VALUES ('PR_08', 'Prateleira 08')`
    );
    await queryRunner.query(
      `INSERT INTO cart_shelf (code_shelf, description) VALUES ('PR_09', 'Prateleira 09')`
    );
    await queryRunner.query(
      `INSERT INTO cart_shelf (code_shelf, description) VALUES ('PR_10', 'Prateleira 10')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM code_shelf WHERE code_shelf = 'PR_01' `
    );
    await queryRunner.query(
      `DELETE FROM code_shelf WHERE code_shelf = 'PR_02' `
    );
    await queryRunner.query(
      `DELETE FROM code_shelf WHERE code_shelf = 'PR_03' `
    );
    await queryRunner.query(
      `DELETE FROM code_shelf WHERE code_shelf = 'PR_04' `
    );
    await queryRunner.query(
      `DELETE FROM code_shelf WHERE code_shelf = 'PR_05' `
    );
    await queryRunner.query(
      `DELETE FROM code_shelf WHERE code_shelf = 'PR_06' `
    );
    await queryRunner.query(
      `DELETE FROM code_shelf WHERE code_shelf = 'PR_07' `
    );
    await queryRunner.query(
      `DELETE FROM code_shelf WHERE code_shelf = 'PR_08' `
    );
    await queryRunner.query(
      `DELETE FROM code_shelf WHERE code_shelf = 'PR_09' `
    );
    await queryRunner.query(
      `DELETE FROM code_shelf WHERE code_shelf = 'PR_10' `
    );

  }
}


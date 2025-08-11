import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDefaultValuesWorkstationWorkgroup1677609239610
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO workgroups (name) VALUES ('Reparo')`);

    await queryRunner.query(
      `INSERT INTO workstations (name, workgroup_id) VALUES ('Reparo_01', 1)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM workstations WHERE name = 'Reparo_01'`
    );

    await queryRunner.query(`DELETE FROM workgroups WHERE name = 'Reparo'`);
  }
}

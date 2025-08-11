import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnObservationTechnicalInRepair1691170125124 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('repairs', [
      new TableColumn({
        name: 'observation_technical',
        type: 'varchar(255)',
        isNullable: true,
      })
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('repairs', [
      new TableColumn({
        name: 'observation_technical',
        type: 'varchar(255)',
        isNullable: true,
      })
    ])
  }

}

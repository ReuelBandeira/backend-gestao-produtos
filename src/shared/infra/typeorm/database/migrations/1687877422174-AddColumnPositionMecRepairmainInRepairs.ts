import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnPositionMecRepairmainInRepairs1687877422174 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'repairs',
      new TableColumn({
        name: 'mechanical_position_repairman',
        type: 'varchar(100)',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      'repairs',
      new TableColumn({
        name: 'mechanical_position_repairman',
        type: 'varchar(100)',
        isNullable: true,
      })
    );
  }

}


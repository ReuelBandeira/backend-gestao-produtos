import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterColumnsAmountUsedToolingControl1674074618188 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'tooling_control',
      'amount_used',
      new TableColumn({
        name: 'amount_used',
        type: 'int(11)',
        isNullable: true
      })

    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'tooling_control',
      'amount_used',
      new TableColumn({
        name: 'amount_used',
        type: 'int(11)',
        isNullable: true
      })

    );
  }

}




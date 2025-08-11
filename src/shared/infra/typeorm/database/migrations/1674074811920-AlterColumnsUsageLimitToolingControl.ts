import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterColumnsUsageLimitToolingControl1674074811920 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'tooling_control',
      'usage_limit',
      new TableColumn({
        name: 'usage_limit',
        type: 'int(11)',
        isNullable: true
      })

    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'tooling_control',
      'usage_limit',
      new TableColumn({
        name: 'usage_limit',
        type: 'int(11)',
        isNullable: true
      })

    );
  }

}








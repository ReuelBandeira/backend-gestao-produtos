import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddNewColunmTableToolingControl1655941287821 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('tooling_control', [
      new TableColumn({
        name: 'id_toolgroup',
        type: 'int(11)',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('tooling_control', [
      new TableColumn({
        name: 'id_toolgroup',
        type: 'int(11)',
      }),
    ]);
  }

}

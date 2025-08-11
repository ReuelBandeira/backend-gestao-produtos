import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnNumberPlatesPanelInProduct1685036963861 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('products',
      new TableColumn({
        name: 'number_plates_panel',
        type: 'int(11)',
        default: 1,
      }),
    );

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products',
      new TableColumn({
        name: 'number_plates_panel',
        type: 'int(11)',
        default: 1,
      }),
    );

  }

}

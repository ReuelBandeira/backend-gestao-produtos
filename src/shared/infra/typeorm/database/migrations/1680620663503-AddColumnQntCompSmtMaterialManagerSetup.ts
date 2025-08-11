import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnQntCompSmtMaterialManagerSetup1680620663503 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('smt_material_manager_setup',
      new TableColumn({
        name: 'component_quantity',
        type: 'int(11)',
        isNullable: true
      }),
    );

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('smt_material_manager_setup',
      new TableColumn({
        name: 'component_quantity',
        type: 'int(11)',
        isNullable: true
      }),
    );

  }

}

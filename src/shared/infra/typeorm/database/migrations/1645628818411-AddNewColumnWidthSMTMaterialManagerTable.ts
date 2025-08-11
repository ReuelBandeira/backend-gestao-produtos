import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddNewColumnWidthSMTMaterialManagerTable1645628818411 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'smt_material_manager',
        new TableColumn({
          name: 'width',
          type: 'varchar(10)',
          isNullable: true,
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('smt_material_manager', 'width');
    }

}

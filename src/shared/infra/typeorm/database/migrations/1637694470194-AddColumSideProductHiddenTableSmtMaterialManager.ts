import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumSideProductHiddenTableSmtMaterialManager1637694470194 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'smt_material_manager',
        new TableColumn({
          name: 'side_product_hidden',
          type: 'varchar(1)',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('smt_material_manager', 'side_product_hidden');
    }

}

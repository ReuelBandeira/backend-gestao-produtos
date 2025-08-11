import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumStatusTableSmtMaterialManagersetup1637773616581 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'smt_material_manager_setup',
        new TableColumn({
          name: 'status',
          type: 'varchar(20)',
          default: '"accomplished"',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('smt_material_manager_setup', 'status');
    }

}

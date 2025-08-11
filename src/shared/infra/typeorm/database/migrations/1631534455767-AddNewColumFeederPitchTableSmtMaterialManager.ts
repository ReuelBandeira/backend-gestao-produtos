import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddNewColumFeederPitchTableSmtMaterialManager1631534455767 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'smt_material_manager',
            new TableColumn({
              name: 'feeder_pitch',
              type: 'int(11)',
              isNullable: true,
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('smt_material_manager', 'feeder_pitch');
    }

}

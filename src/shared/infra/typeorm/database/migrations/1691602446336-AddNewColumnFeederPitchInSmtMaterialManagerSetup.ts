import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddNewColumnFeederPitchInSmtMaterialManagerSetup1691602446336 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumns('smt_material_manager_setup', [

            new TableColumn({
                name: 'feeder_pitch',
                type: 'int(11)',
                isNullable: true,
            })
        ]);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('smt_material_manager_setup', [

            new TableColumn({
                name: 'feeder_pitch',
                type: 'int(11)',
                isNullable: true,
            }),
        ]);
    }


}

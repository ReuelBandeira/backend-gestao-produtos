import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddNewColumnFeederPitchInLogRefil1691601870781 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumns('log_refil', [

            new TableColumn({
                name: 'feeder_pitch',
                type: 'int(11)',
                isNullable: true,
            })
        ]);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('log_refil', [

            new TableColumn({
                name: 'feeder_pitch',
                type: 'int(11)',
                isNullable: true,
            }),
        ]);
    }


}

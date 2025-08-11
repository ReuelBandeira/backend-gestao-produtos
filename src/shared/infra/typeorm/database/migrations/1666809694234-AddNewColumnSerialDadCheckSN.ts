import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddNewColumnSerialDadCheckSN1666809694234 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumns('sn_detail', [

            new TableColumn({
                name: 'serial_dad',
                type: 'varchar(50)',
                isNullable: true,
            }),
            new TableColumn({
                name: 'solder_paste_serial',
                type: 'varchar(50)',
                isNullable: true,
            }),
        ]);


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('sn_detail', [

            new TableColumn({
                name: 'serial_dad',
                type: 'varchar(50)',
                isNullable: true,
            }),
            new TableColumn({
                name: 'solder_paste_serial',
                type: 'varchar(50)',
                isNullable: true,
            }),
        ]);
    }


}

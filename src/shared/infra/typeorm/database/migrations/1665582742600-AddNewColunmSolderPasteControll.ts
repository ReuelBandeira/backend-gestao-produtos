import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddNewColunmSolderPasteControll1665582742600 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn(
            'solder_paste_controll',
            new TableColumn({
                name: 'id_line',
                type: 'int(11)',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'solder_paste_controll',
            new TableForeignKey({
                name: 'FK_solder_paste_controll_ID_LINE',
                referencedTableName: 'lines',
                referencedColumnNames: ['id'],
                columnNames: ['id_line'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );


        await queryRunner.addColumns('solder_paste_controll', [
            new TableColumn({
                name: 'datetime_use_line',
                type: 'timestamp',
                isNullable: true,
            }),
        ]

        );


    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropForeignKey(
            'solder_paste_controll',
            'FK_solder_paste_controll_ID_LINE',
        );
        await queryRunner.dropColumn('solder_paste_controll', 'id_line');

        await queryRunner.dropColumn('solder_paste_controll',
            new TableColumn({
                name: 'datetime_use_line',
                type: 'timestamp',
                isNullable: true,
            }),
        );
    }

}

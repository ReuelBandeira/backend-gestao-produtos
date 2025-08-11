import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddColumDefectOriginInRepairs1691178980581 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn(
            'repairs',
            new TableColumn({
                name: 'defect_origin',
                type: 'int(11)',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'repairs',
            new TableForeignKey({
                name: 'FK_repairs_defect_origin',
                referencedTableName: 'origins',
                referencedColumnNames: ['id'],
                columnNames: ['defect_origin'],
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            }),
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropForeignKey('repairs', 'FK_repairs_defect_origin');
        await queryRunner.dropColumn('repairs', 'defect_origin');

    }
}

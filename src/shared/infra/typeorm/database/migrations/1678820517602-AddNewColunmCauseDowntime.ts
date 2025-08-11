import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddNewColunmCauseDowntime1678820517602 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn(
            'cause_downtime',
            new TableColumn({
                name: 'id_category_cause',
                type: 'int(11)',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'cause_downtime',
            new TableForeignKey({
                name: 'FK_cause_downtime_ID_CATEGORY_CAUSE',
                referencedTableName: 'category_cause_downtime',
                referencedColumnNames: ['id'],
                columnNames: ['id_category_cause'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropForeignKey(
            'cause_downtime',
            'FK_cause_downtime_ID_CATEGORY_CAUSE',
        );
        await queryRunner.dropColumn('cause_downtime', 'id_category_cause');

    }

}

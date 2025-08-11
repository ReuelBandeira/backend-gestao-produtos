import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddCollumnsLowerFreezerInSolderPasteControll1687202327136 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Add the columns
        await queryRunner.addColumns('solder_paste_controll', [
            new TableColumn({
                name: 'lower_freezer_status',
                type: 'varchar(50)',
                default: '"No"',
                isNullable: true,
            }),
            new TableColumn({
                name: 'datetime_lower_freezer',
                type: 'timestamp',
                isNullable: true
            }),
            new TableColumn({
                name: 'id_employee_lower_freezer',
                type: 'int(11)',
                isNullable: true,
            }),
            new TableColumn({
                name: 'description_lower_freezer',
                type: 'varchar(200)',
                isNullable: true,
            }),
        ]);

        // Create the foreign key relationship
        await queryRunner.createForeignKey('solder_paste_controll', new TableForeignKey({
            columnNames: ['id_employee_lower_freezer'],
            referencedTableName: 'employees',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the foreign key relationship
        await queryRunner.dropForeignKey('solder_paste_controll', 'FK_solder_paste_controll_id_employee_lower_freezer');

        // Drop the columns
        await queryRunner.dropColumns('solder_paste_controll', [
            'lower_freezer_status',
            'datetime_lower_freezer',
            'id_employee_lower_freezer',
            'description_lower_freezer',
        ]);
    }

}


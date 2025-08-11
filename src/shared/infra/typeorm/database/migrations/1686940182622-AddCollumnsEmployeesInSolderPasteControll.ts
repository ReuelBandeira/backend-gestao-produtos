import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddCollumnsEmployeesInSolderPasteControll1686940182622 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('solder_paste_controll', [
            new TableColumn({
              name: 'id_employee_freezer',
              type: 'int(11)',
              isNullable: true,
            }),
            new TableColumn({
              name: 'id_employee_unfreezer',
              type: 'int(11)',
              isNullable: true,
            }),
            new TableColumn({
              name: 'id_employee_use',
              type: 'int(11)',
              isNullable: true,
            }),
        ]);

        await queryRunner.createForeignKey('solder_paste_controll', new TableForeignKey({
            columnNames: ['id_employee_freezer'],
            referencedTableName: 'employees',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        }));

        await queryRunner.createForeignKey('solder_paste_controll', new TableForeignKey({
            columnNames: ['id_employee_unfreezer'],
            referencedTableName: 'employees',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        }));

        await queryRunner.createForeignKey('solder_paste_controll', new TableForeignKey({
            columnNames: ['id_employee_use'],
            referencedTableName: 'employees',
            referencedColumnNames: ['id'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('solder_paste_controll', 'FK_solder_paste_controll_id_employee_freezer');
        await queryRunner.dropForeignKey('solder_paste_controll', 'FK_solder_paste_controll_id_employee_unfreezer');
        await queryRunner.dropForeignKey('solder_paste_controll', 'FK_solder_paste_controll_id_employee_use');

        await queryRunner.dropColumns('solder_paste_controll', [
          new TableColumn({
            name: 'id_employee_freezer',
            type: 'int(11)',
            isNullable: true,
          }),
          new TableColumn({
            name: 'id_employee_unfreezer',
            type: 'int(11)',
            isNullable: true,
          }),
          new TableColumn({
            name: 'id_employee_use',
            type: 'int(11)',
            isNullable: true,
          })
        ]);
    }
}

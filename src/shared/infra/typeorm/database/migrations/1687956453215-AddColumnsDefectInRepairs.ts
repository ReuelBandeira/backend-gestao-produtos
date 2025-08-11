import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddColumnsDefectInRepairs1687956453215 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumn(
            'repairs',
            new TableColumn({
                name: 'id_employee_origin',
                type: 'int(11)',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'repairs',
            new TableForeignKey({
                name: 'FK_repairs_id_employee_origin',
                referencedTableName: 'employees',
                referencedColumnNames: ['id'],
                columnNames: ['id_employee_origin'],
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            }),
        );

        await queryRunner.addColumns('repairs', [
          new TableColumn({
              name: 'module',
              type: 'varchar(150)',
              default: '"N/A"',
              isNullable: true,
          }),
      ]
      );


    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropForeignKey(
            'repairs',
            'FK_repairs_id_employee_origin',
        );
        await queryRunner.dropColumn('repairs', 'id_employee_origin');

        await queryRunner.dropColumn('repairs',
            new TableColumn({
              name: 'module',
              type: 'varchar(150)',
              default: '"N/A"',
              isNullable: true,
            }),
        );
    }

}

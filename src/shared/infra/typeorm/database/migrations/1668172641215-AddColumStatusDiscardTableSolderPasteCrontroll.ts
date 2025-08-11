import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumStatusDiscardTableSolderPasteCrontroll1668172641215 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('solder_paste_controll', [
            new TableColumn({
              name: 'discard_status',
              type:  'varchar(50)',
              default: '"No"',
              isNullable: true,
            }),
            new TableColumn({
                name: 'datetime_discard',
                type: 'timestamp',
              	isNullable: true
            }),
            new TableColumn({
              name: 'id_employee_discard',
              type: 'int(11)',
              isNullable: true,
          }),
          new TableColumn({
            name: 'description_discard',
            type:  'varchar(200)',
            isNullable: true,
          }),
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('solder_paste_controll', [
           new TableColumn({
              name: 'discard_status',
              type:  'varchar(50)',
              default: '"No"',
              isNullable: true,
            }),
            new TableColumn({
                name: 'datetime_discard',
                type: 'timestamp',
              	isNullable: true,
            }),
            new TableColumn({
              name: 'id_employee_discard',
              type: 'int(11)',
              isNullable: true,
          }),
          new TableColumn({
            name: 'description_discard',
            type:  'varchar(200)',
            isNullable: true,
          }),
        ])
    }

}



import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableSoldePasteControllFreezer1648674681384 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'solder_paste_controll',
          columns: [
            {
              name: 'id',
              type: 'int(11)',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'type_paste',
              type: 'varchar(100)',
            },
            {
              name: 'serial_paste',
              type: 'varchar(50)',
            },
            {
              name: 'datetime_freezer',
              type: 'timestamp',
              isNullable: true,
            },
            {
              name: 'datetime_unfreezer',
              type: 'timestamp',
              isNullable: true,
            },
            {
              name: 'datetime_use',
              type: 'timestamp',
              isNullable: true,
            },
            {
              name: 'datetime_label_printing',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'status',
              type: 'varchar(50)',
              default: '"online"',
              comment:
                '"This column has a three behavior - freezer, unfreezer and use."',
            },
            {
              name: 'id_employee',
              type: 'int(11)',
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()',
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              isNullable: true,
            },
            {
              name: 'deleted_at',
              type: 'timestamp',
              isNullable: true,
            },
          ],
          foreignKeys: [
            {
              referencedTableName: 'employees',
              referencedColumnNames: ['id'],
              columnNames: ['id_employee'],
              onUpdate: 'CASCADE',
              onDelete: 'RESTRICT',
            }
          ],


        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('solder_paste_controll');
    }

}

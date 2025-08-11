import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableSolderPasteTypeTime1649075105783 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'solder_paste_type_time',
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
              type: 'varchar(50)',
            },
            {
              name: 'thaw_time',
              type: 'int(11)',
            },
            {
              name: 'time_use_with_lid_closed',
              type: 'int(11)',
            },
            {
              name: 'time_use_with_lid_open',
              type: 'int(11)',
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

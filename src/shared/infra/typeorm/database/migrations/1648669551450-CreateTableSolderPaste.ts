import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableSolderPaste1648669551450 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'solder_paste',
          columns: [
            {
              name: 'id',
              type: 'int(11)',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'id_provider',
              type: 'int(11)',
            },
            {
              name: 'type_paste',
              type: 'varchar(100)',
            },
            {
              name: 'id_employee',
              type: 'int(11)',
            },
            {
              name: 'quantity',
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
            },
            {
              referencedTableName: 'provider',
              referencedColumnNames: ['id'],
              columnNames: ['id_provider'],
              onUpdate: 'CASCADE',
              onDelete: 'CASCADE',
            },
          ],


        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('solder_paste');
    }

}

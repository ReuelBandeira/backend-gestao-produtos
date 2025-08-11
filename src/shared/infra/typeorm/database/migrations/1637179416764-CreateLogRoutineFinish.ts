import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateLogRoutineFinish1637179416764 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'log_routine_finish',
          columns: [
            {
              name: 'id',
              type: 'int(11)',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'list_code',
              type: 'varchar(200)',
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
            },
          ]
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('log_routine_finish');
    }

}

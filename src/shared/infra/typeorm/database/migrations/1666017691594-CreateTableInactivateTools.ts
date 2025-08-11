import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableInactivateTools1666017691594 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'inactivate_tools',
              columns: [
                {
                  name: 'id',
                  type: 'int(11)',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: 'id_tooling_control',
                  type: 'int(11)',
                },
                {
                  name: 'reason_tool_inactivation',
                  type: 'varchar(100)',
                },
                {
                  name: 'created_at',
                  type: 'timestamp',
                  default: 'now()',
                },
                {
                  name: 'updated_at',
                  type: 'timestamp',
                  default: 'now()',
                },
                {
                  name: 'deleted_at',
                  type: 'timestamp',
                  isNullable: true,
                },
              ],
              foreignKeys: [
                {
                  referencedTableName: 'tooling_control',
                  referencedColumnNames: ['id'],
                  columnNames: ['id_tooling_control'],
                  onUpdate: 'CASCADE',
                  onDelete: 'RESTRICT',
                },
              ],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('inactivate_tools');
    }

}

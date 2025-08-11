import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class LogPing1629827891567 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'log_ping',
              columns: [
                {
                  name: 'id',
                  type: 'int(11)',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                    name: 'ip',
                    type: 'varchar(15)',
                    isNullable: false,
                },
                {
                    name: 'mac',
                    type: 'varchar(30)',
                    isNullable: false,
                },
                {
                    name: 'log',
                    type: 'blob',
                    isNullable: false,
                },
                {
                    name: 'status',
                    type: 'char(1)',
                    isNullable: false,
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
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('log_ping');
    }

}

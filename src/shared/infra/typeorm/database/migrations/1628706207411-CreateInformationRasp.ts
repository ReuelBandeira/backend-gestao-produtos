import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateInformationRasp1628706207411 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'information_rasp',
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
            },
            {
              name: 'serial',
              type: 'varchar(30)',
              isNullable: false,
              isUnique: true,
            },
            {
              name: 'mac',
              type: 'varchar(30)',
              isNullable: false,
            },
            {
              name: 'status_sync',
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
          ]
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('information_rasp');
    }

}

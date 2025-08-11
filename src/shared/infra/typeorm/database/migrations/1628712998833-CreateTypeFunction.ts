import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTypeFunction1628712998833 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'type_function',
          columns: [
            {
              name: 'id',
              type: 'int(11)',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'name',
              type: 'varchar(20)',
            },
            {
              name: 'status',
              type: 'char(1)',
            },
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}

import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumTypeCodeCause1664142016746 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumns('cause', [
        new TableColumn({
          name: 'code',
          type: 'varchar(100)',
          isUnique: true,
        }),
        new TableColumn({
          name: 'type',
          type: 'varchar(100 )',
        }),
      ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumns('cause', [
        new TableColumn({
          name: 'code',
          type: 'varchar(100)',
          isUnique: true,
        }),
        new TableColumn({
          name: 'type',
          type: 'varchar(100 )',
        }),
      ]);
    }

}



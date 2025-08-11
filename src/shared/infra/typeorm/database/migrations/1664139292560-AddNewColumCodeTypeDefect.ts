import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddNewColumCodeTypeDefect1664139292560 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumns('defect', [
        new TableColumn({
          name: 'code',
          type: 'varchar(100)',
          isUnique: true,
        }),
        new TableColumn({
          name: 'type',
          type: 'varchar(100)',
        }),
      ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumns('defect', [
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

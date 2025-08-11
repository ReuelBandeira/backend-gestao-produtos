import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumAlternativeComponentTableMachine1644368531128 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'tmp_machines',
        new TableColumn({
          name: 'alternative_component',
          type: 'varchar(50)',
          isNullable: true,
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('tmp_machines', 'alternative_component');
    }

}

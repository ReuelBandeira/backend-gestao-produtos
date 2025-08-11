import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnPositionMecinBom1690488465189 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'bom',
        new TableColumn({
            name: 'position_mec',
            type: 'text',
            isNullable: true,
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn(
        'bom',
        new TableColumn({
            name: 'position_mec',
            type: 'text',
            isNullable: true,
        }),
      );
    }

}

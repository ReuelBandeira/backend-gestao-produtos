import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnIsStencilInToolgroup1673024181506 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('toolgroup',
        new TableColumn({
          name: 'isStencil',
          type: 'boolean',
          default: false
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('toolgroup',
        new TableColumn({
          name: 'isStencil',
          type: 'boolean',
          default: false
        }),
      );
    }

}

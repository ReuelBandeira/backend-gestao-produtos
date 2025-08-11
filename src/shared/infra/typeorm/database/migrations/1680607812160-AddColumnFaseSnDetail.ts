import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnFaseSnDetail1680607812160 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('sn_detail',
        new TableColumn({
          name: 'fase',
          type: 'int(11)',
          isNullable: true
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('sn_detail',
        new TableColumn({
          name: 'fase',
          type: 'int(11)',
          isNullable: true
        }),
      );
    }

}

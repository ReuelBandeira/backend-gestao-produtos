import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnFaseTrackings1680607863617 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('trackings',
        new TableColumn({
          name: 'fase',
          type: 'int(11)',
          isNullable: true
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('trackings',
        new TableColumn({
          name: 'fase',
          type: 'int(11)',
          isNullable: true
        }),
      );
    }

}

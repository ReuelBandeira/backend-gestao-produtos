import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumProviderSolderPasteTypePaste1668515092695 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('solder_paste_type_time',
            new TableColumn({
              name: 'id_provider',
              type: 'int(11)',
              isNullable: true
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.dropColumn('solder_paste_type_time',
            new TableColumn({
              name: 'id_provider',
              type: 'int(11)',
              isNullable: true
            }),
          );
    }

}

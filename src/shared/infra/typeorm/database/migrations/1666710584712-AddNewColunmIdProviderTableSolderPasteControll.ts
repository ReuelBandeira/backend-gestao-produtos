import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddNewColunmIdProviderTableSolderPasteControll1666710584712 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('solder_paste_controll',
            new TableColumn({
              name: 'id_provider',
              type: 'int(11)',
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.dropColumn('solder_paste_controll',
            new TableColumn({
              name: 'id_provider',
              type: 'int(11)',
            }),
          );
    }

}

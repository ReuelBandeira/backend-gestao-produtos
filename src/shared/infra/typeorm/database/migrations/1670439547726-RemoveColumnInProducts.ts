import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class RemoveColumnInProducts1670439547726 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn('products',
        new TableColumn({
          name: 'number_plates',
          type: 'int(11)',
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumns('products', [
        new TableColumn({
          name: 'number_plates',
          type: 'int(11)',
        }),
      ]);
    }

}

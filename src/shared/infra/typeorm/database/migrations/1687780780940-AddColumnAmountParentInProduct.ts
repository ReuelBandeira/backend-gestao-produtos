import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnAmountParentInProduct1687780780940 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('products',
        new TableColumn({
          name: 'amount_parent',
          type: 'int(11)',
          isNullable: true,
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn('products',
        new TableColumn({
          name: 'amount_parent',
          type: 'int(11)',
          isNullable: true,
        }),
      );
    }

}

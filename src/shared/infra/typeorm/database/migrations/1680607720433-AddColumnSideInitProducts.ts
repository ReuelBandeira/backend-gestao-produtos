import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnSideInitProducts1680607720433 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('products',
      new TableColumn({
        name: 'side_init',
        type: 'varchar(50)',
        isNullable: true
      }),
    );

  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products',
      new TableColumn({
        name: 'side_init',
        type: 'varchar(50)',
        isNullable: true
      }),
    );

  }

}

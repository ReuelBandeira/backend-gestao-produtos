import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnsProducts1670434193049 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('products',
      new TableColumn({
        name: 'meta',
        type: 'int(11)',
        isNullable: true
      }),
    );

    await queryRunner.addColumn('products',
      new TableColumn({
        name: 'exception',
        type: 'int(11)',
        isNullable: true
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products',
      new TableColumn({
        name: 'meta',
        type: 'int(11)',
        isNullable: true
      }),
    );

    await queryRunner.dropColumn('products',
      new TableColumn({
        name: 'exception',
        type: 'int(11)',
        isNullable: true
      }),
    );
  }

}

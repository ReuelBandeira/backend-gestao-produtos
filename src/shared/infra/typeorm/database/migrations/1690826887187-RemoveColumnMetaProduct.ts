import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class RemoveColumnMetaProduct1690826887187 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products',
      new TableColumn({
        name: 'meta',
        type: 'int(11)',
        isNullable: true
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('products',
      new TableColumn({
        name: 'meta',
        type: 'int(11)',
        isNullable: true
      }),
    );
  }

}

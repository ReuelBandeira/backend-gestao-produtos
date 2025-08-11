import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnClientInProducts1685120616264 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('products',
      new TableColumn({
        name: 'client',
        type: 'varchar(200)',
        isNullable: true
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products',
      new TableColumn({
        name: 'client',
        type: 'varchar(200)',
        isNullable: true
      }),
    );
  }
}

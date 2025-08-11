import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnTypeProductionOrder1686744192599 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'production_order',
      new TableColumn({
        name: 'type',
        type: 'varchar(100)',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      'production_order',
      new TableColumn({
        name: 'type',
        type: 'varchar(100)',
        isNullable: true,
      })
    );
  }

}


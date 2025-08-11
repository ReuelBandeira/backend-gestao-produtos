import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnFnFactoryInMslManagement1686835775521 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('msl_management',
      new TableColumn({
        name: 'fn_factory',
        type: 'varchar(50)',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('msl_management',
      new TableColumn({
        name: 'fn_factory',
        type: 'varchar(50)',
        isNullable: true,
      }),
    );
  }

}

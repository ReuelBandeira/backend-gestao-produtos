import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterTableCheckToolPrinter1681472364690 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'check_tool_printer',
        new TableColumn({
          name: 'status',
          type: 'varchar(20)',
          isNullable: true,
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn(
       'check_tool_printer',
        new TableColumn({
          name: 'status',
          type: 'varchar(20)',
          isNullable: true,
        })
      );
    }

}

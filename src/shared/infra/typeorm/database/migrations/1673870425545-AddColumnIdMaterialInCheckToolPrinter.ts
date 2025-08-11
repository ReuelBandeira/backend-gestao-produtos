import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnIdMaterialInCheckToolPrinter1673870425545
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'check_tool_printer',
      new TableColumn({
        name: 'list_code',
        type: 'varchar(100)',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      'check_tool_printer',
      new TableColumn({
        name: 'list_code',
        type: 'varchar(100)',
      })
    );
  }
}

import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumnPathInTypeFunction1674070542279
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'type_function',
      new TableColumn({
        name: 'path',
        type: 'varchar(30)',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(
      'type_function',
      new TableColumn({
        name: 'path',
        type: 'varchar(30)',
      })
    );
  }
}

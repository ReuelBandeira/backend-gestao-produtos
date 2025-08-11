import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddColumnsCheckToolPrinter1676298200776
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'check_tool_printer',
      new TableColumn({
        name: 'id_line',
        type: 'int(11)',
        isNullable: false,
      })
    );

    await queryRunner.createForeignKey(
      'check_tool_printer',
      new TableForeignKey({
        referencedTableName: 'lines',
        referencedColumnNames: ['id'],
        columnNames: ['id_line'],
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      })
    );

    await queryRunner.addColumn(
      'check_tool_printer',
      new TableColumn({
        name: 'id_production_order',
        type: 'int(11)',
        isNullable: false,
      })
    );

    await queryRunner.createForeignKey(
      'check_tool_printer',
      new TableForeignKey({
        referencedTableName: 'production_order',
        referencedColumnNames: ['id'],
        columnNames: ['id_production_order'],
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('employees', [
      new TableColumn({
        name: 'id_line',
        type: 'int(11)',
        isNullable: false,
      }),
    ]);

    await queryRunner.dropForeignKeys('check_tool_printer', [
      new TableForeignKey({
        referencedTableName: 'lines',
        referencedColumnNames: ['id'],
        columnNames: ['id_line'],
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      }),
    ]);

    await queryRunner.dropColumns('employees', [
      new TableColumn({
        name: 'id_production_order',
        type: 'int(11)',
        isNullable: false,
      }),
    ]);

    await queryRunner.dropForeignKeys('check_tool_printer', [
      new TableForeignKey({
        referencedTableName: 'production_order',
        referencedColumnNames: ['id'],
        columnNames: ['id_production_order'],
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      }),
    ]);
  }
}

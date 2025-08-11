import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddNewColumnIdLineTableSETUP1624392047163
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'smt_material_manager_setup',
      new TableColumn({
        name: 'id_line',
        type: 'int(11)',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'smt_material_manager_setup',
      new TableForeignKey({
        name: 'FK_smt_material_manager_setup_ID_LINE',
        referencedTableName: 'lines',
        referencedColumnNames: ['id'],
        columnNames: ['id_line'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'smt_material_manager_setup',
      'FK_smt_material_manager_setup_ID_LINE',
    );
    await queryRunner.dropColumn('smt_material_manager_setup', 'id_line');
  }
}

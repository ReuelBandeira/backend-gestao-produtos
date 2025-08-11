import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AlterTableTracking1676488094230 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      'trackings',
      'next_work_station_id',
      'id_next_workgroup'
    );

    await queryRunner.changeColumn(
      'trackings',
      'id_next_workgroup',
      new TableColumn({
        name: 'id_next_workgroup',
        type: 'int(11)',
        isNullable: true,
      })
    );

    await queryRunner.createForeignKey(
      'trackings',
      new TableForeignKey({
        referencedTableName: 'workgroups',
        referencedColumnNames: ['id'],
        name: 'FK_id_next_workgroup',
        columnNames: ['id_next_workgroup'],
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn(
      'trackings',
      'id_next_workgroup',
      'next_work_station_id'
    );

    await queryRunner.changeColumn(
      'trackings',
      'id_next_workgroup',
      new TableColumn({
        name: 'id_next_workgroup',
        type: 'int(11)',
        isNullable: true,
      })
    );

    await queryRunner.dropForeignKey(
      'trackings',
      new TableForeignKey({
        referencedTableName: 'workgroups',
        referencedColumnNames: ['id'],
        name: 'FK_id_next_workgroup',
        columnNames: ['id_next_workgroup'],
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      })
    );
  }
}

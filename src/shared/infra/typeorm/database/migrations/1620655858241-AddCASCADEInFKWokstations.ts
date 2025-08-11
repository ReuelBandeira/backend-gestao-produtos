import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddCASCADEInFKWokstations1620655858241
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('workstations', 'FK_workgroup_id');
    await queryRunner.createForeignKey(
      'workstations',
      new TableForeignKey({
        name: 'FK_workgroup_id',
        referencedTableName: 'workgroups',
        referencedColumnNames: ['id'],
        columnNames: ['workgroup_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'workstations',
      new TableForeignKey({
        name: 'FK_workgroup_id',
        referencedTableName: 'workgroups',
        referencedColumnNames: ['id'],
        columnNames: ['workgroup_id'],
        onDelete: 'CASCADE',
        onUpdate: 'NO ACTION',
      }),
    );
  }
}

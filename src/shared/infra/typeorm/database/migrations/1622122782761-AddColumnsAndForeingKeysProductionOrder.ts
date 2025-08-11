import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddColumnsProductionOrder1622122782761
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('production_order', [
      new TableColumn({
        name: 'id_employee',
        type: 'int(11)',
        isNullable: true,
      }),
    ]);

    await queryRunner.createForeignKeys('production_order', [
      new TableForeignKey({
        referencedTableName: 'route_head',
        referencedColumnNames: ['id'],
        columnNames: ['id_route_code'],
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      }),

      new TableForeignKey({
        referencedTableName: 'employees',
        referencedColumnNames: ['id'],
        columnNames: ['id_employee'],
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('production_order', [
      new TableColumn({
        name: 'id_employee',
        type: 'int(11)',
        isNullable: true,
      }),
    ]);

    await queryRunner.dropForeignKeys('production_order', [
      new TableForeignKey({
        referencedTableName: 'route_head',
        referencedColumnNames: ['id'],
        columnNames: ['id_route_code'],
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      }),

      new TableForeignKey({
        referencedTableName: 'employees',
        referencedColumnNames: ['id'],
        columnNames: ['id_employee'],
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      }),
    ]);
  }
}

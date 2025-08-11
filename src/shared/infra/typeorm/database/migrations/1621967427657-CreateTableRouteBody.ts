import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableRouteBody1621967427657 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'route_body',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'route_head_id',
            type: 'int(11)',
          },
          {
            name: 'workgroup_id',
            type: 'int(11)',
          },
          {
            name: 'next_workgroup_id',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'isObligatory',
            type: 'boolean',
            default: true,
          },
          {
            name: 'hasRework',
            type: 'boolean',
            default: false,
          },
          {
            name: 'order',
            type: 'int(11)',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            name: 'FK_route_head_id',
            referencedTableName: 'route_head',
            referencedColumnNames: ['id'],
            columnNames: ['route_head_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FK_workgroups_id',
            referencedTableName: 'workgroups',
            referencedColumnNames: ['id'],
            columnNames: ['workgroup_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'FK_next_workgroup_id',
            referencedTableName: 'workgroups',
            referencedColumnNames: ['id'],
            columnNames: ['next_workgroup_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('route_body');
  }
}

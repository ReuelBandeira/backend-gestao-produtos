import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSyncRasp1628707609497 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sync_rasp',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'id_line',
            type: 'int(11)',
            isNullable: false,
          },
          {
            name: 'id_work_station',
            type: 'int(11)',
            isNullable: false,
          },
          {
            name: 'ip_local',
            type: 'varchar(15)',
          },
          {
            name: 'ip_server',
            type: 'varchar(15)',
          },
          {
            name: 'serial',
            type: 'varchar(30)',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            referencedTableName: 'lines',
            referencedColumnNames: ['id'],
            columnNames: ['id_line'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'workstations',
            referencedColumnNames: ['id'],
            columnNames: ['id_work_station'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sync_rasp');
  }
}

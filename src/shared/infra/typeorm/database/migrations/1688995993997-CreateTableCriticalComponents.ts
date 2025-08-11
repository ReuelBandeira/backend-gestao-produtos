import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableCriticalComponents1688995993997 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'critical_components',
          columns: [
            {
              name: 'id',
              type: 'int(11)',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'component',
              type: 'varchar(50)',
            },
            {
              name: 'component_description',
              type: 'varchar(200)',
            },
            {
              name: 'component_quantity',
              type: 'int(11)',
            },
            {
              name: 'component_quantity_bom',
              type: 'int(11)',
            },
            {
              name: 'usage_percentage',
              type: 'int(11)',
              default: 90
            },
            {
              name: 'used_quantity',
              type: 'int(11)',
            },
            {
              name: 'kit_quantity',
              type: 'int(11)',
              isNullable: true
            },
            {
              name: 'list_code',
              type: 'varchar(200)',
            },
            {
              name: 'id_line',
              type: 'int(11)',
              isNullable: true,
            },
            {
              name: 'machine',
              type: 'varchar(200)',
            },
            {
              name: 'module',
              type: 'varchar(50)',
            },
            {
              name: 'side',
              type: 'int(11)',
            },
            {
              name: 'position',
              type: 'int(11)',
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
            }
          ],
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('critical_components');
    }

}

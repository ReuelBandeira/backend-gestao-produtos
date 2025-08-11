import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateVersionListMM1623937103309 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'version_list_material_manager',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'list_code',
            type: 'varchar(200)',
          },
          {
            name: 'struct_code',
            type: 'varchar(50)',
          },

          {
            name: 'version',
            type: 'varchar(50)',
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('version_list_material_manager');
  }
}

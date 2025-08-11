import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTablePlateCount1639064085964 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'plate_count',
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

          ]
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('plate_count');
    }

}

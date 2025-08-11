import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableHistoryMachineSN1684523460467 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table(
          {
            name: "machines_history_serial",
            columns: [
              {
                name: 'id',
                type: 'int(11)',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
              },
              {
                name: 'serial_number',
                type: 'varchar(50)',
              },
              {
                name: 'model',
                type: 'varchar(50)',
              },
              {
                name: 'description',
                type: 'varchar(50)',
              },
              {
                name: 'manufacturer',
                type: 'varchar(50)',
              },
              {
                name: 'serial_machines',
                type: 'varchar(50)',
              },
              {
                name: 'voltage',
                type: 'varchar(50)',
              },
              {
                name: 'id_line',
                type: 'int(5)',
              },
              {
                name: 'manufacturing_date',
                type: 'varchar(50)',
              },
              {
                name: 'status',
                type: 'varchar(100)',
              },
              {
                name: 'line_layout',
                type: 'int(5)',
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
            ]
          }
        )


      )


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('machines_history_serial');
    }

}

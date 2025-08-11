import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTrackings1665581341416 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'trackings',
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
                        name: 'mo_number',
                        type: 'varchar(50)',
                        isNullable: false
                    },
                    {
                        name: 'model_name',
                        type: 'varchar(25)',
                        isNullable: false,
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
                        name: 'next_work_station_id',
                        type: 'int(11)',
                        isNullable: false,
                    },
                    {
                        name: 'in_station_time',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'in_line_time',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'out_line_time',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'serial_raspberry',
                        type: 'varchar(25)',
                        isNullable: false,
                    },
                    {
                        name: 'id_employee',
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
                    {
                        name: 'serial_dad',
                        type: 'varchar(50)',
                        isNullable: true,
                    },
                ],
                foreignKeys: [
                    {
                        referencedTableName: 'employees',
                        referencedColumnNames: ['id'],
                        columnNames: ['id_employee'],
                        onUpdate: 'CASCADE',
                        onDelete: 'RESTRICT',
                    },
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
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('trackings')
    }

}

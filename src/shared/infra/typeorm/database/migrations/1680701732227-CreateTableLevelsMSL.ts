import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableLvelsMSL1680701732227 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'msl_levels',
                columns: [
                    {
                        name: 'id',
                        type: 'int(11)',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'type',
                        type: 'varchar(250)',
                        isNullable: false,
                    },
                    {
                        name: 'hours',
                        type: 'int(11)',
                    },
                    {
                      name: 'percentage',
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
                ]
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('msl_levels');
    }

}

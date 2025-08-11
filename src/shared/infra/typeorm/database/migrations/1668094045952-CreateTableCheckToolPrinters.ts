import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableCheckToolPrinters1668094045952 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'check_tool_printer',
                columns: [
                    {
                        name: 'id',
                        type: 'int(11)',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'id_product',
                        type: 'int(11)',
                    },
                    {
                        name: 'id_toolgroup',
                        type: 'int(11)',
                    },
                    {
                        name: 'id_tooling_control',
                        type: 'int(11)',
                    },
                    {
                        name: 'id_squeegee',
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
                        referencedTableName: 'products',
                        referencedColumnNames: ['id'],
                        columnNames: ['id_product'],
                        onUpdate: 'CASCADE',
                        onDelete: 'RESTRICT',
                    },
                    {
                        referencedTableName: 'toolgroup',
                        referencedColumnNames: ['id'],
                        columnNames: ['id_toolgroup'],
                        onUpdate: 'CASCADE',
                        onDelete: 'RESTRICT',
                    },
                    {
                        referencedTableName: 'tooling_control',
                        referencedColumnNames: ['id'],
                        columnNames: ['id_tooling_control'],
                        onUpdate: 'CASCADE',
                        onDelete: 'RESTRICT',
                    },
                    {
                        referencedTableName: 'squeegees',
                        referencedColumnNames: ['id'],
                        columnNames: ['id_squeegee'],
                        onUpdate: 'CASCADE',
                        onDelete: 'RESTRICT',
                    },
                ],

            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('check_tool_printer');
    }

}

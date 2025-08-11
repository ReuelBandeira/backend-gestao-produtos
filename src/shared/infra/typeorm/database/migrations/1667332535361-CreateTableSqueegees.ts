import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableSqueegees1667332535361 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'squeegees',
                columns: [
                    {
                        name: 'id',
                        type: 'int(11)',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'code_squeegee',
                        type: 'varchar(50)',
                        isNullable: false,
                    },
                    {
                        name: 'description_squeegee',
                        type: 'varchar(50)',
                        isNullable: false,
                    },
                    {
                        name: 'status',
                        type: 'varchar(50)',
                        default: '"available"',  
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
        await queryRunner.dropTable('squeegees');
    }

}

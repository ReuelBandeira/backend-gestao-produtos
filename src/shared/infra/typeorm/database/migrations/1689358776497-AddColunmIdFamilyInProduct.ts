import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class AddColunmIdFamilyInProduct1689358776497 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Adicionar a coluna 'id_family' à tabela 'products'
        await queryRunner.addColumn('products',
            new TableColumn({
                name: 'id_family',
                type: 'int(11)',
                isNullable: true,
            }),
        );

        // Adicionar a chave de relacionamento
        await queryRunner.createForeignKey('products',
            new TableForeignKey({
                columnNames: ['id_family'],
                referencedTableName: 'family_record',
                referencedColumnNames: ['id'],
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remover a chave de relacionamento
        await queryRunner.dropForeignKey('products', 'FK_products_family_record');

        // Remover a coluna 'id_family' da tabela 'products'
        await queryRunner.dropColumn('products', 'id_family');
    }
}

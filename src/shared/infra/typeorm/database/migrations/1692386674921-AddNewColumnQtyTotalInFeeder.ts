import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddNewColumnQtyTotalInFeeder1692386674921 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumns('feeders', [

            new TableColumn({
                name: 'used_qty_total',
                type: 'int(11)',
                isNullable: true,
                default: 0
            })
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('feeders', [

            new TableColumn({
                name: 'used_qty_total',
                type: 'int(11)',
                isNullable: true,
                default: 0
            }),
        ]);
    }

}

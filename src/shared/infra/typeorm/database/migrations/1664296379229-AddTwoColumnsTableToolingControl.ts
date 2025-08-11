import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddTwoColumnsTableToolingControl1664296379229 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('tooling_control', [
            new TableColumn({
                name: 'amount_used',
                type: 'int(11)',
            }),
            new TableColumn({
                name: 'usage_limit',
                type: 'int(11)',
            }),
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('tooling_control', [
            new TableColumn({
                name: 'amount_used',
                type: 'int(11)',
            }),
            new TableColumn({
                name: 'usage_limit',
                type: 'int(11)',
            }),
        ])
    }

}

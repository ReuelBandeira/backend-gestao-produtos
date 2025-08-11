import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddNewColunmStatusTableToolingControl1666018979155 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('tooling_control', 
            new TableColumn({
              name: 'status',
              type: 'varchar(50)',
              default: '"available"'
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('tooling_control',
            new TableColumn({
              name: 'status',
              type: 'varchar(50)',
              default: '"available"',
            }),
          );
    }

}

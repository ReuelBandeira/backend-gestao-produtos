import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";
// testeeeee
export class AddColummSerialNumberinRepair1689599158876 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumn(
        'repairs',
        new TableColumn({
            name: 'serial_son',
            type: 'varchar(50)',
            isNullable: true,
        }),
      );

      await queryRunner.addColumn(
        'repairs',
        new TableColumn({
            name: 'fase',
            type: 'int',
            default: 0,
            isNullable: true,
        }),
      );


    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropColumn(
        'repairs',
        new TableColumn({
            name: 'serial_son',
            type: 'varchar(50)',
            isNullable: true,
        }),
      );

      await queryRunner.dropColumn(
        'repairs',
        new TableColumn({
            name: 'fase',
            type: 'int',
            default: 0,
            isNullable: true,
        }),
      );
    }

}

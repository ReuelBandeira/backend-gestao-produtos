import { MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnsDatesInRepairs1688048881210 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.addColumns('repairs', [
            new TableColumn({
                name: 'date_repair',
                type: 'timestamp',
                isNullable: true,
            }),
        ]
        );

        await queryRunner.addColumns('repairs', [
          new TableColumn({
              name: 'date_defect_origin',
              type: 'timestamp',
              isNullable: true,
          }),
      ]
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

          await queryRunner.addColumns('repairs', [
            new TableColumn({
                name: 'date_repair',
                type: 'timestamp',
                isNullable: true,
            }),
        ]
        );

        await queryRunner.dropColumn('repairs',
            new TableColumn({
              name: 'date_defect_origin',
              type: 'timestamp',
              isNullable: true,
            }),
        );
    }

}

import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnsInProvider1686309197861 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('provider',
      new TableColumn({
        name: 'protocol',
        type: 'varchar(200)',
        isNullable: true
      })
    );
    await queryRunner.addColumn('provider',
      new TableColumn({
        name: 'turns_on',
        type: 'varchar(200)',
        isNullable: true
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('provider',
      new TableColumn({
        name: 'protocol',
        type: 'varchar(200)',
        isNullable: true
      }),
    );
    await queryRunner.addColumn('provider',
      new TableColumn({
        name: 'turns_on',
        type: 'varchar(200)',
        isNullable: true
      })
    );
  }
}


import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class AddColumnsTypePlateAndCodePcbaAndTagInProducts1685452083476 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('products',
      new TableColumn({
        name: 'type_plate',
        type: 'varchar(50)',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn('products',
      new TableColumn({
        name: 'code_pcba',
        type: 'varchar(50)',
        isNullable: true,
      }),
    );
    await queryRunner.addColumn('products',
      new TableColumn({
        name: 'tag',
        type: 'varchar(50)',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products',
      new TableColumn({
        name: 'type_plate',
        type: 'varchar(50)',
        isNullable: true,
      }),
    );
    await queryRunner.dropColumn('products',
      new TableColumn({
        name: 'code_pcba',
        type: 'varchar(50)',
        isNullable: true,
      }),
    );
    await queryRunner.dropColumn('products',
      new TableColumn({
        name: 'tag',
        type: 'varchar(50)',
        isNullable: true,
      }),
    );
  }

}

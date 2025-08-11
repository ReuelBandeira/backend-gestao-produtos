import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class  AddColumTypeInOrigins16911739772266 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('origins', [


      new TableColumn({
        name: 'type',
        type: 'varchar(250 )',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('origins', [

      new TableColumn({
        name: 'type',
        type: 'varchar(250 )',
        isNullable: true,
      }),
    ]);
  }
}

import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddColumNumberPlatesProducts1650913729636 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('products', [


      new TableColumn({
        name: 'number_plates',
        type: 'int(11)',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('products', [

      new TableColumn({
        name: 'number_plates',
        type: 'int(11)',
      }),
    ]);
  }
}

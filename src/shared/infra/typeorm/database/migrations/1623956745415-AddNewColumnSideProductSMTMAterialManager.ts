import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddNewColumnSideProductSMTMAterialManager1623956745415
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'smt_material_manager',
      new TableColumn({
        name: 'side_product',
        type: 'varchar(2)',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('smt_material_manager', 'side_product');
  }
}

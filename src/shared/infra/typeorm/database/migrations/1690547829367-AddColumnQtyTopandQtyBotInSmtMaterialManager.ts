import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddColumnQtyTopandQtyBotInSmtMaterialManager1690547829367 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.addColumns('smt_material_manager', [
        new TableColumn({
          name: 'qtyTop',
          type: 'int(50)',
          isNullable: true,
        })
      ])

      await queryRunner.addColumns('smt_material_manager', [
        new TableColumn({
          name: 'qtyBot',
          type: 'int(50)',
          isNullable: true,
          default: 0
        })
      ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       // Drop the columns
       await queryRunner.dropColumns('smt_material_manager', [
        'qtyTop',
        'qtyBot',
    ]);
    }

}

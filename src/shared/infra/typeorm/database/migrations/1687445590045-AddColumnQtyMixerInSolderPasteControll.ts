import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnQtyMixerInSolderPasteControll1687445590045 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('solder_paste_controll', [
            new TableColumn({
              name: 'quantity_mixer',
              type: 'int(11)',
              isNullable: true,
            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('solder_paste_controll', [
          new TableColumn({
            name: 'quantity_mixer',
            type: 'int(11)',
            isNullable: true,
          })
        ])
    }

}





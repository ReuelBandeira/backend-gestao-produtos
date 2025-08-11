import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnStatusMixerInSolderPasteControll1687972954313 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('solder_paste_controll', [
            new TableColumn({
              name: 'status_mixer',
              type: 'varchar(50)',
              default: '"N/A"',
              isNullable: true,
            })
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('solder_paste_controll', [
          new TableColumn({
            name: 'status_mixer',
            type: 'varchar(50)',
            default: '"N/A"',
            isNullable: true,
          })
        ])
    }

}





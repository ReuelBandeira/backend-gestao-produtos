import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnsInSolderPasteControll1686775997843 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('solder_paste_controll', [
            new TableColumn({
              name: 'expiration_date',
              type: 'timestamp',
              isNullable: true,
            }),
            new TableColumn({
                name: 'manufacturing_date',
                type: 'timestamp',
                isNullable: true,
            }),
            new TableColumn({
              name: 'lot_number',
              type: 'int(11)',
              isNullable: true,
            }),
            new TableColumn({
              name: 'weight',
              type:  'int(11)',
              isNullable: true,
            }),
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns('solder_paste_controll', [
          new TableColumn({
            name: 'expiration_date',
            type: 'timestamp',
            isNullable: true,
          }),
          new TableColumn({
              name: 'manufacturing_date',
              type: 'timestamp',
              isNullable: true,
          }),
          new TableColumn({
            name: 'lot_number',
            type: 'int(11)',
            isNullable: true,
          }),
          new TableColumn({
            name: 'weight',
            type:  'int(11)',
            isNullable: true,
          }),
        ])
    }

}




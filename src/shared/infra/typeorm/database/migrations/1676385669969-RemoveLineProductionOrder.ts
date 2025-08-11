import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class RemoveLineProductionOrder1676385669969
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `production_order` DROP FOREIGN KEY `FK_fbbe62d0d852c96eb5016a1125a`'
    );
    await queryRunner.query(
      'ALTER TABLE `production_order` DROP COLUMN `id_line`'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `production_order` DROP FOREIGN KEY `FK_fbbe62d0d852c96eb5016a1125a`'
    );
    await queryRunner.query(
      'ALTER TABLE `production_order` DROP COLUMN `id_line`'
    );
  }
}

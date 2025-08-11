import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTypeFeeder1623248964658 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'type_feeder',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar(20)',
          },
        ],
      }),
    );

    await queryRunner.query(
      `INSERT INTO type_feeder (name) VALUES ('8MM'),('10MM'),('12MM')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('type_feeder');
  }
}

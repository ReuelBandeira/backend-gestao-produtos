import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableProductivityJustification1687803009084 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'productivity_justification',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'hour',
            type: 'varchar(30)',
          },
          {
            name: 'day',
            type: 'varchar(30)',
          },
          {
            name: 'planned',
            type: 'int(11)',
          },
          {
            name: 'produced',
            type: 'int(11)',
          },
          {
            name: 'los',
            type: 'int(11)',
          },
          {
            name: 'justification',
            type: 'varchar(700)',
          },
          {
            name: 'id_line',
            type: 'int(11)',
          },
          {
            name: 'id_employee',
            type: 'int(11)',
          },
          {
            name: 'id_shift',
            type: 'int(11)',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
        foreignKeys: [
          {
            referencedTableName: 'shifts',
            referencedColumnNames: ['id'],
            columnNames: ['id_shift'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'employees',
            referencedColumnNames: ['id'],
            columnNames: ['id_employee'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'lines',
            referencedColumnNames: ['id'],
            columnNames: ['id_line'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          }
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('productivity_justification');
  }

}

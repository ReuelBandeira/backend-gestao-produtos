import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableRepairs1676566859060 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'repairs',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'id_tracking',
            type: 'int(11)',
          },
          {
            name: 'id_defect',
            type: 'int(11)',
          },
          {
            name: 'id_operator',
            type: 'int(11)',
          },
          {
            name: 'id_cause',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'id_solution',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'id_origin',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'id_technical',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'id_repairman',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'mechanical_position',
            type: 'varchar(50)',
            isNullable: true,
          },
          {
            name: 'observation',
            type: 'varchar(280)',
            isNullable: true,
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
            referencedTableName: 'trackings',
            referencedColumnNames: ['id'],
            columnNames: ['id_tracking'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'defect',
            referencedColumnNames: ['id'],
            columnNames: ['id_defect'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'cause',
            referencedColumnNames: ['id'],
            columnNames: ['id_cause'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'solutions',
            referencedColumnNames: ['id'],
            columnNames: ['id_solution'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'origins',
            referencedColumnNames: ['id'],
            columnNames: ['id_origin'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'employees',
            referencedColumnNames: ['id'],
            columnNames: ['id_operator'],
            name: 'FK_id_operator',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'employees',
            referencedColumnNames: ['id'],
            columnNames: ['id_technical'],
            name: 'FK_id_technical',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'employees',
            referencedColumnNames: ['id'],
            columnNames: ['id_repairman'],
            name: 'FK_id_repairman',
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('repairs');
  }
}

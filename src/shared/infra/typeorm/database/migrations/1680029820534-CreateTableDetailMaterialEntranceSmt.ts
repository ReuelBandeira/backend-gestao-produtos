import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableDetailMaterialEntranceSmt1680029820534 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'detail_material_entrance_smt',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'id_material_entrance_smt',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'component',
            type: 'varchar(250)',
            isNullable: true,
          },
          {
            name: 'string_qr_code',
            type: 'varchar(250)',
            isNullable: true,
          },
          {
            name: 'serial_component',
            type: 'varchar(250)',
            isNullable: true,
          },
          {
            name: 'component_quantity',
            type: 'int(11)',
            isNullable: true,
          },
          {
            name: 'uc_code',
            type: 'varchar(250)',
            isNullable: true,
          },
          {
            name: 'main_component',
            type: 'varchar(250)',
            isNullable: true,
          },
          {
            name: 'id_employee',
            type: 'int(11)',
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
            referencedTableName: 'material_entrance_smt',
            referencedColumnNames: ['id'],
            columnNames: ['id_material_entrance_smt'],
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
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('detail_material_entrance_smt');
  }

}




import {MigrationInterface, QueryRunner,Table} from "typeorm";

export class CreateTableLogRefilAuthorization1641471832798 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {

    await queryRunner.createTable(
      new Table({
        name: 'log_refil_authorization',
        columns: [
          {
            name: 'id',
            type: 'int(11)',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          // numero da lista
          {
            name: 'list_code',
            type: 'varchar(200)',
          },
          // maquina
          {
            name: 'machine',
            type: 'varchar(50)',
          },
          // modulo
          {
            name: 'module',
            type: 'varchar(50)',
          },
          // lado
          {
            name: 'side',
            type: 'int(11)',
          },
          // posição
          {
            name: 'position',
            type: 'int(11)',
          },
          // componente Anterior
          {
            name: 'component_old',
            type: 'varchar(50)',
          },
          // Novo Comonente
          {
            name: 'component_new',
            type: 'varchar(50)',
          },

          //   status
          {
            name: 'status',
            type: 'varchar(200)',
            default: '"right"',
          },

          // usuario autorizador
          {
            name: 'id_employee_authorization',
            type: 'int(11)',
          },
          // usuario
          {
            name: 'id_employee',
            type: 'int(11)',
          },
          // data e hora de registro
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
            referencedTableName: 'employees',
            referencedColumnNames: ['id'],
            columnNames: ['id_employee'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
          {
            referencedTableName: 'employees',
            referencedColumnNames: ['id'],
            columnNames: ['id_employee_authorization'],
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('log_refil_authorization');
  }

}


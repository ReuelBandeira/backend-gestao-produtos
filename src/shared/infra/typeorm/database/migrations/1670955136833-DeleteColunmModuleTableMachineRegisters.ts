import {MigrationInterface, QueryRunner} from "typeorm";

export class DeleteColunmModuleTableMachineRegisters1670955136833 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `machine_registers`");
        await queryRunner.dropColumn("machine_registers", "module")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `machine_registers`");
        await queryRunner.dropColumn("machine_registers", "module")
    }

}


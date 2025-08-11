
import IModulesRepository from '@modules/module_machines/repositories/IModulesRepository';
import MaintenanceFeeder from '@modules/maintenance_feeder/infra/typeorm/entities/MaintenanceFeeder';
import { getRepository, Like, Repository } from 'typeorm';
import ICreateModulesDTO from '@modules/module_machines/dtos/IModulesDTO';
import DowntimeManagement from '@modules/downtime_management/infra/typeorm/entities/DowntimeManagement';
import Modules from '../entities/Modules';
import MachineRegistersModules from '@modules/machine_registers/infra/typeorm/entities/MachineRegistersModules';

const TOTAL_PER_PAGE = 11;

export default class ModulesRepository implements IModulesRepository {
  private ormRepository: Repository<Modules>;

  private ormMaintenanceRepository: Repository<MaintenanceFeeder>;

  private ormDowntimeManagementRepository: Repository<DowntimeManagement>;

  private ormMachinesModulesRepository: Repository<MachineRegistersModules>;


  constructor() {
    this.ormRepository = getRepository(Modules);
    this.ormMaintenanceRepository = getRepository(MaintenanceFeeder);
    this.ormDowntimeManagementRepository = getRepository(DowntimeManagement);
    this.ormMachinesModulesRepository = getRepository(MachineRegistersModules);
  }

  public async findById(id: number): Promise<Modules | undefined> {
    const type = await this.ormRepository.findOne({
      where: { id },
    });

    return type;
  }

  public async findByName(description: string): Promise<Modules | undefined> {
    const type = await this.ormRepository.findOne({
      where: { description }
    });

    return type;
  }


  public async findByNameSearch(
    description: string,
  ): Promise<(Modules | undefined)[] | undefined> {
    const type = await this.ormRepository.find({
      where: { description: Like(`%${description}%`) },
    });

    return type;
  }

  public async create(moduleData: ICreateModulesDTO): Promise<Modules> {
    const module = this.ormRepository.create(moduleData);
    await this.ormRepository.save(module);

    return module;
  }

  public async update(moduleData: Modules): Promise<Modules> {
    const module = await this.ormRepository.save(moduleData);
    return module;
  }

  public async findAllModule(page = 1,): Promise<Modules | Modules[]> {
    const module = await this.ormRepository.find({
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalModules = (await this.ormRepository.find()).length;

    return {
      module,
      totalPages: totalModules / TOTAL_PER_PAGE,
      totalModules,

    };
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  public async findAllModuleRegisters(): Promise<Modules | Modules[]> {
    const type = await this.ormRepository.find({
      order: { id: 'DESC' },
    });
    return type;
  }

  public async deleteValidation(
    id_type: number,
  ): Promise<DowntimeManagement[] > {
    const validation = await this.ormDowntimeManagementRepository
      .createQueryBuilder('dowtime_management')
      .select([
        'id',
        'id_type'
      ])
      .where({id_type})
      .getRawMany();

    return validation;
  }

  public async deleteValidationModule(
    id_module: number,
  ): Promise<DowntimeManagement[] > {
    const validation = await this.ormMachinesModulesRepository
      .createQueryBuilder('machine_registers_modules')
      .select([
        'id_module'
      ])
      .where({id_module})
      .getRawMany();

    return validation;
  }


}

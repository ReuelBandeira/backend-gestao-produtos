import ICreateMslMachinesDTO from '@modules/msl_machines/dtos/ICreateMslMachinesDTO';
import IMslMachinesRepository from '@modules/msl_machines/repositories/IMslMachinesRepository';
import { getRepository, Like, Repository } from 'typeorm';
import MslMachines from '../entities/MslMachines';

const TOTAL_PER_PAGE = 11;

export default class ActionRepository implements IMslMachinesRepository {
  private ormRepository: Repository<MslMachines>;

  constructor() {
    this.ormRepository = getRepository(MslMachines);
  }

  public async findByMachine(
    machine: string
  ): Promise<MslMachines | undefined> {
    return await this.ormRepository.findOne({
      where: {
        machine,
      },
    });
  }

  public async findById(id: number): Promise<MslMachines | undefined> {
    const action = await this.ormRepository.findOne({
      where: { id },
    });

    return action;
  }

  public async findByName(machine: string): Promise<MslMachines | undefined> {
    const action = await this.ormRepository.findOne({
      where: { machine },
    });

    return action;
  }

  // public async findByCode(code: string): Promise<MslMachines| undefined> {
  //   const defect = await this.ormRepository
  //     .query(
  //       `${'SELECT * FROM action where code = "'}${code}"`
  //     );
  //   return defect;
  // }

  public async findByNameSearch(
    machine: string
  ): Promise<(MslMachines | undefined)[] | undefined> {
    const action = await this.ormRepository.find({
      where: { machine: Like(`%${machine}%`) },
    });

    return action;
  }

  public async create(actionData: ICreateMslMachinesDTO): Promise<MslMachines> {
    const action = this.ormRepository.create(actionData);
    await this.ormRepository.save(action);

    return action;
  }

  public async update(actionData: MslMachines): Promise<MslMachines> {
    const action = await this.ormRepository.save(actionData);
    return action;
  }

  public async findAllMslMachines(
    page = 1
  ): Promise<MslMachines | MslMachines[]> {
    const machines = await this.ormRepository.find({
      relations: ['employee'],
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalMachines = (await this.ormRepository.find()).length;

    return {
      machines,
      totalPages: totalMachines / TOTAL_PER_PAGE,
      totalMachines,
    };
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async findallMachinesNotPaginate(): Promise<MslMachines[]> {
    return await this.ormRepository.find({
      relations: ['employee'],
      order: {
        created_at: 'ASC',
      },
    });
  }
}

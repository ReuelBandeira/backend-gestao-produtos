import ICreateEmployeeDTO from '@modules/employee/dtos/ICreateEmployeeDTO';
import IWorkgroupRepository from '@modules/workgroups/repositories/IWorkgroupRepository';
import { getRepository, Like, Repository } from 'typeorm';
import Workgroup from '../entities/Workgroup';

const TOTAL_PER_PAGE = 11;

export default class WorkgroupsRepository implements IWorkgroupRepository {
  private ormRepository: Repository<Workgroup>;


  constructor() {
    this.ormRepository = getRepository(Workgroup);
  }

  public async findById(id: number): Promise<Workgroup | undefined> {
    const workgroup = await this.ormRepository.findOne({
      where: { id },
      relations: ['workstations'],
    });

    return workgroup;
  }

  public async findByName(name: string): Promise<Workgroup | undefined> {
    const workgroup = await this.ormRepository.findOne({
      where: { name },
      relations: ['workstations'],
    });

    return workgroup;
  }

  public async findByNameSearch(
    name: string,
  ): Promise<(Workgroup | undefined)[] | undefined> {
    const workgroup = await this.ormRepository.find({
      where: { name: Like(`%${name}%`) },
      relations: ['workstations'],
    });

    return workgroup;
  }

  public async create(workgroupData: ICreateEmployeeDTO): Promise<Workgroup> {
    const workgroup = this.ormRepository.create(workgroupData);
    await this.ormRepository.save(workgroup);

    return workgroup;
  }

  public async update(workgroupData: Workgroup): Promise<Workgroup> {
    const workgroup = await this.ormRepository.save(workgroupData);
    return workgroup;
  }

  public async findAllWorkgroups(page=1,): Promise<Workgroup | Workgroup[]> {
    const workgroups = await this.ormRepository.find({
      order: { id: 'DESC' },
      relations: ['workstations'],
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalWorkgroups = (await this.ormRepository.find()).length;

    return {
      workgroups,
      totalPages:totalWorkgroups/ TOTAL_PER_PAGE,
      totalWorkgroups,

    };
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async findAllWorkGroupsList(page=1):Promise <Workgroup[]> {
    const workgroup = await this.ormRepository.find({
      order:{id:'DESC'},

      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    return  workgroup;
  }

}

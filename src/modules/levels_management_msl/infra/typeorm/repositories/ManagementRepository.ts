import ICreateManagementDTO from '@modules/levels_management_msl/dtos/ICreateManagementDTO';
import IManagementRepository from '@modules/levels_management_msl/repositories/IManagementRepository';

import { getRepository, Like, Repository } from 'typeorm';
import Management from '../entities/Management';

const TOTAL_PER_PAGE = 11;

export default class ManagementRepository implements IManagementRepository {
  private ormRepository: Repository<Management>;

  constructor() {
    this.ormRepository = getRepository(Management);

  }

  public async findById(id: number): Promise<Management | undefined> {
    const management = await this.ormRepository.findOne({
      where: { id },
    });

    return management;
  }

  public async findByName(type:string): Promise<Management  | undefined> {
    const management = await this.ormRepository.findOne({
      where: {type}
    });

    return management;
  }

  public async findByNameSearch(
    type: string,
  ): Promise<(Management | undefined)[] | undefined> {
    // eslint-disable-next-line no-shadow
    const management = await this.ormRepository.find({
      where: {type: Like(`%${type}%`) },
    });

    return management;
  }

  public async create(ManagementData: ICreateManagementDTO): Promise<Management> {
    // eslint-disable-next-line no-shadow
    const management = this.ormRepository.create(ManagementData);
    await this.ormRepository.save(management);

    return management;
  }

  public async update(ManagementData: Management): Promise<Management> {
    // eslint-disable-next-line no-shadow
    const management = await this.ormRepository.save(ManagementData);
    return management;
  }

  public async findAllManagement(page=1,): Promise<Management | Management[]> {
    // eslint-disable-next-line no-shadow
    const Management = await this.ormRepository.find({
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalManagement = (await this.ormRepository.find()).length;

    return {
      Management,
      totalPages:totalManagement/ TOTAL_PER_PAGE,
      totalManagement,

    };
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async findAllRegisters(): Promise<Management | Management[]> {
    // eslint-disable-next-line no-shadow
    const management = await this.ormRepository.find({
      order: { id: 'DESC' },
    });
    return management;
  }



}

import ICreateOvenDTO from '@modules/oven/dtos/ICreateOvenDTO';
import IOvenRepository from '@modules/oven/repositories/IOvenRepository';
import { getRepository, Like, Repository } from 'typeorm';
import Oven from '../entities/Oven';

const TOTAL_PER_PAGE = 11;

export default class OvenRepository implements IOvenRepository {
  private ormRepository: Repository<Oven>;

  constructor() {
    this.ormRepository = getRepository(Oven);

  }

  public async findById(id: number): Promise<Oven | undefined> {
    // eslint-disable-next-line no-shadow
    const Oven = await this.ormRepository.findOne({
      where: { id },
    });

    return Oven;
  }

  public async findByName(description: string): Promise<Oven | undefined> {
    // eslint-disable-next-line no-shadow
    const Oven = await this.ormRepository.findOne({
      where: { description }
    });

    return Oven;
  }

  public async findByNameSearch(
    description: string,
  ): Promise<(Oven | undefined)[]> {
      const ovensWithEmployeeUsername = await this.ormRepository.createQueryBuilder('oven')
          .leftJoinAndSelect('oven.employee', 'employee')
          .select(['oven', 'employee.username'])
          .where('oven.description LIKE :description', { description: `%${description}%` })
          .getMany();

      return ovensWithEmployeeUsername;
  }


  public async create(OvenData: ICreateOvenDTO): Promise<Oven> {
    // eslint-disable-next-line no-shadow
    const Oven = this.ormRepository.create(OvenData);
    await this.ormRepository.save(Oven);

    return Oven;
  }

  public async update(OvenData: Oven): Promise<Oven> {
    // eslint-disable-next-line no-shadow
    const Oven = await this.ormRepository.save(OvenData);
    return Oven;
  }

  public async findAllOven(page=1,): Promise<Oven | Oven[]> {
    // eslint-disable-next-line no-shadow
    const Oven = await this.ormRepository.find({
      relations: ['employee'],
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalOven = (await this.ormRepository.find()).length;

    return {
      Oven,
      totalPages:totalOven/ TOTAL_PER_PAGE,
      totalOven,

    };
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async findAllRegisters(): Promise<Oven| Oven[]> {
    // eslint-disable-next-line no-shadow
    const Oven = await this.ormRepository.find({
      relations: ['employee'],
      order: { id: 'DESC' },
    });
    return Oven;
  }

}


import ICreateMslMovementDTO from '@modules/msl_movements/dtos/ICreateMslMovementDTO';
import IMslMovementRepository from '@modules/msl_movements/repositories/IMslMovementRepository';

import { getRepository, Repository } from 'typeorm';
import MslMovement from '../entities/MslMovement';

const TOTAL_PER_PAGE = 11;

export default class MslMovementRepository implements IMslMovementRepository {
  private ormRepository: Repository<MslMovement>;

  constructor() {
    this.ormRepository = getRepository(MslMovement);
  }

  public async findByComponent(
    component: string
  ): Promise<MslMovement | undefined> {
    return await this.ormRepository.findOne({
      where: {
        component
      },
      order: {
        created_at: 'DESC'
      }

    });
  }

  public async findLimit(): Promise<MslMovement[]> {
    return await this.ormRepository.find({
      relations: ['employee', 'machine'],
      take: 50,
      order: {
        created_at: 'DESC',
      },
    });
  }

  public async findByComponentOpen(
    component: string,
    serial: string
  ): Promise<MslMovement | undefined> {
    return await this.ormRepository.findOne({
      relations: ['machine'],
      where: {
        component,
        serial,
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  public async create(data: ICreateMslMovementDTO): Promise<MslMovement> {
    const mslMovement = this.ormRepository.create(data);
    await this.ormRepository.save(mslMovement);

    return mslMovement;
  }

  // public async findByCompMslMovement(
  //   component: string
  // ): Promise<MslMovement [] | undefined> {
  //   const validation = await this.ormRepository
  //     .createQueryBuilder('msl_movements')
  //     .select([
  //       'msl_movements.id',
  //       'component',
  //       'total_time_open'
  //     ])
  //     .where({component})
  //     .getRawMany();

  //   return validation;
  // }

  public async findByCompMslMovement(
    component: string
  ): Promise<MslMovement[] | undefined> {
    return await this.ormRepository.find({
      where: {
        component,
      },
      order: {
        id: 'DESC',
      },
    });
  }
}

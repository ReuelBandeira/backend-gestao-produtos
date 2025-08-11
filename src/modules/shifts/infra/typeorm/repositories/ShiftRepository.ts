import { ICreateShiftDTO } from '@modules/shifts/dtos/ICreateShiftDTO';
import IPaginateShiftDTO from '@modules/shifts/dtos/IPaginateShiftDTO';
import IShiftRepository from '@modules/shifts/repositories/IShiftRepository';
import { getRepository, Repository, Like } from 'typeorm';
import Shift from '../entities/Shift';

const TOTAL_PER_PAGE = 11;

export default class ShiftRepository implements IShiftRepository {
  private ormRepository: Repository<Shift>;

  constructor() {
    this.ormRepository = getRepository(Shift);
  }

  public async findAllShifts(): Promise<Shift[]> {
    return await this.ormRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  public async findAllShiftsPaginate(page: number): Promise<IPaginateShiftDTO> {
    const [shifts, totalShifts] = await this.ormRepository.findAndCount({
      order: { created_at: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    return {
      shifts,
      totalPages: totalShifts / TOTAL_PER_PAGE,
      totalShifts,
    };
  }

  public async create(data: ICreateShiftDTO): Promise<Shift> {
    const shift = this.ormRepository.create(data);
    return await this.ormRepository.save(shift);
  }

  public async findById(id: number): Promise<Shift | undefined> {
    return await this.ormRepository.findOne({
      where: { id },
    });
  }

  public async findBySearch(name: string): Promise<Shift | undefined> {
    return await this.ormRepository.findOne({
      where: {
        name,
      },
    });
  }

  public async update(data: Shift): Promise<Shift | undefined> {
    await this.ormRepository.save(data);

    return await this.ormRepository.findOne(data.id);
  }
}

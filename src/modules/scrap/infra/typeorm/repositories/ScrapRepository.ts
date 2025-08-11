import { Between, getRepository, MoreThan, Repository } from 'typeorm';
import IScrapRepository from '@modules/scrap/repositories/IScrapRepository';
import ICreateScrapDTO from '@modules/scrap/dtos/ICreateScrapDTO';
import IFilterScrapDTO from '@modules/scrap/dtos/IFilterScrapDTO';
import IPaginateScrapDTO from '@modules/scrap/dtos/IPaginateScrapDTO';
import { zonedTimeToUtc } from 'date-fns-tz';
import { endOfDay, startOfDay } from 'date-fns';
import Scrap from '../entities/Scrap';

const TOTAL_PER_PAGE = 11;

export default class ScrapRepository implements IScrapRepository {
  private ormRepository: Repository<Scrap>;

  constructor() {
    this.ormRepository = getRepository(Scrap);
  }

  public async findByDate(date: Date): Promise<Scrap[]> {
    return await this.ormRepository.find({
      where: [
        {
          created_at: MoreThan(new Date(date)),
          type: 'painel',
        },
        {
          created_at: MoreThan(new Date(date)),
          type: 'placa',
        },
      ],
    });
  }

  async findByListCode(list_code: string): Promise<Scrap[]> {
    return await this.ormRepository.find({
      where: {
        list_code,
      },
    });
  }

  public async findAllScraps({
    serial_number,
    end_date,
    list_code,
    start_date,
  }: Omit<IFilterScrapDTO, 'page'>): Promise<Scrap[]> {
    let wherefind;

    if (list_code && serial_number && start_date && end_date) {
      wherefind = {
        list_code,
        serial_number,
        created_at: Between(
          zonedTimeToUtc(startOfDay(start_date), 'UTC'),
          zonedTimeToUtc(endOfDay(end_date), 'UTC')
        ),
      };
    } else if (list_code && serial_number && (!start_date || !end_date)) {
      wherefind = {
        list_code,
        serial_number,
      };
    } else if (list_code && !serial_number && start_date && end_date) {
      wherefind = {
        list_code,
        created_at: Between(
          zonedTimeToUtc(startOfDay(start_date), 'UTC'),
          zonedTimeToUtc(endOfDay(end_date), 'UTC')
        ),
      };
    } else if (list_code && !serial_number && (!start_date || !end_date)) {
      wherefind = {
        list_code,
      };
    } else if (!list_code && serial_number && start_date && end_date) {
      wherefind = {
        serial_number,
        created_at: Between(
          zonedTimeToUtc(startOfDay(start_date), 'UTC'),
          zonedTimeToUtc(endOfDay(end_date), 'UTC')
        ),
      };
    } else if (!list_code && serial_number && (!start_date || !end_date)) {
      wherefind = {
        serial_number,
      };
    } else if (!list_code && !serial_number && start_date && end_date) {
      wherefind = {
        created_at: Between(
          zonedTimeToUtc(startOfDay(start_date), 'UTC'),
          zonedTimeToUtc(endOfDay(end_date), 'UTC')
        ),
      };
    }

    const scraps = await this.ormRepository.find({
      where: wherefind,
      order: { id: 'DESC' },
      relations: ['employee'],
    });

    return scraps;
  }

  public async findAllScrapsPaginate({
    page,
    serial_number,
    end_date,
    list_code,
    start_date,
  }: IFilterScrapDTO): Promise<IPaginateScrapDTO> {
    let wherefind;

    if (list_code && serial_number && start_date && end_date) {
      wherefind = {
        list_code,
        serial_number,
        created_at: Between(
          zonedTimeToUtc(startOfDay(start_date), 'UTC'),
          zonedTimeToUtc(endOfDay(end_date), 'UTC')
        ),
      };
    } else if (list_code && serial_number && (!start_date || !end_date)) {
      wherefind = {
        list_code,
        serial_number,
      };
    } else if (list_code && !serial_number && start_date && end_date) {
      wherefind = {
        list_code,
        created_at: Between(
          zonedTimeToUtc(startOfDay(start_date), 'UTC'),
          zonedTimeToUtc(endOfDay(end_date), 'UTC')
        ),
      };
    } else if (list_code && !serial_number && (!start_date || !end_date)) {
      wherefind = {
        list_code,
      };
    } else if (!list_code && serial_number && start_date && end_date) {
      wherefind = {
        serial_number,
        created_at: Between(
          zonedTimeToUtc(startOfDay(start_date), 'UTC'),
          zonedTimeToUtc(endOfDay(end_date), 'UTC')
        ),
      };
    } else if (!list_code && serial_number && (!start_date || !end_date)) {
      wherefind = {
        serial_number,
      };
    } else if (!list_code && !serial_number && start_date && end_date) {
      wherefind = {
        created_at: Between(
          zonedTimeToUtc(startOfDay(start_date), 'UTC'),
          zonedTimeToUtc(endOfDay(end_date), 'UTC')
        ),
      };
    }

    const [scraps, totalScraps] = await this.ormRepository.findAndCount({
      where: wherefind,
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
      relations: ['employee'],
    });

    return {
      scraps,
      totalPages: totalScraps / TOTAL_PER_PAGE,
      totalScraps,
    };
  }

  public async findByComponentAndListCode(
    component: string,
    list_code: string
  ): Promise<Scrap | undefined> {
    return await this.ormRepository.findOne({
      where: {
        serial_number: component,
        list_code,
      },
    });
  }

  public async findBySerial(serial_number: string): Promise<Scrap | undefined> {
    return await this.ormRepository.findOne({
      where: {
        serial_number,
      },
    });
  }

  public async findById(id: number): Promise<Scrap | undefined> {
    return await this.ormRepository.findOne(id);
  }

  public async findAllScrapsLimited(): Promise<Scrap[]> {
    return await this.ormRepository.find({
      relations: ['employee'],
      take: 15,
      order: {
        created_at: 'DESC',
      },
    });
  }

  public async create(data: ICreateScrapDTO): Promise<Scrap> {
    const scrap = this.ormRepository.create(data);
    await this.ormRepository.save(scrap);
    return scrap;
  }

  public async update(data: Scrap): Promise<Scrap> {
    return await this.ormRepository.save(data);
  }
}

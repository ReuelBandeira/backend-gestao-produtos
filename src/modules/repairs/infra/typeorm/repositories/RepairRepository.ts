import Line from '@modules/lines/infra/typeorm/entities/Line';
import IFilterRepairDTO from '@modules/repairs/dtos/IFilterRepairDTO';
import IPaginateRepairDTO from '@modules/repairs/dtos/IPaginateRepairDTO';
import IRepairRepository from '@modules/repairs/repositories/IRepairRepository';
import Tracking from '@modules/trackings/infra/typeorm/entities/Tracking';
import { endOfDay, startOfDay } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { Between, IsNull, Like, Not, Repository, getRepository } from 'typeorm';
import Repair from '../entities/Repair';

const TOTAL_PER_PAGE = 11;

export default class RepairRepository implements IRepairRepository {
  private ormRepository: Repository<Repair>;

  private ormLineRepository: Repository<Line>;

  private ormTrackingrepository: Repository<Tracking>;

  constructor() {
    this.ormRepository = getRepository(Repair);
    this.ormLineRepository = getRepository(Line);
    this.ormTrackingrepository = getRepository(Tracking);
  }

  public async findRegisters(id_tracking: number): Promise<Repair[] | undefined> {
    const registers = await this.ormRepository.find({
      where: {
        id_tracking,
        updated_at: IsNull(),
      },
    });

    return registers;
  }


  public async findVerification(id: number): Promise<Repair[] | undefined> {
    const registers = await this.ormRepository.find({
      where: {
        id
      },
    });

    return registers;
  }

  public async findAllRepairsByFilter({
    end_date,
    id_cause,
    id_defect,
    id_line,
    start_date,
  }: IFilterRepairDTO): Promise<Repair[]> {
    let wherefind;

    if (id_cause) {
      wherefind = {
        id_cause,
      };
    } else if (id_defect) {
      wherefind = {
        id_defect,
      };
    } else if (id_line) {
      wherefind = {
        tracking: {
          id_line,
        },
      };
    } else if (start_date && end_date) {
      wherefind = {
        created_at: Between(
          zonedTimeToUtc(startOfDay(start_date), 'UTC'),
          zonedTimeToUtc(endOfDay(end_date), 'UTC')
        ),
      };
    }

    return await this.ormRepository.find({
      where: wherefind,
      relations: [
        'tracking',
        'tracking.line',
        'defect',
        'cause',
        'solution',
        'origin',
        'defect_origins',
        'operator',
        'technical',
        'repairman',
      ],
      order: {
        created_at: 'DESC',
      },
    });
  }

  public async repairedByFilter({
    end_date,
    id_cause,
    id_defect,
    id_line,
    start_date,
  }: IFilterRepairDTO): Promise<Repair[]> {
    let wherefind;

    if (id_cause) {
      wherefind = {
        id_cause,
      };
    } else if (id_defect) {
      wherefind = {
        id_defect,
      };
    } else if (id_line) {
      wherefind = {
        tracking: {
          id_line,
        },
      };
    } else if (start_date && end_date) {
      wherefind = {
        date_repair: Between(
          zonedTimeToUtc(startOfDay(start_date), 'UTC'),
          zonedTimeToUtc(endOfDay(end_date), 'UTC')
        ),
      };
    }

    return await this.ormRepository.find({
      where: wherefind,
      relations: [
        'tracking',
        'tracking.line',
        'defect',
        'cause',
        'solution',
        'origin',
        'defect_origins',
        'operator',
        'technical',
        'repairman',
      ],
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findOne(serial_number: number): Promise<Repair | undefined> {
    return await this.ormRepository.findOne({
      where: {
        tracking: {
          id: serial_number,
        },
        id_cause: null,
        id_solution: null,
        id_origin: null,
      },
      relations: [
        'tracking',
        'defect',
        'cause',
        'solution',
        'origin',
        'defect_origins',
        'operator',
        'technical',
        'repairman',
      ],
    });
  }

  async checkIfExist(
    id_tracking: number,
    id_defect: number
  ): Promise<Repair | undefined> {
    return await this.ormRepository.findOne({
      where: {
        id_tracking,
        id_defect,
      },
      relations: ['defect', 'tracking'],
    });
  }

  async checkIfExistSerial(
    serial_number: string,
  ): Promise<Repair | undefined> {
    return await this.ormRepository.findOne({
      where: {
        serial_son: serial_number,
        date_repair: IsNull(),
      }
    });
  }

  public async findById(id: number): Promise<Repair | undefined> {
    return await this.ormRepository.findOne({
      where: { id },
      relations: ['tracking'],
    });
  }

  public async findBySearch(
    serial_number: string
  ): Promise<Repair[] | undefined> {
    return await this.ormRepository.find({
      where: {
        tracking: {
          serial_number: Like(`%${serial_number}%`),
        },
      },
      relations: [
        'tracking',
        'defect',
        'cause',
        'solution',
        'origin',
        'defect_origins',
        'operator',
        'technical',
        'repairman',
      ],
    });
  }

  public async update(data: Repair): Promise<Repair | undefined> {
    await this.ormRepository.save(data);

    return await this.ormRepository.findOne(data.id, {
      relations: [
        'tracking',
        'defect',
        'cause',
        'solution',
        'origin',
        'defect_origins',
        'operator',
        'technical',
        'repairman',
      ],
    });
  }

  public async findAllRepairs(page = 1): Promise<IPaginateRepairDTO> {
    const [repairs, totalRepairs] = await this.ormRepository.findAndCount({
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
      relations: [
        'tracking',
        'defect',
        'cause',
        'solution',
        'origin',
        'defect_origins',
        'operator',
        'technical',
        'repairman',
      ],
    });

    return {
      repairs,
      totalPages: totalRepairs / TOTAL_PER_PAGE,
      totalRepairs,
    };
  }

  async findLine(
    id: number,
  ): Promise<Line[] | undefined> {
    const check_line = await this.ormLineRepository
      .createQueryBuilder('lines')
      .select([
        'id',
        'line_name',
        'description'
      ])
      .where({ id })
      .getRawMany();

    return check_line;
  }

  async originDefectUpdate(
    id: number,
    id_employee_origin: number,
    defect_origin: number,
    module: string,
    observation_technical: string,
  ): Promise<void> {
    await this.ormRepository
      .createQueryBuilder('repairs')
      .update(Repair)
      .set({
        id_employee_origin,
        defect_origin,
        module,
        date_defect_origin: new (Date),
        observation_technical,
      })
      .where({ id })
      .execute();
  }

  public async findTotalRepairs(): Promise<Line[] | undefined> {
    const total_repair = await this.ormRepository.find({
      order: { id: 'DESC' },
      where: {
        date_repair: Not(IsNull()),
      },
    });
    return total_repair;
  }

  async findSerialTrackings(
    serial_number: string,
  ): Promise<Tracking[] | undefined> {
    const check_serial = await this.ormTrackingrepository
      .createQueryBuilder('trackings')
      .select([
        'id'
      ])
      .where({ serial_number })
      .getRawMany();

    return check_serial;
  }

  async findSerialRepairs(id_tracking: number): Promise<Repair | undefined> {
    return await this.ormRepository.findOne({
      where: {
        id_tracking,
        id_cause: null,
        id_solution: null,
        id_origin: null,
      },
      relations: [
        'tracking',
        'defect',
        'cause',
        'solution',
        'origin',
        'defect_origins',
        'operator',
        'technical',
        'repairman',
      ],
    });
  }

}

import { Between, getRepository, Repository } from 'typeorm';
import IStencilWashRepository from '@modules/stencil_wash/repositories/IStencilWashRepository';
import ICreateStencilWashDTO from '@modules/stencil_wash/dtos/ICreateStencilWashDTO';
import IPaginateStencilWashDTO from '@modules/stencil_wash/dtos/IPaginateStencilWashDTO';
import IFilterStencilWashesDTO from '@modules/stencil_wash/dtos/IFilterStencilWashesDTO';
import { zonedTimeToUtc } from 'date-fns-tz';
import { endOfDay, startOfDay } from 'date-fns';
import StencilWash from '../entities/StencilWash';

const TOTAL_PER_PAGE = 11;

export default class StencilWashRepository implements IStencilWashRepository {
  private ormRepository: Repository<StencilWash>;

  constructor() {
    this.ormRepository = getRepository(StencilWash);
  }

  public async findAllStencilWashes({
    id_tooling_control,
    id_machine,
    start_date,
    end_date,
  }: IFilterStencilWashesDTO): Promise<StencilWash[]> {
    let wherefind;

    if (id_tooling_control && id_machine && start_date && end_date) {
      wherefind = {
        id_tooling_control,
        id_machine,
        created_at: Between(
          zonedTimeToUtc(startOfDay(start_date), 'UTC'),
          zonedTimeToUtc(endOfDay(end_date), 'UTC')
        ),
      };
    } else if (id_tooling_control && id_machine && (!start_date || !end_date)) {
      wherefind = {
        id_tooling_control,
        id_machine,
      };
    } else if (id_tooling_control && !id_machine && start_date && end_date) {
      wherefind = {
        id_tooling_control,
        created_at: Between(
          zonedTimeToUtc(startOfDay(start_date), 'UTC'),
          zonedTimeToUtc(endOfDay(end_date), 'UTC')
        ),
      };
    } else if (
      id_tooling_control &&
      !id_machine &&
      (!start_date || !end_date)
    ) {
      wherefind = {
        id_tooling_control,
      };
    } else if (!id_tooling_control && id_machine && start_date && end_date) {
      wherefind = {
        id_machine,
        created_at: Between(
          zonedTimeToUtc(startOfDay(start_date), 'UTC'),
          zonedTimeToUtc(endOfDay(end_date), 'UTC')
        ),
      };
    } else if (
      !id_tooling_control &&
      id_machine &&
      (!start_date || !end_date)
    ) {
      wherefind = {
        id_machine,
      };
    } else if (!id_tooling_control && !id_machine && start_date && end_date) {
      wherefind = {
        created_at: Between(
          zonedTimeToUtc(startOfDay(start_date), 'UTC'),
          zonedTimeToUtc(endOfDay(end_date), 'UTC')
        ),
      };
    }

    const stencilWashes = await this.ormRepository.find({
      where: wherefind,
      order: { id: 'DESC' },
      relations: [
        'toolingControl',
        'toolingControl.checkToolPrinters',
        'machine',
        'employee',
      ],
    });

    return stencilWashes;
  }

  public async findAllStencilWashesPaginate({
    page,
    id_tooling_control,
    id_machine,
    start_date,
    end_date,
  }: IFilterStencilWashesDTO): Promise<IPaginateStencilWashDTO> {
    let wherefind;

    if (id_tooling_control && id_machine && start_date && end_date) {
      wherefind = {
        id_tooling_control,
        id_machine,
        created_at: Between(
          zonedTimeToUtc(startOfDay(start_date), 'UTC'),
          zonedTimeToUtc(endOfDay(end_date), 'UTC')
        ),
      };
    } else if (id_tooling_control && id_machine && (!start_date || !end_date)) {
      wherefind = {
        id_tooling_control,
        id_machine,
      };
    } else if (id_tooling_control && !id_machine && start_date && end_date) {
      wherefind = {
        id_tooling_control,
        created_at: Between(
          zonedTimeToUtc(startOfDay(start_date), 'UTC'),
          zonedTimeToUtc(endOfDay(end_date), 'UTC')
        ),
      };
    } else if (
      id_tooling_control &&
      !id_machine &&
      (!start_date || !end_date)
    ) {
      wherefind = {
        id_tooling_control,
      };
    } else if (!id_tooling_control && id_machine && start_date && end_date) {
      wherefind = {
        id_machine,
        created_at: Between(
          zonedTimeToUtc(startOfDay(start_date), 'UTC'),
          zonedTimeToUtc(endOfDay(end_date), 'UTC')
        ),
      };
    } else if (
      !id_tooling_control &&
      id_machine &&
      (!start_date || !end_date)
    ) {
      wherefind = {
        id_machine,
      };
    } else if (!id_tooling_control && !id_machine && start_date && end_date) {
      wherefind = {
        created_at: Between(
          zonedTimeToUtc(startOfDay(start_date), 'UTC'),
          zonedTimeToUtc(endOfDay(end_date), 'UTC')
        ),
      };
    }

    const [stencilWashes, totalStencilWashes] =
      await this.ormRepository.findAndCount({
        where: wherefind,
        order: { id: 'DESC' },
        skip: (page - 1) * TOTAL_PER_PAGE,
        take: TOTAL_PER_PAGE,
        relations: [
          'toolingControl',
          'toolingControl.checkToolPrinters',
          'machine',
          'employee',
        ],
      });

    return {
      stencilWashes,
      totalPages: totalStencilWashes / TOTAL_PER_PAGE,
      totalStencilWashes,
    };
  }

  public async create(
    data: Omit<ICreateStencilWashDTO, 'tooling_control' | 'machine'>
  ): Promise<StencilWash> {
    const stencilWash = this.ormRepository.create(data);
    await this.ormRepository.save(stencilWash);
    return stencilWash;
  }
}

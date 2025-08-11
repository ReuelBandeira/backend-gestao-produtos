import ICreateManagementMslDTO from '@modules/management_msl/dtos/ICreateManagementMslDTO';
import IPaginateManagementMslDTO from '@modules/management_msl/dtos/IPaginateManagementMslDTO';
import IManagementMslRepository from '@modules/management_msl/repositories/IManagementMslRepository';
import { getRepository, Not, Repository } from 'typeorm';
import ManagementMsl from '../entities/ManagementMsl';

const TOTAL_PER_PAGE = 11;

export default class ManagementMslRepository
  implements IManagementMslRepository {
  private ormRepository: Repository<ManagementMsl>;

  constructor() {
    this.ormRepository = getRepository(ManagementMsl);
  }

  public async filterComponentsPaginate(
    page: number
  ): Promise<IPaginateManagementMslDTO> {
    const [managementMsl, totalManagementMsl] =
      await this.ormRepository.findAndCount({
        relations: ['management'],
        order: { id: 'DESC' },
        skip: (page - 1) * TOTAL_PER_PAGE,
        take: TOTAL_PER_PAGE,
      });

    return {
      managementMsl,
      totalPages: totalManagementMsl / TOTAL_PER_PAGE,
      totalManagementMsl,
    };
  }

  public async findComponentsStatus(): Promise<ManagementMsl[]> {
    return await this.ormRepository.find({
      relations: ['management'],
    });
  }

  public async findByComponent(
    component: string
  ): Promise<ManagementMsl | undefined> {
    return await this.ormRepository.findOne({
      relations: ['management'],
      where: {
        component,
      },
    });
  }

  public async findAllManagementMslNotPaginate(): Promise<ManagementMsl[]> {
    return await this.ormRepository.find({
      relations: ['management'],
      where: {
        management: {
          type: Not("NIVEL1")
        }
      },
      order: {
        created_at: 'ASC',
      },
    });
  }

  public async findById(id: number): Promise<ManagementMsl | undefined> {
    return await this.ormRepository.findOne({
      where: { id },
    });
  }

  public async findBySearch(component: string): Promise<ManagementMsl[]> {
    return await this.ormRepository.find({
      relations: ['management'],
      where: {
        component,
      },
      order: {
        created_at: 'DESC',
      },
    });
  }

  public async create(data: ICreateManagementMslDTO): Promise<ManagementMsl> {
    const managementMsl = this.ormRepository.create(data);
    await this.ormRepository.save(managementMsl);

    return managementMsl;
  }

  public async update(managementMsl: ManagementMsl): Promise<ManagementMsl> {
    return await this.ormRepository.save(managementMsl);
  }

  public async findAllManagementMsl(
    page = 1
  ): Promise<IPaginateManagementMslDTO> {
    const [managementMsl, totalManagementMsl] =
      await this.ormRepository.findAndCount({
        relations: ['management'],
        order: { id: 'DESC' },
        skip: (page - 1) * TOTAL_PER_PAGE,
        take: TOTAL_PER_PAGE,
      });

    return {
      managementMsl,
      totalPages: totalManagementMsl / TOTAL_PER_PAGE,
      totalManagementMsl,
    };
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async findByCompMslManagement(
    component: string
  ): Promise<ManagementMsl[] | undefined> {
    return await this.ormRepository.find({
      relations: ['management'],
      where: {
        component,
      },
      order: {
        id: 'DESC',
      },
      // take:1
    });
  }

  public async verifyMslComponents(): Promise<ManagementMsl[]> {
    return await this.ormRepository.find({
      // relations: ['management'],
      // order: {
      //   created_at: 'ASC',
      // },
    });
  }
}

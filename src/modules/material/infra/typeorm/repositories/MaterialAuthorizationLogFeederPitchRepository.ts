
import { getRepository, Repository } from 'typeorm';
import IMaterialAuthorizationLogFeederPitchRepository from '@modules/material/repositories/IMaterialAuthorizationLogFeederPitchRespository copy';
import {ICreateAuthorizationLogFeederPitchDTO} from '@modules/material/dtos/ICreateAuthorizationLogFeederPitch';
import MaterialAuthorizationLogFeederPitch from '../entities/MaterialAuthorizationLogFeederPitch';

export default class MaterialAuthorizationLogFeederPitchRepository
  implements IMaterialAuthorizationLogFeederPitchRepository {
  private ormRepository: Repository<MaterialAuthorizationLogFeederPitch>;

  constructor() {
    this.ormRepository = getRepository(MaterialAuthorizationLogFeederPitch);
  }

  public async create(
    data: ICreateAuthorizationLogFeederPitchDTO,
  ): Promise<MaterialAuthorizationLogFeederPitch> {
    const logFeederPitch = await this.ormRepository.create(data);

    await this.ormRepository.save(logFeederPitch);

    return logFeederPitch;
  }

  async findChangeFeederByLog(
    dateStart: Date,
    dateEnd: Date,
  ): Promise<MaterialAuthorizationLogFeederPitch[]| undefined> {
    const material = await this.ormRepository
      .createQueryBuilder('log_feeder_authorization')
      .leftJoinAndSelect('log_feeder_authorization.employee', 'employee')
      .leftJoinAndSelect('log_feeder_authorization.employee_authorization', 'employee_authorization')

      .select([
        'list_code',
        'machine',
        'side',
        'module',
        'position',
        'log_feeder_authorization.status As status_lido',
        'feeder_old',
        'feeder_new',
        'employee.name',
        'employee_authorization.name',

        'log_feeder_authorization.created_at'
      ])
      .where ( `log_feeder_authorization.created_at BETWEEN ' ${dateStart} 'AND' ${dateEnd}'`)
      .getRawMany();

    return material;
  }
}


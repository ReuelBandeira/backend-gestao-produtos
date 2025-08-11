
import { getRepository, Repository } from 'typeorm';
import IMaterialAuthorizationLogRefilRepository from '@modules/material/repositories/IMaterialAuthorizationLogRefilRepository';
import {ICreateAuthorizationLogRefilDTO} from '@modules/material/dtos/ICreateAuthorizationLogRefil';
import MaterialAuthorizationLogRefil from '../entities/MaterialAuthorizationLogRefil';

export default class MaterialAuthorizationLogRefilRepository
  implements IMaterialAuthorizationLogRefilRepository {
  private ormRepository: Repository<MaterialAuthorizationLogRefil>;

  constructor() {
    this.ormRepository = getRepository(MaterialAuthorizationLogRefil);
  }

  public async create(
    data: ICreateAuthorizationLogRefilDTO,
  ): Promise<MaterialAuthorizationLogRefil> {
    const logRefilAutorization = await this.ormRepository.create(data);

    await this.ormRepository.save(logRefilAutorization);

    return logRefilAutorization;
  }

  async findRefilByLog(
    dateStart: Date,
    dateEnd: Date,
  ): Promise<MaterialAuthorizationLogRefil[]| undefined> {
    const material = await this.ormRepository
      .createQueryBuilder('log_refil_authorization')

      .leftJoinAndSelect('log_refil_authorization.employee', 'employee')

      .leftJoinAndSelect('log_refil_authorization.employee_authorization', 'employee_authorization')

      .select([
        'list_code',
        'machine',
        'side',
        'module',
        'position',
        'component_old',
        'component_new',
        'employee.name',

        'employee_authorization.name',


        'status',

        'log_refil_authorization.created_at'
      ])
      .where ( `log_refil_authorization.created_at BETWEEN ' ${dateStart} 'AND' ${dateEnd}'`)
      .getRawMany();

    return material;
  }



}








import { getRepository, Repository } from 'typeorm';
import IMaterialManagerLogFeederRepository from '@modules/material/repositories/IMaterialManagerLogFeederRespository';
import {ICreateMaterialLogFeederDTO} from '@modules/material/dtos/ICreateLogFeeder';
import MaterialManagerLogFeeder from '../entities/MaterialManagerLogFeeder';

export default class MaterialManagerLogFeederRepository
  implements IMaterialManagerLogFeederRepository {
  private ormRepository: Repository<MaterialManagerLogFeeder>;

  constructor() {
    this.ormRepository = getRepository(MaterialManagerLogFeeder);
  }

  public async create(
    data: ICreateMaterialLogFeederDTO,
  ): Promise<MaterialManagerLogFeeder> {
    const changeLog = await this.ormRepository.create(data);

    await this.ormRepository.save(changeLog);

    return changeLog;
  }

  async findChangeFeederByLog(
    dateStart: Date,
    dateEnd: Date,
  ): Promise<MaterialManagerLogFeeder[]| undefined> {

    const material = await this.ormRepository.query(
      ' SELECT DISTINCT '+
      '  lf.list_code, '+
      '  smt.struct_code, '+
      '  lf.machine, '+
      '  lf.side,  '+
      '  lf.module,  '+
      '  lf.position,  '+
      '  lf.status As status_lido, '+
      '  lf.feeder_old,  '+
      '  lf.feeder_new,  '+
      '  e.name,  '+
      '  lf.created_at  '+
      ' FROM log_feeder lf  '+
      ' JOIN employees e  '+
      ' on lf.id_employee = e.id '+
      ' JOIN smt_material_manager smt '+
      ' on lf.list_code = smt.list_code '+
      ' WHERE lf.created_at BETWEEN "'+ dateStart + '" AND "' + dateEnd +'"'
    );

    /* const material = await this.ormRepository
      .createQueryBuilder('log_feeder')
      .leftJoinAndSelect('log_feeder.employee', 'employee')

      .select([
        'list_code',
        'machine',
        'side',
        'module',
        'position',
        'log_feeder.status As status_lido',
        'feeder_old',
        'feeder_new',
        'employee.name',
        'log_feeder.created_at'
      ])
      .where ( `log_feeder.created_at BETWEEN ' ${dateStart} 'AND' ${dateEnd}'`)
      .getRawMany(); */

    return material;
  }
}


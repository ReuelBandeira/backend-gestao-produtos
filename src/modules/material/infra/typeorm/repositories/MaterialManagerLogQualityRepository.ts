
import { getRepository, Repository } from 'typeorm';
import IMaterialManagerLogQualityRepository from '@modules/material/repositories/IMaterialManagerLogQualityRepository';
import {ICreateMaterialLogQualityDTO} from '@modules/material/dtos/ICreateLogQuality';
import MaterialManagerLogQuality from '../entities/MaterialManagerLogQuality';

export default class MaterialManagerLogQualityRepository
  implements IMaterialManagerLogQualityRepository {
  private ormRepository: Repository<MaterialManagerLogQuality>;

  constructor() {
    this.ormRepository = getRepository(MaterialManagerLogQuality);
  }

  public async create(
    data: ICreateMaterialLogQualityDTO,
  ): Promise<MaterialManagerLogQuality> {
    const logQuality = await this.ormRepository.create(data);

    await this.ormRepository.save(logQuality);

    return logQuality;
  }

  async findQualityByLog(
    dateStart: Date,
    dateEnd: Date,
  ): Promise<MaterialManagerLogQuality[]| undefined> {
    const material = await this.ormRepository.query(
      'SELECT DISTINCT '+
      '  lq.list_code, '+
      '  smt.struct_code, '+
      '  lq.machine, '+
      '  lq.side, '+
      '  lq.module, '+
      '  lq.position, '+
      '  lq.component, '+
      '  e.name, '+
      '  lq.status, '+
      '  lq.created_at, '+
      '  lq.qr_code_information '+
      ' FROM log_quality lq  '+
      ' JOIN employees e  '+
      ' on lq.id_employee = e.id '+
      ' JOIN smt_material_manager smt '+
      ' on lq.list_code = smt.list_code '+
      ' WHERE lq.created_at BETWEEN "'+ dateStart + '" AND "' + dateEnd +'"'
    );

    return material;
  }


}

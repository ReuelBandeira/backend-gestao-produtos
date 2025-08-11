
import { getRepository, Repository } from 'typeorm';
import IMaterialManagerLogRefilRepository from '@modules/material/repositories/IMaterialManagerLogRefilRepository';
import {ICreateMaterialLogRefilDTO} from '@modules/material/dtos/ICreateLogRefil';
import MaterialManagerLogRefil from '../entities/MaterialManagerLogRefil';

export default class MaterialManagerLogRefilRepository
  implements IMaterialManagerLogRefilRepository {
  private ormRepository: Repository<MaterialManagerLogRefil>;

  constructor() {
    this.ormRepository = getRepository(MaterialManagerLogRefil);
  }

  public async create(
    data: ICreateMaterialLogRefilDTO,
  ): Promise<MaterialManagerLogRefil> {
    const logRefil = await this.ormRepository.create(data);

    await this.ormRepository.save(logRefil);

    return logRefil;
  }

  async findRefilByLog(
    dateStart: Date,
    dateEnd: Date,
  ): Promise<MaterialManagerLogRefil[]| undefined> {
    const material = await this.ormRepository.query(
      ' SELECT DISTINCT '+
      '  lr.list_code, '+
      '  smt.struct_code, '+
      '  lr.list_code, '+
      '  lr.machine, '+
      '  lr.side, '+
      '  lr.module, '+
      '  lr.position, '+
      '  lr.component_old, '+
      '  lr.component_new, '+
      '  e.name, '+
      '  lr.status, '+
      '  lr.created_at, '+
      '  lr.qr_code_information_old, '+
      '  lr.qr_code_information_new, '+
      '  lr.feeder_pitch '+
      ' FROM log_refil lr '+
      ' JOIN employees e  '+
      ' on lr.id_employee = e.id '+
      ' JOIN smt_material_manager smt '+
      ' on lr.list_code = smt.list_code '+
      ' WHERE lr.created_at BETWEEN "'+ dateStart + '" AND "' + dateEnd +'"'

    );

    return material;
  }



}







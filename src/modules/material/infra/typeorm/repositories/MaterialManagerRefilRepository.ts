import { getRepository, Repository } from 'typeorm';
import IMaterialManagerRefilRepository from '@modules/material/repositories/IMaterialManagerRefilRepository';

import ICreateMaterialManagerRefilDTO from '@modules/material/dtos/ICreateMaterialManagerRefilDTO';
import MaterialManagerRefil from '../entities/MaterialManagerRefil';

export default class MaterialManagerRefilRepository
  implements IMaterialManagerRefilRepository
{
  private ormRepository: Repository<MaterialManagerRefil>;

  constructor() {
    this.ormRepository = getRepository(MaterialManagerRefil);
  }

  public async findByComponentAndSerial(
    component: string,
    serial: string
  ): Promise<MaterialManagerRefil | undefined> {
    return await this.ormRepository.findOne({
      where: {
        component_new: component,
        sequential_new: serial,
      },
    });
  }

  public async findByListCode(
    list_code: string
  ): Promise<MaterialManagerRefil[]> {
    return await this.ormRepository.find({
      where: {
        list_code,
      },
    });
  }

  public async create(
    data: ICreateMaterialManagerRefilDTO
  ): Promise<MaterialManagerRefil> {
    const refil = await this.ormRepository.create(data);

    await this.ormRepository.save(refil);

    return refil;
  }

  async findRefilByLog(
    dateStart: Date,
    dateEnd: Date
  ): Promise<MaterialManagerRefil[] | undefined> {
    const material = await this.ormRepository
      .createQueryBuilder('smt_material_manager_refil')

      .leftJoinAndSelect('smt_material_manager_refil.employee', 'employee')
      .select([
        'list_code',
        'machine',
        'side',
        'module',
        'position',
        'component_old',
        'component_new',
        'employee.name',
        'smt_material_manager_refil.created_at',
      ])
      .where(
        `smt_material_manager_refil.created_at BETWEEN ' ${dateStart} 'AND' ${dateEnd}'`
      )
      .getRawMany();

    return material;
  }

  public async validationEntranceRefil(
    sequential_new: string
  ): Promise<MaterialManagerRefil[]> {
    const validation = await this.ormRepository.find({
      where: {sequential_new},
    });
    return validation;
  }

  public async checkComponentOld(
    list_code: string,
    machine: string,
    module: string,
    side: number,
    position: number,
  ): Promise<MaterialManagerRefil[]> {
    const validation = await this.ormRepository.find({
      where: { list_code,machine,module,side,position },
      order: { id: 'DESC' },
    });
    return validation;
  }



}

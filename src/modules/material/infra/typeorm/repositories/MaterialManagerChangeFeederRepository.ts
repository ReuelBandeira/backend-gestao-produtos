import { getRepository, Repository } from 'typeorm';
import IMaterialManagerChangeFeederRepository from '@modules/material/repositories/IMaterialManagerChangeFeederRepository';
import ICreateChangeFeederDTO from '@modules/material/dtos/ICreateChangeFeederDTO';
import MaterialManagerChangeFeeder from '../entities/MaterialManagerChangeFeeder';

export default class MaterialManagerChangeFeederRepository
  implements IMaterialManagerChangeFeederRepository {
  private ormRepository: Repository<MaterialManagerChangeFeeder>;

  constructor() {
    this.ormRepository = getRepository(MaterialManagerChangeFeeder);
  }

  public async findChangeFeederByListCodeAndFeederNew(
    list_code: string,
    id_feeder_new: number,
  ): Promise<MaterialManagerChangeFeeder | undefined> {
    const changeFeederLogs = await this.ormRepository.find({
      where: {
        list_code,
        id_feeder_new,
      },
    });

    const changeFeeder = changeFeederLogs[changeFeederLogs.length - 1];

    return changeFeeder;
  }

  public async create(
    data: ICreateChangeFeederDTO,
  ): Promise<MaterialManagerChangeFeeder> {
    const changeFeeder = await this.ormRepository.create(data);

    await this.ormRepository.save(changeFeeder);

    return changeFeeder;
  }

  async findChangeFeederByLog(
    dateStart: Date,
    dateEnd: Date,
  ): Promise<MaterialManagerChangeFeeder[]| undefined> {
    const material = await this.ormRepository
      .createQueryBuilder('smt_material_manager_change_feeder')
      .leftJoinAndSelect('smt_material_manager_change_feeder.employee', 'employee')
      .leftJoinAndSelect('smt_material_manager_change_feeder.feederOld', 'feedersOld')
      .leftJoinAndSelect('smt_material_manager_change_feeder.feederNew', 'feedersNew')
      .select([
        'list_code',
        'machine',
        'side',
        'module',
        'position',
        'feedersOld.feeder_code AS feeder_code_old',
        'feedersNew.feeder_code AS feeder_code_new',
        'employee.name',
        'smt_material_manager_change_feeder.created_at'
      ])
      .where ( `smt_material_manager_change_feeder.created_at BETWEEN ' ${dateStart} 'AND' ${dateEnd}'`)
      .getRawMany();

    return material;
  }

  public async validationFeederMaterialChange(
    list_code: string,
    module: string,
    position: number,
    checkFeederId: number
  ): Promise<MaterialManagerChangeFeeder[]> {
    const validation = await this.ormRepository.find({
      where: { list_code,module,position,id_feeder_new: checkFeederId },
      order: { id: 'DESC' },
    });
    return validation;
  }

  public async check_feeder_change(
    list_code: string,
  ): Promise<MaterialManagerChangeFeeder[]> {
    const validation = await this.ormRepository.find({
      where: { list_code},
      order: { id: 'DESC' },
    });
    return validation;
  }

  public async updateListCode(list_code: string, list_codeAlt: string ): Promise<void>{
    await this.ormRepository
    .createQueryBuilder()
    .update(MaterialManagerChangeFeeder)
    .set({list_code})
    .where({list_code: list_codeAlt})
    .execute()

  }


}

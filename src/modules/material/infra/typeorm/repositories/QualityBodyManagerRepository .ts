import ICreateQualityBody from '@modules/material/dtos/ICreateQualityBody';
import IQualityBodyManagerRepository from '@modules/material/repositories/IQualityBodyManagerRepository';
import { getRepository, Repository } from 'typeorm';
import { QualityBodyManager } from '../entities/QualityBodyManager';

export default class QualityBodyManagerRepository
  implements IQualityBodyManagerRepository {
  private ormRepository: Repository<QualityBodyManager>;

  constructor() {
    this.ormRepository = getRepository(QualityBodyManager);
  }

  public async create(data: ICreateQualityBody): Promise<QualityBodyManager> {
    const qualityBody = this.ormRepository.create(data);

    await this.ormRepository.save(qualityBody);

    return qualityBody;
  }

  public async findPositionsByModule(
    list_code: string,
    machine: string,
    module: string,
    side: number,
  ): Promise<QualityBodyManager[]> {
    const qualityBody = await this.ormRepository.find({
      where: {
        list_code,
        machine,
        module,
        side,
      },
    });

    return qualityBody;
  }

  async findQualityByLog(
    dateStart: Date,
    dateEnd: Date,
  ): Promise<QualityBodyManager[]| undefined> {
    const material = await this.ormRepository
      .createQueryBuilder('smt_quality_body')

      .leftJoinAndSelect('smt_quality_body.employee', 'employee')
      .select([
        'list_code',
        'machine',
        'side',
        'module',
        'position',
        'component',
        'employee.name',
        'smt_quality_body.created_at'
      ])
      .where ( `smt_quality_body.created_at BETWEEN ' ${dateStart} 'AND' ${dateEnd}'`)
      .getRawMany();

    return material;
  }

  public async totalComponentBodyListQualityModule(
    list_code: string,
    machine: string,
    module: string,
    side: number,
    id: number,
  ): Promise<number> {
    const total = await this.ormRepository
    .createQueryBuilder('smt_quality_body')
    .select('component')
    .where({list_code, machine, module, side, id_quality_head: id })
    .distinct(true)
    .getRawMany();

    return total.length;
  }
}

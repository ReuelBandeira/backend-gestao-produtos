import ICreateQualityHead from '@modules/material/dtos/ICreateQualityHead';
import IQualityHeadManagerRepository from '@modules/material/repositories/IQualityHeadManagerRepository';
import { getRepository, Repository } from 'typeorm';
import { QualityHeadManager } from '../entities/QualityHeadManager';

export default class QualityHeadManagerRepository
  implements IQualityHeadManagerRepository
{
  private ormRepository: Repository<QualityHeadManager>;

  constructor() {
    this.ormRepository = getRepository(QualityHeadManager);
  }

  public async updateStatus(
    list_code: string,
    machine: string,
    module: string,
    side: number,
    status: 'online' | 'offline',
    id_employee: number,
  ): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(QualityHeadManager)
      .set({ status, id_employee })
      .where({ list_code, module, side, machine })
      .execute();
  }

  public async create(data: ICreateQualityHead): Promise<QualityHeadManager> {
    const qualityHead = this.ormRepository.create(data);

    await this.ormRepository.save(qualityHead);

    return qualityHead;
  }

  public async findQualityOpenByListCode(
    list_code: string,
    machine: string,
    module: string,
    side: number,
  ): Promise<QualityHeadManager | undefined> {
    const qualityHead = await this.ormRepository.findOne({
      where: { list_code, machine, module, side, status: 'online' },
      relations: ['qualityBody'],
    });

    return qualityHead;
  }
}

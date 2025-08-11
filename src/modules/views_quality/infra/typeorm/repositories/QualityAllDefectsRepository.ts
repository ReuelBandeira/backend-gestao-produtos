

import { Repository, getRepository } from "typeorm";
import IQualityAllDefectsRepository from "@modules/views_quality/repositories/IQualityAllDefects";

import { startOfDay, endOfDay } from 'date-fns';
import QualityAllDefects from "../entities/QualityAllDefects";


export default class QualityAllDefectsRepository implements IQualityAllDefectsRepository {

  private ormRepository: Repository<QualityAllDefects>;

  constructor() {
    this.ormRepository = getRepository(QualityAllDefects);

  }

  public async DateQualityAllDefects(dateStart: Date, dateEnd: Date): Promise<QualityAllDefects[]> {
    const startDate = String(dateStart).concat("T00:00:00.000Z");
    const endDate = String(dateEnd).concat("T23:59:59.999Z");

    const result = await this.ormRepository
      .createQueryBuilder('vw_quality_all_defects')
      .select(['defeitos', 'model_name'])
      .where('vw_quality_all_defects.defeitos BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getRawMany();

    return result;
  }





}



import { Repository, getRepository } from "typeorm";
import IQualityIndicatorShotRepository from "@modules/views_quality/repositories/IQualityIndicatorShot";
import QualityIndicatorShot from "../entities/QualityIndicatorShot";


export default class QualityIndicatorShotRepository implements IQualityIndicatorShotRepository {

  private ormRepository: Repository<QualityIndicatorShot>;

  constructor() {
    this.ormRepository = getRepository(QualityIndicatorShot);

  }

  public async DateQualityIndicatorShot(dateStart: Date, dateEnd: Date): Promise<{id_line: number, line_name: string, model_name: string, qty: number, dates: Date}[]> {

    const startDate = String(dateStart).concat("T00:00:00.000Z");
    const endDate = String(dateEnd).concat("T23:59:59.999Z");

    const result = await this.ormRepository
      .createQueryBuilder('vw_quality_indicator_shot')
      .select([
        'id_line',
        'line_name',
        'model_name',
        'qty',
        'dates'
      ])
      .where('vw_quality_indicator_shot.dates BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getRawMany();

    return result;
  }


}

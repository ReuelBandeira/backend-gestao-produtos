

import { Repository, getRepository } from "typeorm";
import IQualityFailModeRepository from "@modules/views_quality/repositories/IQualityFailMode";
import QualityFailMode from "../entities/QualityFailMode";


export default class QualityFailModeRepository implements IQualityFailModeRepository {

  private ormRepository: Repository<QualityFailMode>;

  constructor() {
    this.ormRepository = getRepository(QualityFailMode);

  }

  public async DateQualityFailMode(dateStart: Date, dateEnd: Date): Promise<{ defect: string, count: number }[]> {

    const startDate = String(dateStart).concat("T00:00:00.000Z");
    const endDate = String(dateEnd).concat("T23:59:59.999Z");

    const result = await this.ormRepository
      .createQueryBuilder('vw_quality_fail_mode')
      .select([
        'defect',
        'COUNT(*) AS count'
      ])
      .where('vw_quality_fail_mode.dates BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .groupBy('defect')
      .getRawMany();

    return result.map(item => ({
      defect: item.defect,
      count: parseInt(item.count)
    }));
  }



}

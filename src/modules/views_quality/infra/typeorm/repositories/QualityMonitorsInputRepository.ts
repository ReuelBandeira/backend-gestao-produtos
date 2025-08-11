

import { Repository, getRepository } from "typeorm";
import IQualityMonitorsInputRepository from "@modules/views_quality/repositories/IQualityMonitorsInput";
import QualityMonitorsInput from "../entities/QualityMonitorsInput";


export default class QualityMonitorsInputRepository implements IQualityMonitorsInputRepository {

  private ormRepository: Repository<QualityMonitorsInput>;

  constructor() {
    this.ormRepository = getRepository(QualityMonitorsInput);

  }

  public async DateQualityMonitorsInput(dateStart: Date, dateEnd: Date): Promise<{ name: string, count: number }[]> {
    const startDate = String(dateStart).concat("T00:00:00.000Z");
    const endDate = String(dateEnd).concat("T23:59:59.999Z");
    const result = await this.ormRepository
      .createQueryBuilder('vw_quality_monitors_input')
      .select([
        'name',
        'COUNT(*) AS count'
      ])
      .where('vw_quality_monitors_input.dates BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .groupBy('name')
      .getRawMany();

    return result.map(item => ({
      name: item.name,
      count: parseInt(item.count)
    }));
  }






}

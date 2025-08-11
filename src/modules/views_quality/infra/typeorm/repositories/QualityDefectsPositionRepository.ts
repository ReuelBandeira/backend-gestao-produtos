

import { Repository, getRepository } from "typeorm";
import IQualityDefectsPositionRepository from "@modules/views_quality/repositories/IQualityDefectsPosition";
import QualityDefectsPosition from "../entities/QualityDefectsPosition";


export default class QualityDefectsPositionRepository implements IQualityDefectsPositionRepository {

  private ormRepository: Repository<QualityDefectsPosition>;

  constructor() {
    this.ormRepository = getRepository(QualityDefectsPosition);

  }


  public async QualityDefectsPosition(dateStart: Date, dateEnd: Date): Promise<{ mechanical_position: string, count: number }[]> {
    const startDate = String(dateStart).concat("T00:00:00.000Z");
    const endDate = String(dateEnd).concat("T23:59:59.999Z");
    const result = await this.ormRepository
      .createQueryBuilder('vw_quality_defects_position')
      .select([
        'mechanical_position',
        'COUNT(*) AS count'
      ])
      .where('vw_quality_defects_position.dates BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .groupBy('mechanical_position')
      .getRawMany();

    return result.map(item => ({
      mechanical_position: item.mechanical_position,
      count: parseInt(item.count)
    }));
  }


}

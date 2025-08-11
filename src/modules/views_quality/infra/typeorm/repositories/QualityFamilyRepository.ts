

import { Repository, getRepository } from "typeorm";
import IQualityFamilyRepository from "@modules/views_quality/repositories/IQualityFamilyRepository";
import QualityFamily from "../entities/QualityFamily";


export default class QualityFamilyRepository implements IQualityFamilyRepository {

  private ormRepository: Repository<QualityFamily>;

  constructor() {
    this.ormRepository = getRepository(QualityFamily);

  }

  public async allQualityFamily(): Promise<QualityFamily[]> {
    const result = await this.ormRepository.query(
      `${'SELECT * FROM vw_quality_family'}`
    );
    return result;
  }

  public async DateQualityFamily(dateStart: Date, dateEnd: Date): Promise<{ familia: string, count: number }[]> {
    const startDate = String(dateStart).concat("T00:00:00.000Z");
    const endDate = String(dateEnd).concat("T23:59:59.999Z");
    const result = await this.ormRepository
      .createQueryBuilder('vw_quality_family')
      .select([
        'familia',
        'COUNT(*) AS count'
      ])

      .where('vw_quality_family.dates BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .groupBy('familia')
      .getRawMany();

    return result.map(item => ({
      familia: item.familia,
      count: parseInt(item.count)
    }));
  }

}

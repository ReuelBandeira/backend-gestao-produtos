

import { Repository, getRepository } from "typeorm";
import IQualityTeamRepository from "@modules/views_quality/repositories/IQualityTeam";
import QualityTeam from "../entities/QualityTeam";


export default class QualityTeamRepository implements IQualityTeamRepository {

  private ormRepository: Repository<QualityTeam>;

  constructor() {
    this.ormRepository = getRepository(QualityTeam);

  }

  public async DateQualityTeam(dateStart: Date, dateEnd: Date): Promise<{turno: number, count: number }[]> {
    const startDate = String(dateStart).concat("T00:00:00.000Z");
    const endDate = String(dateEnd).concat("T23:59:59.999Z");

    const result = await this.ormRepository
      .createQueryBuilder('vw_quality_team')
      .select([
        'turno',
        'COUNT(*) AS count'
      ])
      .where('vw_quality_team.dates BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .groupBy('turno')
      .getRawMany();

    return result.map(item => ({
      turno: item.turno,
      count: parseInt(item.count)
    }));
  }

}

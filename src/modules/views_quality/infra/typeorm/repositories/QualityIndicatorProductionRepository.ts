/* eslint-disable radix */


import { Repository, getRepository } from "typeorm";
import IQualityIndicatorProductionRepository from "@modules/views_quality/repositories/IQualityIndicatorProduction";
import QualityIndicatorProduction from "../entities/QualityIndicatorProduction";


export default class QualityIndicatorProductionRepository implements IQualityIndicatorProductionRepository {

  private ormRepository: Repository<QualityIndicatorProduction>;

  constructor() {
    this.ormRepository = getRepository(QualityIndicatorProduction);

  }

  public async productionShotDefect(dateStart: Date, dateEnd: Date): Promise<{id_line:number, line_name:string, model_name: string, production: number,shot:number }[]> {
    const startDate = String(dateStart).concat("T00:00:00.000Z");
    const endDate = String(dateEnd).concat("T23:59:59.999Z");

    const result = await this.ormRepository
      .createQueryBuilder('vw_quality_indicator_production')
      .leftJoinAndSelect('vw_quality_indicator_production.shots', 'vw_quality_indicator_shot')
      .select([
        'vw_quality_indicator_production.id_line AS id_line',
        'vw_quality_indicator_production.line_name AS line_name',
        'vw_quality_indicator_production.model_name AS model_name',
        'vw_quality_indicator_production.production AS production',
        // 'COALESCE(vw_quality_indicator_defects.defeitos, 0) AS defect',
        'COALESCE(vw_quality_indicator_shot.qty, 0) AS shot',
      ])
      .where('vw_quality_indicator_production.dates BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getRawMany();

      return result.map(item => ({
        id_line: item.id_line,
        line_name: item.line_name,
        model_name: item.model_name,
        production: parseInt(item.production),
        // eslint-disable-next-line radix
        // defect:parseInt(item.defect),
        shot:parseInt(item.shot)
      }));
  }








}

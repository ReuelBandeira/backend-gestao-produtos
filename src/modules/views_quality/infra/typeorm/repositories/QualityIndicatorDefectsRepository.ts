

import { Repository, getRepository } from "typeorm";
import IQualityIndicatorDefectsRepository from "@modules/views_quality/repositories/IQualityIndicatorDefects";
import QualityIndicatorDefects from "../entities/QualityIndicatorDefects";


export default class QualityIndicatorDefectsRepository implements IQualityIndicatorDefectsRepository {

  private ormRepository: Repository<QualityIndicatorDefects>;

  constructor() {
    this.ormRepository = getRepository(QualityIndicatorDefects);

  }

  public async DateQualityIndicatorDefects(dateStart: Date, dateEnd: Date): Promise<{id_line:number, line_name:string, model_name: string, count: number }[]> {
    const startDate = String(dateStart).concat("T00:00:00.000Z");
    const endDate = String(dateEnd).concat("T23:59:59.999Z");
    const result = await this.ormRepository
      .createQueryBuilder('vw_quality_indicator_defects')
      .select([
        'id_line',
        'line_name',
        'model_name',
        'COUNT(*) AS count'
      ])
      .where('vw_quality_indicator_defects.defeitos BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .groupBy('model_name') // Adiciona os campos de agrupamento
      .getRawMany();

    return result.map(item => ({
      id_line: item.id_line,
      line_name: item.line_name,
      model_name: item.model_name,
      count: parseInt(item.count)
    }));
  }


  public async allDefect(dateStart: Date, dateEnd: Date): Promise<{id_line:number, line_name:string, model_name: string, defect: number }[]> {
    const startDate = String(dateStart);
    const endDate = String(dateEnd);

    const result = await this.ormRepository
      .createQueryBuilder('vw_quality_indicator_defects')
      .select([
        '*',
      ])
      .where('vw_quality_indicator_defects.dates BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getRawMany();

      return result.map(item => ({
        id_line: item.id_line,
        line_name: item.line_name,
        model_name: item.model_name,
        defect: parseInt(item.defeitos),
        // eslint-disable-next-line radix
        // defect:parseInt(item.defect),
        // shot:parseInt(item.shot)
      }));
  }

}

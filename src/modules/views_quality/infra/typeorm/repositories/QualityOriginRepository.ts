

import { Repository, getRepository } from "typeorm";
import IQualityOriginRepository from "@modules/views_quality/repositories/IQualityOrigin";
import Repair from "@modules/repairs/infra/typeorm/entities/Repair";
import QualityOrigin from "../entities/QualityOrigin";


export default class QualityOriginRepository implements IQualityOriginRepository {

  private ormRepository: Repository<QualityOrigin>;

  private ormRepairRepository: Repository<Repair>;

  constructor() {
    this.ormRepository = getRepository(QualityOrigin);
    this.ormRepairRepository = getRepository(Repair);

  }

  // public async DateQualityOrigin(dateStart: Date, dateEnd: Date): Promise<{origem: string, count: number }[]> {
  //   const startDate = String(dateStart).concat("T00:00:00.000Z");
  //   const endDate = String(dateEnd).concat("T23:59:59.999Z");
  //   const result = await this.ormRepository
  //     .createQueryBuilder('vw_quality_origin')
  //     .select([
  //       'origem',
  //       'COUNT(*) AS count'
  //     ])
  //     .where('vw_quality_origin.dates BETWEEN :startDate AND :endDate', {
  //       startDate,
  //       endDate,
  //     })
  //     .groupBy('origem')
  //     .getRawMany();

  //   return result.map(item => ({
  //     origem: item.origem,
  //     count: parseInt(item.count)
  //   }));
  // }

  // public async repairOrigin(dateStart: Date, dateEnd: Date): Promise<{ origem: string; count: number }[]> {
  //   const startDate = String(dateStart).concat("T00:00:00.000Z");
  //   const endDate = String(dateEnd).concat("T23:59:59.999Z");
  //   const result = await this.ormRepairRepository
  //     .createQueryBuilder('repairs')
  //     .select([
  //       'defect_origin as origem',
  //       'COUNT(*) AS count'
  //     ])
  //     .where('repairs.created_at BETWEEN :startDate AND :endDate', {
  //       startDate,
  //       endDate,
  //     })
  //     .andWhere('repairs.defect_origin IS NOT NULL') // Exclude rows where defect_origin is null
  //     .groupBy('origem')
  //     .getRawMany();

  //   return result.map(item => ({
  //     origem: item.origem,
  //     count: parseInt(item.count)
  //   }));
  // }

  public async repairOrigin(dateStart: Date, dateEnd: Date): Promise<{ origem: string; count: number }[]> {
    const startDate = String(dateStart).concat("T00:00:00.000Z");
    const endDate = String(dateEnd).concat("T23:59:59.999Z");
    const result = await this.ormRepairRepository
      .createQueryBuilder('repairs')
      .leftJoin('repairs.defect_origins', 'origins')
      .select([
        'origins.description as origem',
        'COUNT(*) AS count'
      ])
      .where('repairs.created_at BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .andWhere('repairs.defect_origin IS NOT NULL')
      .groupBy('origins.description')
      .getRawMany();

    return result.map(item => ({
      origem: item.origem,
      count: parseInt(item.count)
    }));
}






}

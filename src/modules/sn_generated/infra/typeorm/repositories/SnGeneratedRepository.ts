import ICreateSnGeneratedDTO from '@modules/sn_generated/dtos/ICreateSnGeneratedDTO';
import ISnGeneratedRepository from '@modules/sn_generated/repositories/ISnGeneratedRepository';
import { endOfDay, startOfDay } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';
import { Between, getRepository, Repository } from 'typeorm';
import SnGenerated from '../entities/SnGenerated';


export default class SnGeneratedRepository implements ISnGeneratedRepository {
  private ormRepository: Repository<SnGenerated>;

  constructor() {
    this.ormRepository = getRepository(SnGenerated);
  }

  public async countByProductionOrder(id_production_order: number): Promise<number> {
    return await this.ormRepository.count({
      where: {
        id_production_order
      }
    })
  }

  public async findByProductionOrder(id_production_order: number): Promise<SnGenerated[]> {
    return await this.ormRepository.find({
      where: {
        id_production_order
      },
      order: {
        id: "DESC"
      }
    })
  }

  public async findLastInsetByDate(product: string): Promise<SnGenerated | undefined> {
    return await this.ormRepository.findOne({
      relations: ["productionOrder", "productionOrder.product"],
      where: {
        productionOrder: {
          product: {
            product_name: product
          }
        },
        created_at: Between(
          zonedTimeToUtc(startOfDay(new Date()), 'UTC'),
          zonedTimeToUtc(endOfDay(new Date()), 'UTC')
        )
      },
      order: {
        id: "DESC"
      }
    })
  }


  public async findById(id: number): Promise<SnGenerated | undefined> {
    return await this.ormRepository.findOne({
      where: { id },
    });
  }

  public async create(data: Omit<ICreateSnGeneratedDTO, "quantity_generate">[]): Promise<SnGenerated[]> {
    const sn = this.ormRepository.create(data);
    await this.ormRepository.save(sn);

    return sn;
  }
}

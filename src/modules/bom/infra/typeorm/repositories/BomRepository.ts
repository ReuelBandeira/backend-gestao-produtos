/* eslint-disable no-param-reassign */
import ICreateBomDTO from '@modules/bom/dtos/ICreateBomDTO';
import IBomRepository from '@modules/bom/repositories/ICreateBomRepository';
import { ProductionOrder } from '@modules/production_orders/infra/typeorm/entities/ProductionOrders';
import { getRepository, Repository } from 'typeorm';
import { Bom } from '../entities/Bom';

export default class BomRepository implements IBomRepository {
  private ormRepository: Repository<Bom>;

  private ormProductOrdemRepository: Repository<ProductionOrder>;

  constructor() {
    this.ormRepository = getRepository(Bom);
    this.ormProductOrdemRepository = getRepository(ProductionOrder);
  }

  public async findAllMainComponents(component: string): Promise<Bom[]> {
    return await this.ormRepository.find({
      where: {
        main_component: component
      }
    })
  }

  public async findByMainComponentOrAlternativeComponent(
    component: string
  ): Promise<Bom | undefined> {
    return await this.ormRepository.findOne({
      where: [
        {
          main_component: component,
        },
        {
          alternative_component: component,
        },
      ],
    });
  }

  public async findById(id: number): Promise<Bom | undefined> {
    const bom = await this.ormRepository.findOne({
      where: { id },
      relations: ['production_oder'],
    });

    return bom;
  }

  public async findByStructCode(
    struct_code: string
  ): Promise<Bom[] | undefined> {
    const bom = await this.ormRepository.find({
      where: { struct_code, status_bom: 'Y' },
    });

    return bom;
  }

  public async findByBomToPo(
    struct_code: string
  ): Promise<(Bom | undefined)[] | undefined> {
    const findBom = await this.ormRepository.find({
      relations: ['productionOrder'],
      where: { struct_code, status_bom: 'Y' },
      order: { struct_code: 'DESC' },
    });

    return findBom;
  }

  public async create(data: ICreateBomDTO[]): Promise<Bom[]> {
    const bom = this.ormRepository.create(data);
    await this.ormRepository.save(bom);

    return bom;
  }

  public async updateStatus(
    status: 'Y' | 'N',
    partnumber: string
  ): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(Bom)
      .set({ status_bom: status })
      .where({ struct_code: partnumber })
      .execute();
  }

  public async findByComponentAlternative(
    main_component: string
  ): Promise<Bom[] | undefined> {
    const componentAlt = await this.ormRepository.find({
      where: { main_component },
    });
    return componentAlt;
  }

  public async findByComponentAlternativeComponent(
    status: string,
    struct_code: string,
    main_component: string
  ): Promise<Bom[] | undefined> {
    const componentAlternativeComponent = await this.ormRepository.find({
      where: { status_bom: status, struct_code, main_component },
    });

    return componentAlternativeComponent;
  }

  public async deleteOp(mo_code: string): Promise<Bom[]> {
    const deleteForce = await this.ormProductOrdemRepository
      .createQueryBuilder('production_order')
      .delete()
      .where({ mo_code })
      .execute();
    return deleteForce;
  }
}

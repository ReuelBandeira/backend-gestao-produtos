import ICreateDetailMaterialEntranceDTO from '@modules/material_entrance_smt/dtos/IDetailCreateMaterialEntranceDTO';
import IDetailMaterialEntranceRepository from '@modules/material_entrance_smt/repositories/IDetailMaterialEntranceRepository';
// import DowntimeManagement from '@modules/downtime_management/infra/typeorm/entities/DowntimeManagement';
import { getRepository, Like, Repository } from 'typeorm';
import { Bom } from '@modules/bom/infra/typeorm/entities/Bom';
import Product from '@modules/products/infra/typeorm/entities/Product';
import ProductDelimiter from '@modules/products/infra/typeorm/entities/ProductDelimiter';
import Product from '@modules/products/infra/typeorm/entities/Product';
import DetailMaterialEntrance from '../entities/DetailMaterialEntrance';
import MaterialEntrance from '../entities/MaterialEntrance';

const TOTAL_PER_PAGE = 11;

export default class DetailMaterialEntranceRepository
  implements IDetailMaterialEntranceRepository
{
  private ormRepository: Repository<DetailMaterialEntrance>;

  private ormBomRepository: Repository<Bom>;

  private ormProductRepository: Repository<Product>;

  private ormMaterialEntranceRepository: Repository<MaterialEntrance>;

  private ormProductDelimiterRepository: Repository<ProductDelimiter>;

  constructor() {
    this.ormRepository = getRepository(DetailMaterialEntrance);
    this.ormBomRepository = getRepository(Bom);
    this.ormProductRepository = getRepository(Product);
    this.ormMaterialEntranceRepository = getRepository(MaterialEntrance);
    this.ormProductDelimiterRepository= getRepository(ProductDelimiter);
  }

  public async findByProductionOrder(
    production_order: string
  ): Promise<DetailMaterialEntrance[]> {
    return await this.ormRepository.find({
      where: {
        materialEntrance: {
          production_order,
        },
      },
      relations: ['materialEntrance'],
    });
  }

  public async findById(
    id: number
  ): Promise<DetailMaterialEntrance | undefined> {
    const action = await this.ormRepository.findOne({
      where: { id },
    });

    return action;
  }

  public async findByName(
    description: string
  ): Promise<DetailMaterialEntrance | undefined> {
    const action = await this.ormRepository.findOne({
      where: { description },
    });

    return action;
  }

  public async findByNameSearch(
    component: string
  ): Promise<(DetailMaterialEntrance | undefined)[] | undefined> {
    const action = await this.ormRepository.find({
      relations: ['materialEntrance'],
      where: { component: Like(`%${component}%`) },
    });

    return action;
  }

  public async create(
    materialData: ICreateDetailMaterialEntranceDTO
  ): Promise<DetailMaterialEntrance> {
    const material = this.ormRepository.create(materialData);
    await this.ormRepository.save(material);

    return material;
  }

  public async update(
    actionData: DetailMaterialEntrance
  ): Promise<DetailMaterialEntrance> {
    const action = await this.ormRepository.save(actionData);
    return action;
  }

  public async findAllAction(
    page = 1
  ): Promise<DetailMaterialEntrance | DetailMaterialEntrance[]> {
    const detail_materials = await this.ormRepository.find({
      relations: ['materialEntrance'],
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalAction = (await this.ormRepository.find()).length;

    return {
      detail_materials,
      totalPages: totalAction / TOTAL_PER_PAGE,
      totalAction,
    };
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async findAllRegisters(): Promise<
    DetailMaterialEntrance | DetailMaterialEntrance[]
  > {
    const materials_detais = await this.ormRepository.find({
      relations: ['materialEntrance'],
      order: { id: 'DESC' },
    });
    return materials_detais;
  }

  public async allRegisters(
    id_material_entrance_smt: number
  ): Promise<DetailMaterialEntrance[] | undefined> {
    const action = await this.ormRepository.find({
      relations: ['materialEntrance','employee'],
      order: { id: 'DESC' },
      where: { id_material_entrance_smt },
    });

    return action;
  }

  public async findAllBomMainComponent(
    struct_code: string,
    main_component: string
  ): Promise<Bom[]> {
    const validation = await this.ormBomRepository
      .createQueryBuilder('bom')
      .select(['main_component'])
      .where({ struct_code, main_component, status_bom: 'Y' })
      .distinct(true)
      .getRawMany();

    return validation;
  }

  public async findAllBomAlternative(
    struct_code: string,
    alternative_component: string
  ): Promise<Bom[]> {
    const validation = await this.ormBomRepository
      .createQueryBuilder('bom')
      .select(['main_component'])
      .where({ struct_code, alternative_component, status_bom: 'Y' })
      .distinct(true)
      .getRawMany();

    return validation;
  }

  public async findIdProduct(
    id: number
  ): Promise<MaterialEntrance[] | undefined> {
    const validation = await this.ormMaterialEntranceRepository
      .createQueryBuilder('material_entrance_smt')
      .leftJoinAndSelect('material_entrance_smt.product', 'product')
      .select(['product.product_name as product_name',
        'product.id as id_product'])
      .where({ id })
      .distinct(true)
      .getRawMany();

    return validation;
  }

  public async findProductName(id: number): Promise<Product[]> {
    const validation = await this.ormProductRepository
      .createQueryBuilder('products')
      .select(['product_name'])
      .where({ id })
      .getRawMany();

    return validation;
  }

  public async findSequencialValidation(
    id_material_entrance_smt: number,
    component: string,
    serial_component: string
  ): Promise<DetailMaterialEntrance[] | undefined> {
    const validation = await this.ormRepository.find({
      where: { id_material_entrance_smt, component, serial_component },
    });

    return validation;
  }

  public async findProductDelimiter(
    id_product :number,
  ): Promise<ProductDelimiter [] | []> {
    const validation = await this.ormProductDelimiterRepository
      .createQueryBuilder('product_delimiter')
      // .leftJoinAndSelect('material_entrance_smt.product', 'product')
      .select([
        'delimiter',
        'position_quantity',
        'type'
      ])
      .where({id_product})
      // .distinct(true)
      .getRawMany();

    return validation;
  }


}

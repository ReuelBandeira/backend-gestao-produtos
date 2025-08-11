import ICreateMaterialEntranceDTO from '@modules/material_entrance_smt/dtos/ICreateMaterialEntranceDTO';
import IMaterialEntranceRepository from '@modules/material_entrance_smt/repositories/IMaterialEntranceRepository';
import DowntimeManagement from '@modules/downtime_management/infra/typeorm/entities/DowntimeManagement';
import MaintenanceFeederActions from '@modules/maintenance_feeder/infra/typeorm/entities/MaintenanceFeederActions';
import { getRepository, Like, Repository } from 'typeorm';
import { Bom } from '@modules/bom/infra/typeorm/entities/Bom';
import Product from '@modules/products/infra/typeorm/entities/Product';
import MaterialEntrance from '../entities/MaterialEntrance';
import DetailMaterialEntrance from '../entities/DetailMaterialEntrance';

const TOTAL_PER_PAGE = 11;

export default class MaterialEntranceRepository
  implements IMaterialEntranceRepository
{
  private ormRepository: Repository<MaterialEntrance>;

  private ormBomRepository: Repository<Bom>;

  private ormProductRepository: Repository<Product>;

  private ormDetailMaterialEntranceRepository: Repository<DetailMaterialEntrance>;

  constructor() {
    this.ormRepository = getRepository(MaterialEntrance);
    this.ormBomRepository = getRepository(Bom);
    this.ormProductRepository = getRepository(Product);
    this.ormDetailMaterialEntranceRepository = getRepository(
      DetailMaterialEntrance
    );
  }

  public async findByOp(production_order: string): Promise<MaterialEntrance[]> {
    return await this.ormRepository.find({
      where: {
        production_order,
      },
    });
  }

  public async findById(id: number): Promise<MaterialEntrance | undefined> {
    const action = await this.ormRepository.findOne({
      where: { id },
    });

    return action;
  }

  public async findByName(
    description: string
  ): Promise<MaterialEntrance | undefined> {
    const action = await this.ormRepository.findOne({
      where: { description },
    });

    return action;
  }

  public async findByNameSearch(
    production_order: string
  ): Promise<(MaterialEntrance | undefined)[] | undefined> {
    const action = await this.ormRepository.find({
      relations: ['product'],
      where: { production_order: Like(`%${production_order}%`) },
    });

    return action;
  }

  public async create(
    materialData: ICreateMaterialEntranceDTO
  ): Promise<MaterialEntrance> {
    const material = this.ormRepository.create(materialData);
    await this.ormRepository.save(material);

    return material;
  }

  public async update(actionData: MaterialEntrance): Promise<MaterialEntrance> {
    const action = await this.ormRepository.save(actionData);
    return action;
  }

  public async findAllAction(
    page = 1
  ): Promise<MaterialEntrance | MaterialEntrance[]> {
    const materials = await this.ormRepository.find({
      relations: ['product'],
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalAction = (await this.ormRepository.find()).length;

    return {
      materials,
      totalPages: totalAction / TOTAL_PER_PAGE,
      totalAction,
    };
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async findAllRegisters(): Promise<
    MaterialEntrance | MaterialEntrance[]
  > {
    const materials = await this.ormRepository.find({
      relations: ['product'],
      order: { id: 'DESC' },
    });
    return materials;
  }

  public async findAllProducts(
    id_product: number
  ): Promise<MaterialEntrance[] | undefined> {
    const registers_materias = await this.ormRepository.find({
      relations: ['product'],
      where: { id_product },
      order: { id: 'DESC' },
    });

    return registers_materias;
  }

  public async findAllProductEntrance(
    id_product: number,
    id: number
  ): Promise<MaterialEntrance[] | undefined> {
    const registers_materias = await this.ormRepository.find({
      relations: ['product'],
      where: { id_product, id },
      order: { id: 'DESC' },
    });

    return registers_materias;
  }

  public async findAllBomMainComponent(struct_code: string): Promise<Bom[]> {
    const validation = await this.ormBomRepository
      .createQueryBuilder('bom')
      .select([
        'struct_code',
        'main_component',
        'qty_used',
        'id_production_order',
      ])
      .where({ struct_code, status_bom: 'Y' })
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

  public async findIdMaterialEntrance(
    id_product: number,
    production_order: string
  ): Promise<MaterialEntrance[]> {
    const validation = await this.ormRepository
      .createQueryBuilder('material_entrance_smt')
      .select([
        'id as id_lote',
        'id_product',
        'kit_quantity',
        'production_order',
      ])
      .where({ id_product, production_order })
      .getRawMany();

    return validation;
  }

  public async findAllDetailMaterialEntrance(
    id_material_entrance_smt: number
  ): Promise<DetailMaterialEntrance[]> {
    const validation = await this.ormDetailMaterialEntranceRepository
      .createQueryBuilder('detail_material_entrance_smt')
      .select([
        'id',
        'id_material_entrance_smt',
        'main_component as component',
        'string_qr_code',
        'serial_component',
        'component_quantity',
        'uc_code',
        'id_employee',
      ])
      .where({ id_material_entrance_smt })
      .orderBy('detail_material_entrance_smt.id', 'DESC')
      .getRawMany();

    return validation;
  }

  public async findAllBomMainComponentAlternatives(
    struct_code: string
  ): Promise<Bom[]> {
    const validation = await this.ormBomRepository
      .createQueryBuilder('bom')
      .select([
        'struct_code',
        'main_component',
        'description',
        'qty_used',
        'id_production_order',
        'alternative_component',
      ])
      .where({ struct_code, status_bom: 'Y' })
      .getRawMany();

    return validation;
  }

  public async findAllQntEntrace(
    id_material_entrance_smt: number
  ): Promise<DetailMaterialEntrance[]> {
    const validation = await this.ormDetailMaterialEntranceRepository
      .createQueryBuilder('detail_material_entrance_smt')
      .select(['main_component as component'])
      .where({ id_material_entrance_smt })
      .distinct(true)
      .getRawMany();

    return validation;
  }

  public async findAllBomQtt(struct_code: string): Promise<Bom[]> {
    const validation = await this.ormBomRepository
      .createQueryBuilder('bom')
      .select(['main_component'])
      .where({ struct_code, status_bom: 'Y' })
      .distinct(true)
      .getRawMany();

    return validation;
  }

  public async findDescriptionComponent(
    main_component: string
  ): Promise<Bom[]> {
    const validation = await this.ormBomRepository
      .createQueryBuilder('bom')
      .select(['description'])
      .where({ main_component, status_bom: 'Y' })
      .distinct(true)
      .getRawMany();

    return validation;
  }
}

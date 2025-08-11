import { Bom } from '@modules/bom/infra/typeorm/entities/Bom';
import CheckSN from '@modules/check-sn/infra/typeorm/entities/CheckSN';
import CheckToolPrinter from '@modules/check_tool_printer/infra/typeorm/entities/CheckToolPrinter';
import { MaterialManager } from '@modules/material/infra/typeorm/entities/MaterialManager';
import ICreatePlateWashingDTO from '@modules/plate_washing/dtos/ICreatePlateWashingDTO';
import IPlateWashingRepository from '@modules/plate_washing/repositories/IPlateWashingRepository';
import { ProductionOrder } from '@modules/production_orders/infra/typeorm/entities/ProductionOrders';
import Product from '@modules/products/infra/typeorm/entities/Product'
import RouteBody from '@modules/route/infra/typeorm/entities/RouteBody';
import Tracking from '@modules/trackings/infra/typeorm/entities/Tracking';
import { getRepository, Like, Repository } from 'typeorm';
import PlateWashing from '../entities/PlateWashing';

const TOTAL_PER_PAGE = 11;

export default class PlateWashingRepository implements IPlateWashingRepository {
  private ormRepository: Repository<PlateWashing>;

  private ormCheckSNrepository: Repository<CheckSN>;

  private ormPoRepository: Repository<ProductionOrder>;

  private ormBomRepository: Repository<Bom>;

  private ormChecktoolPrinterRepository: Repository<CheckToolPrinter>;

  private ormMaterialManagerRepository: Repository<MaterialManager>;

  private ormProductRepository: Repository<Product>;

  private ormTrackingrepository: Repository<Tracking>;

  private ormRouteBodyRepository: Repository<RouteBody>;


  constructor() {
    this.ormRepository = getRepository(PlateWashing);
    this.ormCheckSNrepository = getRepository(CheckSN);
    this.ormPoRepository = getRepository(ProductionOrder);
    this.ormBomRepository = getRepository(Bom);
    this.ormChecktoolPrinterRepository= getRepository(CheckToolPrinter);
    this.ormMaterialManagerRepository= getRepository(MaterialManager);
    this.ormProductRepository= getRepository(Product);
    this.ormTrackingrepository = getRepository(Tracking);
    this.ormRouteBodyRepository = getRepository(RouteBody);
  }

  public async findById(id: number): Promise<PlateWashing | undefined> {
    const plateWashing = await this.ormRepository.findOne({
      where: { id },
    });

    return plateWashing;
  }

  public async findByName(description: string): Promise<PlateWashing | undefined> {
    const plateWashing = await this.ormRepository.findOne({
      where: { description }
    });

    return plateWashing;
  }

  public async findByNameSearch(
    description: string,
  ): Promise<(PlateWashing | undefined)[] | undefined> {
    const plateWashing = await this.ormRepository.find({
      where: { description: Like(`%${description}%`) },
    });

    return plateWashing;
  }

  public async update(plateWashingData: PlateWashing): Promise<PlateWashing> {
    const plateWashing = await this.ormRepository.save(plateWashingData);
    return plateWashing;
  }

  public async updateSnDetail(
    serial_number: string,
    // id_work_station:number,

  ): Promise<void> {
    await this.ormCheckSNrepository.createQueryBuilder('sn_detail')
      .update(CheckSN)
      .set({serial_number:`PL-${serial_number }`})
      .where({serial_number})
      .execute();
  }

  public async updateTrackings(
    serial_number: string,
    id_work_station:number,

  ): Promise<void> {
    await this.ormTrackingrepository.createQueryBuilder('trackings')
      .update(Tracking)
      .set({serial_number:`PL-${serial_number }`,id_work_station})
      .where({serial_number})
      .execute();
  }

  public async updateProductionOrder(
    mo_code :string,
    input_qty:number,
    number_plates_panel:number

  ): Promise<void> {
    const difference = input_qty - number_plates_panel;

    await this.ormPoRepository.createQueryBuilder('production_order')
      .update(ProductionOrder)
      .set({input_qty:difference})
      .where({mo_code})
      .execute();
  }

  public async updateTrackingsIDobrigatory(
    serial_number: string,
    id_work_station:number,
    id_next_workgroup:number

  ): Promise<void> {
    await this.ormTrackingrepository.createQueryBuilder('trackings')
      .update(Tracking)
      .set({id_work_station,id_next_workgroup})
      .where({serial_number})
      .execute();
  }

  public async findAllAction(page=1,): Promise<PlateWashing | PlateWashing[]> {
    const plateWashing = await this.ormRepository.find({
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalPlateWashing = (await this.ormRepository.find()).length;

    return {
      plateWashing,
      totalPages:totalPlateWashing/ TOTAL_PER_PAGE,
      totalPlateWashing,
    };
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async findAllRegisters(): Promise<PlateWashing | PlateWashing[]> {
    const plateWashing = await this.ormRepository.find({
      order: { id: 'DESC' },
    });
    return plateWashing;
  }

  public async snPlateWashing(
    serial_number:string,
  ): Promise<CheckSN[] > {
    const sn_validation = await this.ormCheckSNrepository
      .createQueryBuilder('sn_detail')
      .select([
        'id',
        'serial_number',
        'mo_number',
        'model_name',
        'id_line',
        'solder_paste_serial'
      ])
      .where({serial_number})
      .distinct(true)
      .getRawMany();

    return sn_validation;
  }

  public async snPoMocode(
    mo_code:string,
  ): Promise<ProductionOrder[] > {
    const mocode_po = await this.ormPoRepository
      .createQueryBuilder('production_order')
      .select([
        'id',
        'mo_status',
        'target_qty',
        'input_qty',
        'id_product',
        'id_route_code'
      ])
      .where({mo_code})
      // .distinct(true)
      .getRawMany();

    return mocode_po;
  }

  public async findCompBom(
    id_production_order:number,
  ): Promise<Bom[] > {
    const comp_bom = await this.ormBomRepository
      .createQueryBuilder('bom')
      .select([
        'id',
        'main_component',
        'alternative_component',
        'qty_used',
        'status_bom'
      ])
      .where({id_production_order})
      .distinct(true)
      .getRawMany();

    return comp_bom;
  }

  public async findCheckToolPrinter(
    id_production_order:number,
  ): Promise<CheckToolPrinter[] > {
    const check_ToolPrinter = await this.ormChecktoolPrinterRepository
      .createQueryBuilder('check_tool_printer')
      .select([
        'id_squeegee',
        'id_product ',
        'id_line',
        'list_code',
        'id_production_order'
      ])
      .where({id_production_order})
      // .distinct(true)
      .getRawMany();

    return check_ToolPrinter;
  }

  public async findCompSMTmaterialManager(
    list_code:string,
    // id_line:number
  ): Promise<MaterialManager[] > {
    const material_manager = await this.ormMaterialManagerRepository
      .createQueryBuilder('smt_material_manager')
      .select([
        'id',
        'list_code',
        'main_components',
        'alternative_components',
        'struct_code',
        'id_feeder',
        'quantity',
        'status'
      ])
      .where({list_code,status:"online"})
      // .distinct(true)
      .getRawMany();

    return material_manager;
  }

  public async createPlateWashing(plateWashingData: ICreatePlateWashingDTO[]): Promise<PlateWashing[]> {
    const plateWashing = this.ormRepository.create(plateWashingData);
    await this.ormRepository.save(plateWashing);

    return plateWashing;
  }

  public async findProductName(
    product_name:string,
  ): Promise<Product[] > {
    const name_product = await this.ormProductRepository
      .createQueryBuilder('products')
      .select([
        'id',
        'number_plates_panel',
      ])
      .where({product_name})
      .distinct(true)
      .getRawMany();

    return name_product;
  }

  public async findRouteBody(
    route_head_id:number,
  ): Promise<RouteBody[] > {
    const route_body = await this.ormRouteBodyRepository
      .createQueryBuilder('route_body')
      .select([
        'id',
        'workgroup_id'
      ])
      .where({route_head_id,order:1})
      .getRawMany();

    return route_body;
  }


}

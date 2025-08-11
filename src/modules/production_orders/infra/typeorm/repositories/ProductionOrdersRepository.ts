/* eslint-disable no-param-reassign */
import ICreateProductionOderDTO, {
  ProductionOrdersPagination,
} from '@modules/production_orders/dtos/ICreateProductionOderDTO';
import IProductionOrdersRepository from '@modules/production_orders/repositories/IProductionOrdersRepository';
import { getManager, getRepository, IsNull, Like, Not, Repository } from 'typeorm';

import DetailMaterialEntrance from '@modules/material_entrance_smt/infra/typeorm/entities/DetailMaterialEntrance';
import CheckToolPrinter from '@modules/check_tool_printer/infra/typeorm/entities/CheckToolPrinter';
import MaterialManagerRefil from '@modules/material/infra/typeorm/entities/MaterialManagerRefil';
import { MaterialManagerSetup } from '@modules/material/infra/typeorm/entities/MaterialManagerSetup';
import Scrap from '@modules/scrap/infra/typeorm/entities/Scrap';
import MaterialEntrance from '@modules/material_entrance_smt/infra/typeorm/entities/MaterialEntrance';
import Tracking from '@modules/trackings/infra/typeorm/entities/Tracking';
import { MaterialManager } from '@modules/material/infra/typeorm/entities/MaterialManager';
import Product from '@modules/products/infra/typeorm/entities/Product';
import { ProductionOrder } from '../entities/ProductionOrders';

const TOTAL_PER_PAGE = 6;
export default class ProductionOrdersRepository
  implements IProductionOrdersRepository {
  private ormRepository: Repository<ProductionOrder>;

  private ormDetailMaterialEntranceRepository: Repository<DetailMaterialEntrance>;

  private ormCheckToolPrinterRepository: Repository<CheckToolPrinter>;

  private ormMaterialManagerRefilRepository: Repository<MaterialManagerRefil>;

  private ormMaterialManagerSetupRepository: Repository<MaterialManagerSetup>;

  private ormScrapRepository: Repository<Scrap>;

  private ormMaterialEntranceRepository: Repository<MaterialEntrance>;

  private ormTrackingrepository: Repository<Tracking>;

  private ormMaterialManagerRepository: Repository<MaterialManager>;

  constructor() {
    this.ormRepository = getRepository(ProductionOrder);

    this.ormDetailMaterialEntranceRepository = getRepository(
      DetailMaterialEntrance
    );

    this.ormCheckToolPrinterRepository = getRepository(CheckToolPrinter);

    this.ormMaterialManagerRefilRepository =
      getRepository(MaterialManagerRefil);

    this.ormMaterialManagerSetupRepository =
      getRepository(MaterialManagerSetup);

    this.ormScrapRepository = getRepository(Scrap);

    this.ormMaterialEntranceRepository = getRepository(MaterialEntrance);

    this.ormTrackingrepository = getRepository(Tracking);

    this.ormMaterialManagerRepository = getRepository(MaterialManager);
  }

  public async findById(id: number): Promise<ProductionOrder | undefined> {
    const productionOder = await this.ormRepository.findOne({
      where: { id },
      relations: ['product'],
    });

    return productionOder;
  }

  public async findByCodeOp(
    mo_code: string
  ): Promise<ProductionOrder | undefined> {
    const productionOder = await this.ormRepository.findOne({
      where: { mo_code },
      relations: ['product', 'routeHead', 'bomlist'],
    });

    return productionOder;
  }

  public async findAllProductionOrders(
    page = 1
  ): Promise<ProductionOrdersPagination> {
    const po = await this.ormRepository.find({
      relations: ['product', 'bomlist', 'employee', 'routeHead'],
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
      order: { id: 'DESC' },
    });

    const totalOrders = (await this.ormRepository.find()).length;

    return {
      po,
      totalOrders,
      totalPages: totalOrders / TOTAL_PER_PAGE,
    };
  }

  public async findByProductionOrderCodeSearch(
    mo_code: string
  ): Promise<(ProductionOrder | undefined)[] | undefined> {
    const findProductionOders = await this.ormRepository.find({
      relations: ['product', 'bomlist', 'employee', 'routeHead'],
      where: { mo_code: Like(`%${mo_code}%`) },
      take: TOTAL_PER_PAGE,
    });

    return findProductionOders;
  }

  public async findAllOPsWithoutPagination(): Promise<ProductionOrder[]> {
    const productionOrders = await this.ormRepository.find({
      relations: ['product'],
      where: { mo_status: 'not in' },
    });

    return productionOrders;
  }

  public async create(
    data: ICreateProductionOderDTO[]
  ): Promise<ProductionOrder[]> {
    const productionOrder = this.ormRepository.create(data);
    await this.ormRepository.save(productionOrder);

    return productionOrder;
  }

  public async update(
    productionOder: ProductionOrder
  ): Promise<ProductionOrder> {
    const update = await this.ormRepository.save(productionOder);
    return update;
  }

  public async delete(id: number, mo_code: string): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(ProductionOrder)
      .set({ mo_code: `${id}D${mo_code}` })
      .where({ id })
      .execute();
    await this.ormRepository.softDelete({ id });
  }

  public async deleteForce(id: number): Promise<void> {
    await this.ormRepository.delete({ id });
  }

  public async findByProductName(
    product_name: string
  ): Promise<ProductionOrder | undefined> {
    const productionOder = await this.ormRepository.findOne({
      relations: ['product', 'bomlist'],
      where: {
        product: {
          product_name,
        },
      },
    });

    return productionOder;
  }

  async findSeasonSerial(
    serial_number: number,
    page = 1
  ): Promise<ProductionOrder[]> {
    const offset = (page - 1) * TOTAL_PER_PAGE;
    const productionOrder = await this.ormRepository.query(
      `${'SELECT s.serial_number, s.mo_number, s.model_name, w.name, s.in_station_time, s.in_line_time, s.out_line_time, s.serial_raspberry, e.name, s.created_at, s.updated_at, s.deleted_at FROM melhoria.sn_detail s' +
      'INNER JOIN melhoria.workstations w ON(s.id_work_station = w.id)' +
      'INNER JOIN melhoria.employees e ON(s.id_employee = e.id)' +
      'WHERE s.serial_number= '
      }${serial_number} LIMIT ${TOTAL_PER_PAGE} OFFSET ${offset}`
    );
    const historyproduction = await this.ormRepository.query(
      `${'SELECT s.serial_number, s.mo_number, s.model_name, w.name, s.in_station_time, s.in_line_time, s.out_line_time, s.serial_raspberry, e.name, s.created_at, s.updated_at, s.deleted_at FROM melhoria.sn_detail s' +
      'INNER JOIN melhoria.workstations w ON(s.id_work_station = w.id)' +
      'INNER JOIN melhoria.employees e ON(s.id_employee = e.id)' +
      'WHERE s.serial_number= '
      }${serial_number}`
    );
    const totalproductionOrder = historyproduction.length;
    return {
      productionOrder,
      totalproductionOrder,
      totalPages: totalproductionOrder / TOTAL_PER_PAGE,
    };
  }

  async findDetailsSerial(
    id_work_station: number,
    page = 1
  ): Promise<ProductionOrder[]> {
    const offset = (page - 1) * TOTAL_PER_PAGE;
    const productionOrder = await this.ormRepository.query(
      `SELECT * FROM sn_detail WHERE id_work_station =  ${id_work_station} LIMIT ${TOTAL_PER_PAGE} OFFSET ${offset}`
    );
    const historyproduction = await this.ormRepository.query(
      `SELECT * FROM sn_detail WHERE id_work_station =  ${id_work_station}`
    );
    const totalproductionOrder = historyproduction.length;
    return {
      productionOrder,
      totalproductionOrder,
      totalPages: totalproductionOrder / TOTAL_PER_PAGE,
    };
  }

  async findProductionHistory(page = 1): Promise<ProductionOrder[]> {
    const offset = (page - 1) * TOTAL_PER_PAGE;
    const productionOrderHistory = await this.ormRepository.query(
      `${'SELECT snd.id_work_station, w.name, COUNT(snd.serial_number) as qtd FROM trackings snd join workstations w on snd.id_work_station = w.id GROUP BY snd.id_work_station, w.name ' +
      ' LIMIT '
      }${TOTAL_PER_PAGE} OFFSET ${offset}`
    );

    const hitoryproduction = await this.ormRepository.query(
      'SELECT snd.id_work_station, w.name, COUNT(snd.serial_number) as qtd FROM trackings snd join workstations w on snd.id_work_station = w.id GROUP BY snd.id_work_station, w.name '
    );

    const totalproductionOrder = hitoryproduction.length;

    return {
      productionOrderHistory,
      totalproductionOrder,
      totalPages: totalproductionOrder / TOTAL_PER_PAGE,
    };
  }


  // eslint-disable-next-line consistent-return
  public async listAllFilter(

    mo_status: string,
    id_product: number,
    dateStart: Date,
    dateEnd: Date,
    page = 1,

  ): Promise<ProductionOrder[] | undefined> {
    const validation_dateStart = !dateStart;
    const validation_dateEnd = !dateEnd;

    //  quando vem todos os valores
    if (
      // eslint-disable-next-line no-sequences
      mo_status.length !== 0 &&
      id_product !== 0 &&
      validation_dateStart === false &&
      validation_dateEnd === false
    ) {

      const offset = (page - 1) * TOTAL_PER_PAGE;
      const filter_mo_start_date = await this.ormRepository
        .createQueryBuilder('production_order')
        .leftJoinAndSelect('production_order.product', 'product')
        .leftJoinAndSelect('production_order.routeHead', 'routeHead')
        .leftJoinAndSelect('production_order.employee', 'employee')
        .select([
          'production_order.id as id',
          'mo_code',
          'mo_status',
          'target_qty',
          'mo_created',
          'mo_start_date',
          'mo_prevision_start_date',
          'mo_close_date',
          'input_qty',
          'output_qty',
          'customer',
          'process_number',
          'id_route_code',
          'id_product',
          'id_employee',
          'product.product_name as product_name',
          'routeHead.name as name_route',
          'employee.username as employee'
        ])
        .where(`production_order.mo_start_date BETWEEN '${dateStart}' AND '${dateEnd}'`)
        .andWhere({ id_product, mo_status })
        .limit(TOTAL_PER_PAGE)
        .offset(offset)
        .getRawMany();


      const total_filter = await this.ormRepository
        .createQueryBuilder('production_order')
        .select([
          'mo_code'
        ])
        .where(`production_order.mo_start_date BETWEEN '${dateStart}' AND '${dateEnd}'`)
        .andWhere({ id_product, mo_status })
        .getRawMany();

      const totalOrders = total_filter.length;

      return {
        po: filter_mo_start_date,
        totalOrders,
        totalPages: totalOrders / TOTAL_PER_PAGE,
      };

    };

    //  quando vem apenas datas
    if (
      // eslint-disable-next-line no-sequences
      mo_status.length === 0 &&
      id_product === 0 &&
      validation_dateStart === false &&
      validation_dateEnd === false
    ) {

      const offset = (page - 1) * TOTAL_PER_PAGE;
      const filter_mo_start_date = await this.ormRepository
        .createQueryBuilder('production_order')
        .leftJoinAndSelect('production_order.product', 'product')
        .leftJoinAndSelect('production_order.routeHead', 'routeHead')
        .leftJoinAndSelect('production_order.employee', 'employee')
        .select([
          'production_order.id as id',
          'mo_code',
          'mo_status',
          'target_qty',
          'mo_created',
          'mo_start_date',
          'mo_prevision_start_date',
          'mo_close_date',
          'input_qty',
          'output_qty',
          'customer',
          'process_number',
          'id_route_code',
          'id_product',
          'id_employee',
          'product.product_name as product_name',
          'routeHead.name as name_route',
          'employee.username as employee',

        ])
        .where(`production_order.mo_start_date BETWEEN ' ${dateStart} 'AND' ${dateEnd}' `)
        .limit(TOTAL_PER_PAGE)
        .offset(offset)
        .getRawMany();

      const total_filter = await this.ormRepository
        .createQueryBuilder('production_order')
        .select([
          'mo_code'
        ])
        .where(`production_order.mo_start_date BETWEEN ' ${dateStart} 'AND' ${dateEnd}' `)
        .getRawMany();

      const totalOrders = total_filter.length;
      return {

        po: filter_mo_start_date,
        totalOrders,
        totalPages: totalOrders / TOTAL_PER_PAGE,

      }

    };

    //  quando vem apenas o produto

    if (
      // eslint-disable-next-line no-sequences
      mo_status.length === 0 &&
      id_product !== 0 &&
      validation_dateStart !== false &&
      validation_dateEnd !== false
    ) {

      const offset = (page - 1) * TOTAL_PER_PAGE;
      const filter_mo_start_date = await this.ormRepository
        .createQueryBuilder('production_order')
        .leftJoinAndSelect('production_order.product', 'product')
        .leftJoinAndSelect('production_order.routeHead', 'routeHead')
        .leftJoinAndSelect('production_order.employee', 'employee')
        .select([
          'production_order.id as id',
          'mo_code',
          'mo_status',
          'target_qty',
          'mo_created',
          'mo_start_date',
          'mo_prevision_start_date',
          'mo_close_date',
          'input_qty',
          'output_qty',
          'customer',
          'process_number',
          'id_route_code',
          'id_product',
          'id_employee',
          'product.product_name as product_name',
          'routeHead.name as name_route',
          'employee.username as employee',

        ])
        .where({ id_product })
        .limit(TOTAL_PER_PAGE)
        .offset(offset)
        .getRawMany();

      const total_filter = await this.ormRepository
        .createQueryBuilder('production_order')
        .select([
          'mo_code'
        ])
        .where({ id_product })
        .getRawMany();

      const totalOrders = total_filter.length;

      return {

        po: filter_mo_start_date,
        totalOrders,
        totalPages: totalOrders / TOTAL_PER_PAGE

      }

    };


    //  quando vem apenas o status

    if (
      // eslint-disable-next-line no-sequences
      mo_status.length !== 0 &&
      id_product === 0 &&
      validation_dateStart !== false &&
      validation_dateEnd !== false
    ) {

      const offset = (page - 1) * TOTAL_PER_PAGE;

      const filter_mo_start_date = await this.ormRepository
        .createQueryBuilder('production_order')
        .leftJoinAndSelect('production_order.product', 'product')
        .leftJoinAndSelect('production_order.routeHead', 'routeHead')
        .leftJoinAndSelect('production_order.employee', 'employee')
        .select([
          'production_order.id as id',
          'mo_code',
          'mo_status',
          'target_qty',
          'mo_created',
          'mo_start_date',
          'mo_prevision_start_date',
          'mo_close_date',
          'input_qty',
          'output_qty',
          'customer',
          'process_number',
          'id_route_code',
          'id_product',
          'id_employee',
          'product.product_name as product_name',
          'routeHead.name as name_route',
          'employee.username as employee',

        ])



        .where({ mo_status })
        .limit(TOTAL_PER_PAGE)
        .offset(offset)
        .getRawMany();

      const total_filter = await this.ormRepository
        .createQueryBuilder('production_order')
        .select([
          'mo_code',
        ])
        .where({ mo_status })
        .getRawMany();

      const totalOrders = total_filter.length;

      return {
        po: filter_mo_start_date,
        totalOrders,
        totalPages: totalOrders / TOTAL_PER_PAGE,
      }

    };

    //  status e produto
    if (
      // eslint-disable-next-line no-sequences
      mo_status.length !== 0 &&
      id_product !== 0 &&
      validation_dateStart !== false &&
      validation_dateEnd !== false
    ) {

      const offset = (page - 1) * TOTAL_PER_PAGE;


      const filter_mo_start_date = await this.ormRepository
        .createQueryBuilder('production_order')
        .leftJoinAndSelect('production_order.product', 'product')
        .leftJoinAndSelect('production_order.routeHead', 'routeHead')
        .leftJoinAndSelect('production_order.employee', 'employee')
        .select([
          'production_order.id as id',
          'mo_code',
          'mo_status',
          'target_qty',
          'mo_created',
          'mo_start_date',
          'mo_prevision_start_date',
          'mo_close_date',
          'input_qty',
          'output_qty',
          'customer',
          'process_number',
          'id_route_code',
          'id_product',
          'id_employee',
          'product.product_name as product_name',
          'routeHead.name as name_route',
          'employee.username as employee',

        ])

        .where({ mo_status, id_product })
        .limit(TOTAL_PER_PAGE)
        .offset(offset)
        .getRawMany();

      const total_filter = await this.ormRepository
        .createQueryBuilder('production_order')
        .select([
          'mo_code',
        ])
        .where({ mo_status, id_product })
        .getRawMany();

      const totalOrders = total_filter.length;

      return {
        po: filter_mo_start_date,
        totalOrders,
        totalPages: totalOrders / TOTAL_PER_PAGE,
      }
    };

    //  status e datas

    if (
      // eslint-disable-next-line no-sequences
      mo_status.length !== 0 &&
      id_product === 0 &&
      validation_dateStart === false &&
      validation_dateEnd === false
    ) {

      const offset = (page - 1) * TOTAL_PER_PAGE;

      const filter_mo_start_date = await this.ormRepository
        .createQueryBuilder('production_order')
        .leftJoinAndSelect('production_order.product', 'product')
        .leftJoinAndSelect('production_order.routeHead', 'routeHead')
        .leftJoinAndSelect('production_order.employee', 'employee')
        .select([
          'production_order.id as id',
          'mo_code',
          'mo_status',
          'target_qty',
          'mo_created',
          'mo_start_date',
          'mo_prevision_start_date',
          'mo_close_date',
          'input_qty',
          'output_qty',
          'customer',
          'process_number',
          'id_route_code',
          'id_product',
          'id_employee',
          'product.product_name as product_name',
          'routeHead.name as name_route',
          'employee.username as employee',

        ])
        .where(`production_order.mo_start_date BETWEEN ' ${dateStart} 'AND' ${dateEnd}' `)
        .andWhere({ mo_status })
        .limit(TOTAL_PER_PAGE)
        .offset(offset)
        .getRawMany();

      const total_filter = await this.ormRepository
        .createQueryBuilder('production_order')
        .select([
          'mo_code',
        ])
        .where(`production_order.mo_start_date BETWEEN ' ${dateStart} 'AND' ${dateEnd}' `)
        .andWhere({ mo_status })
        .getRawMany();

      const totalOrders = total_filter.length;

      return {
        po: filter_mo_start_date,
        totalOrders,
        totalPages: totalOrders / TOTAL_PER_PAGE,
      }
    };


    //  produto e datas

    if (
      // eslint-disable-next-line no-sequences
      mo_status.length === 0 &&
      id_product !== 0 &&
      validation_dateStart === false &&
      validation_dateEnd === false
    ) {

      const offset = (page - 1) * TOTAL_PER_PAGE;

      const filter_mo_start_date = await this.ormRepository
        .createQueryBuilder('production_order')
        .leftJoinAndSelect('production_order.product', 'product')
        .leftJoinAndSelect('production_order.routeHead', 'routeHead')
        .leftJoinAndSelect('production_order.employee', 'employee')
        .select([
          'production_order.id as id',
          'mo_code',
          'mo_status',
          'target_qty',
          'mo_created',
          'mo_start_date',
          'mo_prevision_start_date',
          'mo_close_date',
          'input_qty',
          'output_qty',
          'customer',
          'process_number',
          'id_route_code',
          'id_product',
          'id_employee',
          'product.product_name as product_name',
          'routeHead.name as name_route',
          'employee.username as employee',

        ])
        .where(`production_order.mo_start_date BETWEEN ' ${dateStart} 'AND' ${dateEnd}' `)
        .andWhere({ id_product })
        .limit(TOTAL_PER_PAGE)
        .offset(offset)
        .getRawMany();

      const total_filter = await this.ormRepository
        .createQueryBuilder('production_order')
        .select([
          'mo_code',
        ])
        .where(`production_order.mo_start_date BETWEEN ' ${dateStart} 'AND' ${dateEnd}' `)
        .andWhere({ id_product })
        .getRawMany();

      const totalOrders = total_filter.length;

      return {
        po: filter_mo_start_date,
        totalOrders,
        totalPages: totalOrders / TOTAL_PER_PAGE,
      }
    };

  }



  public async findAllDetailMaterialEntrance(
    id_material_entrance_smt: number
  ): Promise<DetailMaterialEntrance[] | undefined> {
    const validation = await this.ormDetailMaterialEntranceRepository
      .createQueryBuilder('detail_material_entrance_smt')
      .select([
        // 'id',
        // 'id_material_entrance_smt',
        'main_component as component',
        // 'string_qr_code',
        // 'serial_component',
        'component_quantity',
        // 'uc_code'
      ])
      .where({ id_material_entrance_smt })
      // .orderBy('detail_material_entrance_smt.id', 'DESC')
      .getRawMany();

    return validation;
  }

  public async findListCodeToolPrinter(
    id_production_order: number
  ): Promise<CheckToolPrinter[] | undefined> {
    const validation = await this.ormCheckToolPrinterRepository
      .createQueryBuilder('check_tool_printer')
      .select(['list_code'])
      .where({ id_production_order })
      .distinct(true)
      .getRawMany();

    return validation;
  }

  public async findComponentSetup(
    list_code: string
  ): Promise<MaterialManagerSetup[] | undefined> {
    const validation = await this.ormMaterialManagerSetupRepository
      .createQueryBuilder('smt_material_manager_setup')
      .select(['component', 'component_quantity'])
      .where({ list_code })
      // .orderBy('detail_material_entrance_smt.id', 'DESC')
      .getRawMany();

    return validation;
  }

  public async findComponentRefil(
    list_code: string
  ): Promise<MaterialManagerRefil[] | undefined> {
    const validation = await this.ormMaterialManagerRefilRepository
      .createQueryBuilder('smt_material_manager_refil')
      .select(['component_new as component', 'component_quantity'])
      .where({ list_code })
      // .orderBy('detail_material_entrance_smt.id', 'DESC')
      .getRawMany();

    return validation;
  }

  public async findTypeComponentScrap(
    list_code: string
  ): Promise<Scrap[] | undefined> {
    const validation = await this.ormScrapRepository
      .createQueryBuilder('scraps')
      .select([
        'serial_number as component',
        'material_quantity as component_quantity',
      ])
      .where({ list_code, type: 'componente' })
      // .orderBy('detail_material_entrance_smt.id', 'DESC')
      .getRawMany();

    return validation;
  }

  public async findIdOp(
    mo_code: string
  ): Promise<ProductionOrder[] | undefined> {
    const validation = await this.ormRepository
      .createQueryBuilder('production_order')
      .select(['id'])
      .where({ mo_code })
      .distinct(true)
      .getRawMany();

    return validation;
  }

  public async findAllLotesMaterial(
    id_product: number,
    production_order: string
  ): Promise<MaterialEntrance[] | undefined> {
    const validation = await this.ormMaterialEntranceRepository
      .createQueryBuilder('material_entrance_smt')
      .select(['id as id_lote'])
      .where({ id_product, production_order })
      .distinct(true)
      .getRawMany();

    return validation;
  }

  public async findIDProduct(
    mo_code: string
  ): Promise<ProductionOrder[] | undefined> {
    const productionOder = await this.ormRepository.find({
      where: { mo_code },
      // relations: ['product'],
    });

    return productionOder;
  }

  public async findSerialsTrackings(
    mo_number: string
  ): Promise<Tracking[] | undefined> {
    const validation = await this.ormTrackingrepository
      .createQueryBuilder('trackings')
      .select(['serial_number'])
      .where({ mo_number })
      .distinct(true)
      .getRawMany();

    return validation;
  }

  public async findSerialsInScrap(
    serial_number: string
  ): Promise<Scrap[] | undefined> {
    const validation = await this.ormScrapRepository
      .createQueryBuilder('scraps')
      .select([
        'serial_number',
        'material_quantity',
        'number_plates_panel',
        'type',
      ])
      .where({ serial_number, type: 'painel' })
      .orWhere({ serial_number, type: 'placa' })
      .getRawMany();

    return validation;
  }

  public async findComponentsSMTMaterial(
    list_code: string
  ): Promise<MaterialManager[] | undefined> {
    const validation = await this.ormMaterialManagerRepository
      .createQueryBuilder('smt_material_manager')
      .select(['main_components', 'quantity'])
      .where({ list_code })
      .distinct(true)
      .getRawMany();

    return validation;
  }

  public async ProductsIndPo(): Promise<ProductionOrder[] | undefined> {
    const validation = await this.ormRepository
      .createQueryBuilder()
      .select("production_order.mo_code")
      .addSelect("p.product_name", "product_name")
      .addSelect("p.id", "id_product")
      .from(ProductionOrder, "production_order")
      .innerJoin(Product, "p", "production_order.id_product = p.id")
      .where("production_order.id_product IS NOT NULL")
      .andWhere("production_order.deleted_at IS NULL")
      .distinctOn(["production_order.mo_code", "p.product_name", "p.id"])
      .getRawMany();

    return validation;
  }

  async finishOpList(
    id: number
  ): Promise<void> {
    await this.ormRepository
      .createQueryBuilder('production_order')
      .update(ProductionOrder)
      .set({ mo_status: "finish_op_list" })
      .where({ id })
      .execute();
  }

  async findByOPsWithComposition(): Promise<ProductionOrder[]> {
    return await this.ormRepository.find({
      relations: ["product", "product.snComposition"],
      where: {
        product: {
          snComposition: {
            created_at: Not(IsNull())
          }
        }
      }
    })
  }
}

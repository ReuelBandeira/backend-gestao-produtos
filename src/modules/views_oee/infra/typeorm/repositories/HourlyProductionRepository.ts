
// eslint-disable-next-line import/no-unresolved
import IHourlyProductionRepository from "@modules/views_oee/repositories/IHourlyProductionRepository";
import { Repository, getRepository } from "typeorm";
import CheckToolPrinter from "@modules/check_tool_printer/infra/typeorm/entities/CheckToolPrinter";
import Target from "@modules/targets/infra/typeorm/entities/Target";
import Tracking from "@modules/trackings/infra/typeorm/entities/Tracking";
import Scrap from "@modules/scrap/infra/typeorm/entities/Scrap";
import Repair from "@modules/repairs/infra/typeorm/entities/Repair";
import Shift from "@modules/shifts/infra/typeorm/entities/Shift";
import HourlyProduction from "../entities/HourlyProduction";
import HourlyProductionDetail from "../entities/HourlyProductionDetail";

// const TOTAL_PER_PAGE = 11;

export default class HourlyProductionRepository implements IHourlyProductionRepository {
  private ormRepository: Repository<HourlyProduction>;

  private ormCheckToolPrinterRepository: Repository<CheckToolPrinter>;

  private ormTrackingrepository: Repository<Tracking>;

  private ormScrapRepository: Repository<Scrap>;

  private ormDetailRepository: Repository<HourlyProductionDetail>;

  private ormRepairRepository: Repository<Repair>;

  private ormShiftRepository: Repository<Shift>;

  constructor() {
    this.ormRepository = getRepository(HourlyProduction);
    this.ormCheckToolPrinterRepository = getRepository(CheckToolPrinter);
    this.ormTrackingrepository = getRepository(Tracking);
    this.ormScrapRepository = getRepository(Scrap);
    this.ormDetailRepository = getRepository(HourlyProductionDetail);
    this.ormRepairRepository = getRepository(Repair);
    this.ormShiftRepository = getRepository(Shift);

  }

  public async findAllShifts(): Promise<Shift[]> {
    return await this.ormShiftRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  public async findAllViewsLinesHourlyProductionDetail(): Promise<HourlyProductionDetail[]> {
    const result = await this.ormDetailRepository.query(
      `${'SELECT * FROM vw_hourly_production_detail'}`
    );
    return result;
  }

  public async findAllViewsLinesHourlyProduction(): Promise<HourlyProduction[]> {
    const result = await this.ormRepository.query(
      `${'SELECT * FROM vw_hourly_production'}`
    );
    return result;
  }

  public async findToolPrinter(id_line: number): Promise<CheckToolPrinter[]> {
    const validation = await this.ormCheckToolPrinterRepository
      .createQueryBuilder('check_tool_printer')
      .select(['targets.target as target', 'targets.id_product as id_product', 'products.product_name as product_name','products.description as description','production_order.mo_code as mo_code','products.number_plates_panel as number_plates_panel'])
      .innerJoin('targets', 'targets', 'targets.id_product = check_tool_printer.id_product')
      .innerJoin('products', 'products', 'products.id = check_tool_printer.id_product') // Junção com a tabela 'products'
      .innerJoin('production_order', 'production_order', 'production_order.id = check_tool_printer.id_production_order') // Junção com a tabela 'production order'
      .where('check_tool_printer.id_line = :id_line', { id_line })
      .andWhere('check_tool_printer.status IS NULL')
      .andWhere('targets.id_line = check_tool_printer.id_line') // Adiciona a condição para o innerJoin
      // .orderBy('check_tool_printer.id', 'DESC') retirado pelo erro em homologação
      .distinct(true)
      .getRawMany();

    return validation;
  }


  public async findIDTrackings(serial_number: string,startHour:string,endHour:string): Promise<Tracking[]> {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    const startDate = String(formattedDate).concat(`T${startHour}:00.000Z`);
    const endDate = String(formattedDate).concat(`T${endHour}:59.999Z`);
    const trackings = await this.ormTrackingrepository
      .createQueryBuilder('trackings')
      .select('DISTINCT trackings.id', 'id_tracking')
      .where('trackings.serial_number = :serial_number', { serial_number })
      .andWhere('trackings.out_line_time BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getRawMany();

    return trackings;
  }



  public async findSerialScraps(serial_number:string,startHour:string,endHour:string): Promise<Scrap[]> {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    const startDate = String(formattedDate).concat(`T${startHour}:00.000Z`);
    const endDate = String(formattedDate).concat(`T${endHour}:59.999Z`);
    const scraps = await this.ormScrapRepository
      .createQueryBuilder('scraps')
      .select(['material_quantity'])
      .where({serial_number})
      .andWhere('scraps.created_at BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getRawMany();

    return scraps;
  }

  public async findRepairs(id_tracking:number,startHour:string,endHour:string): Promise<Scrap[]> {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    const startDate = String(formattedDate).concat(`T${startHour}:00.000Z`);
    const endDate = String(formattedDate).concat(`T${endHour}:59.999Z`);
    const repairs = await this.ormRepairRepository
      .createQueryBuilder('repairs')
      .select(['date_repair'])
      .where({id_tracking})
      .andWhere('repairs.created_at BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getRawMany();

    return repairs;
  }


}

import ICreateMaintenanceFeederDTO, {
  MaintenanceFeederPagination,
} from '@modules/maintenance_feeder/dtos/ICreateMaintenanceFeederDTO';
import {IMaintenanceFeederRepository} from '@modules/maintenance_feeder/repositories/IMaintenanceFeederRepository';
import { getRepository, Like, Repository } from 'typeorm';
import {ICreateFeederDTO} from '@modules/feeder/dtos/ICreateFeederDTO';
import {IFeederRepository} from '@modules/feeder/repositories/IFeederRepository';
import { Feeder } from '@modules/feeder/infra/typeorm/entities/Feeder';
import Action from '@modules/action/infra/typeorm/entities/Action';
import { FeederRepository } from '../../typeorm/repositories/FeederRepository';
import MaintenanceFeeder, { MaintenanceType } from '../entities/MaintenanceFeeder';
import MaintenanceFeederActions from '../entities/MaintenanceFeederActions';

const TOTAL_PER_PAGE = 11;

export  class MaintenanceFeederRepository implements IMaintenanceFeederRepository {
  private ormRepository: Repository<MaintenanceFeeder>;

  private ormrepository: Repository<Feeder>;

  private ormActionMaintenancerepository: Repository<MaintenanceFeederActions>;

  private ormActionrepository: Repository<Action>;

  constructor() {
    this.ormRepository = getRepository(MaintenanceFeeder);
    this.ormrepository = getRepository(Feeder);
    this.ormActionMaintenancerepository = getRepository(MaintenanceFeederActions);
    this.ormActionrepository = getRepository(Action);

  }

  public async findById(id: number): Promise<MaintenanceFeeder | undefined> {
    const findMaintenanceFeeder = await this.ormRepository.findOne({ id });

    return findMaintenanceFeeder;
  }

  public async findByMaintenanceFeederName(
    id: number,
  ): Promise<MaintenanceFeeder | undefined> {
    const findMaintenanceFeeder = await this.ormRepository.findOne({

      where: { id },
    });

    return findMaintenanceFeeder;
  }

  public async findByProductNameSearch(
    id_feeders: number,
    page=1,
  ): Promise<(MaintenanceFeederPagination | undefined)[] | undefined> {
    const findMaintenanceFeeder = await this.ormRepository.find({
      relations: ['feeders','employee','cause','defect'],
      where: {id_feeders: Like(`%${id_feeders}%`) },
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const  totalMaintenanceFeeder = (await this.ormRepository.find({
      where: { id_feeders: Like(`%${id_feeders}%`)},
    })).length;

    return {
      findMaintenanceFeeder,
      totalPages:totalMaintenanceFeeder/ TOTAL_PER_PAGE,
      totalMaintenanceFeeder,
    };


  }

  // eslint-disable-next-line consistent-return
  public async findAllMaintenanceFeederFilter(
    page = 1 ,
    id_feeders: number,
    type_maintenance:MaintenanceType,
  ): Promise<MaintenanceFeederPagination> {

    // eslint-disable-next-line eqeqeq
    if(id_feeders  && type_maintenance && type_maintenance !='undefined'){


      const toolingControl = await this.ormRepository.find({
        where: {id_feeders, type_maintenance},
        relations: ['feeders','cause','defect','employee'],
        order: { id: 'DESC' },
        skip: (page - 1) * TOTAL_PER_PAGE,
        take: TOTAL_PER_PAGE,
      });

      const  totalMaintenanceFeeder = (await this.ormRepository.find({
        where: {id_feeders, type_maintenance},
      })).length;

      return {
        toolingControl,
        totalMaintenanceFeeder,
        totalPages:  totalMaintenanceFeeder / TOTAL_PER_PAGE,
      };
    }
      if(id_feeders){
        const toolingControl = await this.ormRepository.find({
          relations: ['feeders','cause','defect','employee'],
          where: {id_feeders},
          order: { id: 'DESC' },
          skip: (page - 1) * TOTAL_PER_PAGE,
          take: TOTAL_PER_PAGE,
        });

        const totalMaintenanceFeeder = (await this.ormRepository.find({
          where: {id_feeders}
        })).length;

        return {
          toolingControl,
          totalMaintenanceFeeder,
          totalPages: totalMaintenanceFeeder / TOTAL_PER_PAGE,
        };

      }

        if(type_maintenance){
          const toolingControl = await this.ormRepository.find({
            relations: ['feeders','cause','defect','employee'],
            where: {type_maintenance},
            order: { id: 'DESC' },
            skip: (page - 1) * TOTAL_PER_PAGE,
            take: TOTAL_PER_PAGE,
          });
          const totalMaintenanceFeeder = (await this.ormRepository.find({
            where: {type_maintenance}
          })).length;

          return {
            toolingControl,
            totalMaintenanceFeeder,
            totalPages: totalMaintenanceFeeder / TOTAL_PER_PAGE,
          };
        }
  }

  public async create({
    id_feeders,
    id_action,
    id_cause,
    id_defect,
    type_maintenance,
    id_employee,


  }: ICreateMaintenanceFeederDTO): Promise<MaintenanceFeeder> {
    const toolingControl = this.ormRepository.create({
      id_feeders,
      id_action,
      id_cause,
      id_defect,
      type_maintenance,
      id_employee,


    });

    await this.ormRepository.save(toolingControl);

    return toolingControl;
  }

  public async update(
    id: number,
    id_feeders:number,

    id_cause:number,
    id_defect: number,
    type_maintenance:MaintenanceType,
  ): Promise<void> {
    await this.ormRepository.createQueryBuilder()
      .update(MaintenanceFeeder)
      .set({ id_feeders,id_cause,id_defect,type_maintenance})
      .where({ id })
      .execute();
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async findByToolgroupBBName(
    id_feeders: number,

    id_cause: number,
    id_defect: number,
    type_maintenance:MaintenanceType,
  ): Promise<MaintenanceFeeder | undefined> {
    const findToolgroup = await this.ormRepository.findOne({

      where: {
        id_feeders,

        id_cause,
        id_defect,
        type_maintenance

      },
    });

    return findToolgroup;
  }


  public async findAllProducts(page = 1): Promise<MaintenanceFeederPagination> {
    const maintenanceFeeder = await this.ormRepository.find({
      relations: ['feeders','cause','defect','employee'],
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalMaintenanceFeeder = (await this.ormRepository.find()).length;

    return {
      maintenanceFeeder,
      totalMaintenanceFeeder,
      totalPages: totalMaintenanceFeeder / TOTAL_PER_PAGE,
    };
  }

  public async findAllMaintenanceFeederList(page=1):Promise <MaintenanceFeeder[]> {
    const tooling_control = await this.ormRepository.find({
      order:{id:'DESC'},
      relations: ['feeders','cause','defect','employee'],
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    return  tooling_control;
  }

  public async filterDateTypeSn(
    dateStart: Date,
    dateEnd: Date,
    type_maintenance:string,
    id_feeders: number,
    feeder_code:string,

  ): Promise<MaintenanceFeeder[]| undefined > {

    const checkExistFeeder = await this.feedersRegistered(feeder_code);
    const feeder_codes = checkExistFeeder[0];

    const check = type_maintenance;
    const sizetype=check.length;

    const filterfeedersDate=[];
    if(dateStart!= 'undefined' && dateEnd != 'undefined' && sizetype ===0 ){
      const filterDate = await this.findReportFeeder( dateStart,dateEnd);
      filterfeedersDate.push(filterDate);
    }
    const datestart = dateStart;
    const size_datestart=datestart.length;

    const checkFeeders = feeder_codes;
    const filterfilterSn=[];

    if(checkFeeders !==0 && size_datestart ===0 ){
      const filterSn = await this.findFilterFeeder(feeder_codes);
      filterfilterSn.push(filterSn);
    }
    const allfilterfilterSn=[];
    if(dateStart!= 'undefined' && dateEnd != 'undefined' && sizetype !==0){
      const filterDateType = await this.findReportFeederType( dateStart,dateEnd,type_maintenance);
      allfilterfilterSn.push(filterDateType);
    }

    return {
      filterDate:filterfeedersDate,
      filterSn:filterfilterSn,
      filterDateType:allfilterfilterSn

    };
  }


  public async filterFeederCod(
    feeder_code:string,

  ): Promise<MaintenanceFeeder[]| undefined > {

    const checkExistFeeder = await this.feedersRegistered(feeder_code);
    const feeder_codes = checkExistFeeder[0];

    const filterSn = await this.findFilterFeeder(feeder_codes);

    return filterSn
  }


  async findReportFeeder(

    dateStart: Date,
    dateEnd: Date,
  ): Promise<MaintenanceFeeder[]| undefined> {



    const material = await this.ormRepository

      .createQueryBuilder('maintenance_feeder')

      .leftJoinAndSelect('maintenance_feeder.feeders', 'feeders')
      .leftJoinAndSelect('maintenance_feeder.employee', 'employee')
      .leftJoinAndSelect('maintenance_feeder.cause', 'cause')
      .leftJoinAndSelect('maintenance_feeder.defect', 'defect')

      .select([
        'feeders.feeder_code',
        'cause.description',
        'cause.code',
        'defect.description',
        'defect.code',
        'type_maintenance',
        'employee.name',
        'employee.username',
        'maintenance_feeder.created_at',
        'maintenance_feeder.id'
      ])
      .where ( `maintenance_feeder.created_at BETWEEN ' ${dateStart} 'AND' ${dateEnd}'` )

      .getRawMany();





    return material;
  }

  async findFilterFeeder(
    id_feeders: number,
  ): Promise<MaintenanceFeeder[]| undefined> {
    const material = await this.ormRepository

      .createQueryBuilder('maintenance_feeder')

      .leftJoinAndSelect('maintenance_feeder.feeders', 'feeders')
      .leftJoinAndSelect('maintenance_feeder.employee', 'employee')
      .leftJoinAndSelect('maintenance_feeder.cause', 'cause')
      .leftJoinAndSelect('maintenance_feeder.defect', 'defect')

      .select([
        'feeders.feeder_code',
        'cause.description',
        'cause.code',
        'defect.description',
        'defect.code',
        'type_maintenance',
        'employee.name',
        'employee.username',
        'maintenance_feeder.created_at',
        'maintenance_feeder.id'
      ])
      .where ({id_feeders})

      .getRawMany();

    return material;
  }

  async findReportFeederType(
    dateStart: Date,
    dateEnd: Date,
    type_maintenance:string,
  ): Promise<MaintenanceFeeder[]| undefined> {
    const material = await this.ormRepository

      .createQueryBuilder('maintenance_feeder')

      .leftJoinAndSelect('maintenance_feeder.feeders', 'feeders')
      .leftJoinAndSelect('maintenance_feeder.employee', 'employee')
      .leftJoinAndSelect('maintenance_feeder.cause', 'cause')
      .leftJoinAndSelect('maintenance_feeder.defect', 'defect')

      .select([
        'feeders.feeder_code',
        'cause.description',
        'cause.code',
        'defect.description',
        'defect.code',
        'type_maintenance',
        'employee.name',
        'employee.username',
        'maintenance_feeder.created_at',
        'maintenance_feeder.id'
      ])
      .where ( `maintenance_feeder.created_at BETWEEN ' ${dateStart} 'AND' ${dateEnd}' ` )
      .andWhere({type_maintenance})
      .getRawMany();
    return material;
  }

  public async feedersRegistered(
    feeder_code: string,
  ): Promise<Feeder[]> {
    const feeders = await this.ormrepository
      .createQueryBuilder()
      .select([
        'id',
        'feeder_code',
        'status',
        'used_qty'
      ])
      .where({feeder_code})
      .getRawMany();

    return feeders;
  }

  async findActions(
    id_maintenance_feeder : number,
  ): Promise<MaintenanceFeederActions[]| undefined> {
    const material = await this.ormActionMaintenancerepository

      .createQueryBuilder('maintenance_feeder_actions')

      .leftJoinAndSelect('maintenance_feeder_actions.action', 'action')
      .select([
        'id_maintenance_feeder',
        'action.description',
        'action.code',

      ])
      .where ({id_maintenance_feeder})
      .getRawMany();
    return material;
  }



  async delete_solder_paste(
    id_maintenance_feeder : number
  ): Promise<void> {
    await this.ormActionMaintenancerepository
      .createQueryBuilder('maintenance_feeder_actions')
      .update(MaintenanceFeederActions)
      .set({deleted_at: new Date()})
      .where({id_maintenance_feeder})
      .execute();
  }

  async updateStatusFeeder(
    id_feeders:number,
  ): Promise<void> {
    await this.ormRepository.createQueryBuilder()
      .update(Feeder)
      .set({status: 'available',used_qty:0})
      .where({ id:id_feeders })
      .execute();
  }

}

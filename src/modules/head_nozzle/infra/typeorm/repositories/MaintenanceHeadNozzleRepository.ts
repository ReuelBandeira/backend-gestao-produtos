import ICreateMaintenanceHeadNozzleDTO from '@modules/head_nozzle/dtos/ICreateMaintenanceHeadNozzleDTO';
import IMaintenanceHeadNozzleRepository from '@modules/head_nozzle/repositories/IMaintenanceHeadNozzleRepository';
import { getRepository, Like, Repository } from 'typeorm';
import MaintenanceHeadNozzle from '../entities/MaintenanceHeadNozzle';

const TOTAL_PER_PAGE = 11;

export default class MaintenanceHeadNozzleRepository implements IMaintenanceHeadNozzleRepository {
  private ormRepository: Repository<MaintenanceHeadNozzle>;

  constructor() {
    this.ormRepository = getRepository(MaintenanceHeadNozzle);

  }

  public async findById(id: number): Promise<MaintenanceHeadNozzle | undefined> {
    // eslint-disable-next-line no-shadow
    const headNozzle = await this.ormRepository.findOne({
      where: { id },
    });

    return headNozzle;
  }

  public async findByName(id_model:number,serial_number: string): Promise<MaintenanceHeadNozzle | undefined> {
    // eslint-disable-next-line no-shadow
    const MaintenanceHeadNozzle = await this.ormRepository.findOne({
      relations: ['headNozzle','cause','action','defect','employee'],
      where: {id_model,serial_number }
    });

    return MaintenanceHeadNozzle;
  }

  public async create(MaintenanceHeadNozzleData: ICreateMaintenanceHeadNozzleDTO): Promise<MaintenanceHeadNozzle> {
    // eslint-disable-next-line no-shadow
    const MaintenanceHeadNozzle = this.ormRepository.create(MaintenanceHeadNozzleData);
    await this.ormRepository.save(MaintenanceHeadNozzle);

    return MaintenanceHeadNozzle;
  }

  public async update(MaintenanceHeadNozzleData: MaintenanceHeadNozzle): Promise<MaintenanceHeadNozzle> {
    // eslint-disable-next-line no-shadow
    const MaintenanceHeadNozzle = await this.ormRepository.save(MaintenanceHeadNozzleData);
    return MaintenanceHeadNozzle;
  }

  public async findAllMaintenanceHeadNozzle(page=1,): Promise<MaintenanceHeadNozzle | MaintenanceHeadNozzle[]> {
    // eslint-disable-next-line no-shadow
    const MaintenanceHeadNozzle = await this.ormRepository.find({
      relations: ['headNozzle','headNozzle.model','cause','action','defect','employee'],
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalMaintenanceHeadNozzle = (await this.ormRepository.find()).length;

    return {
      MaintenanceHeadNozzle,
      totalPages:totalMaintenanceHeadNozzle/ TOTAL_PER_PAGE,
      totalMaintenanceHeadNozzle,

    };
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async findAllRegisters(): Promise<MaintenanceHeadNozzle | MaintenanceHeadNozzle[]> {
    // eslint-disable-next-line no-shadow
    const MaintenanceHeadNozzle = await this.ormRepository.find({
      relations: ['headNozzle', 'headNozzle.model', 'cause', 'action', 'defect', 'employee'], // Include 'headNozzle.model' relation
      order: { id: 'DESC' },
    });
    return MaintenanceHeadNozzle;
  }


  public async filterReport(dateStart: Date, dateEnd: Date): Promise<MaintenanceHeadNozzle| MaintenanceHeadNozzle[]> {

    const startDate = String(dateStart).concat("T00:00:00.000Z");
    const endDate = String(dateEnd).concat("T23:59:59.999Z");

    // eslint-disable-next-line no-shadow
    const MaintenanceHeadNozzle = await this.ormRepository
      .createQueryBuilder("head_nozzle_maintenance")
      .leftJoinAndSelect("head_nozzle_maintenance.headNozzle", "headNozzle")
      .leftJoinAndSelect("head_nozzle_maintenance.cause", "cause")
      .leftJoinAndSelect("head_nozzle_maintenance.action", "action")
      .leftJoinAndSelect("head_nozzle_maintenance.defect", "defect")
      .leftJoinAndSelect("head_nozzle_maintenance.employee", "employee")
      .leftJoinAndSelect("headNozzle.model", "model") // Include the "model" relation
      .where("head_nozzle_maintenance.created_at BETWEEN :startDate AND :endDate", {
        startDate,
        endDate,
      })
      .orderBy("head_nozzle_maintenance.id", "DESC")
      .getMany();

    return MaintenanceHeadNozzle;
  }



}

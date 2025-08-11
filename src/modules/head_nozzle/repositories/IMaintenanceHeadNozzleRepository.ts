import ICreateMaintenanceHeadNozzleDTO from '../dtos/ICreateMaintenanceHeadNozzleDTO';
import MaintenanceHeadNozzle from '../infra/typeorm/entities/MaintenanceHeadNozzle';

export default interface IMaintenanceHeadNozzleRepository {
  findById(id: number): Promise<MaintenanceHeadNozzle | undefined>;
  findByName(id_model: number,serial_number: string): Promise<MaintenanceHeadNozzle | undefined>;
  findAllMaintenanceHeadNozzle(): Promise<MaintenanceHeadNozzle | MaintenanceHeadNozzle[]>;

  create(data: ICreateMaintenanceHeadNozzleDTO): Promise<MaintenanceHeadNozzle>;
  update(model: MaintenanceHeadNozzle): Promise<MaintenanceHeadNozzle>;
  delete(id: number): Promise<void>;

}

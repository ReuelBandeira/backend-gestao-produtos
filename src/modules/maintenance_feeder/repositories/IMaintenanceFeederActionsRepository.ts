import ICreateMaintenanceFeederActionsDTO from '../dtos/ICreateMaintenanceFeederActionsDTO';
import MaintenanceFeederActions from '../infra/typeorm/entities/MaintenanceFeederActions';

export  interface IMaintenanceFeederActionsRepository {

  create_maintenance_actions(data: ICreateMaintenanceFeederActionsDTO): Promise<MaintenanceFeederActions>;

}

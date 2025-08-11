
import MaintenanceOpenDw from '../infra/typeorm/entities/MaintenanceOpenDw';

export default interface IMaintenanceOpenDwRepository {
  findViewsIdLineListPoHours(id_line: number): Promise<MaintenanceOpenDw | MaintenanceOpenDw[]>;
  allListPoHours(): Promise<MaintenanceOpenDw| MaintenanceOpenDw[]>;
}

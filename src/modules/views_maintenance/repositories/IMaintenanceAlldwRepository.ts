
import MaintenanceAlldw from '../infra/typeorm/entities/MaintenanceAlldw';

export default interface IMaintenanceAlldwRepository {
  findViewsIdLineListPoHours(id_line: number): Promise<MaintenanceAlldw | MaintenanceAlldw[]>;
  allListPoHours(): Promise<MaintenanceAlldw| MaintenanceAlldw[]>;
}


import MaintenanceTechnician from '../infra/typeorm/entities/MaintenanceTechnician';

export default interface IMaintenanceTechnicianRepository {
  findViewsIdLineListPoHours(id_line: number): Promise<MaintenanceTechnician | MaintenanceTechnician[]>;
  allListPoHours(): Promise<MaintenanceTechnician| MaintenanceTechnician[]>;
}

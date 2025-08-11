
import MaintenanceTeam from '../infra/typeorm/entities/MaintenanceTeam';

export default interface IMaintenanceTeamRepository {
  findViewsIdLineListPoHours(id_line: number): Promise<MaintenanceTeam | MaintenanceTeam[]>;
  allListPoHours(): Promise<MaintenanceTeam| MaintenanceTeam[]>;
}

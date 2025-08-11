
import QualityTeam from '../infra/typeorm/entities/QualityTeam';

export default interface IQualityTeamRepository {
  DateQualityTeam(date: Date): Promise<QualityTeam[]>;

}

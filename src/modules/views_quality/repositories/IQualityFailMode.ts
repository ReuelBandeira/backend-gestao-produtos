
import QualityFailMode from '../infra/typeorm/entities/QualityFailMode';

export default interface IQualityFailModeRepository {
  DateQualityFailMode(date: Date): Promise<QualityFailMode[]>;

}

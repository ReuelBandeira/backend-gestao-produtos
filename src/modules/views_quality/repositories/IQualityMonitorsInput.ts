
import QualityMonitorsInput from '../infra/typeorm/entities/QualityMonitorsInput';

export default interface IQualityMonitorsInputRepository {
  DateQualityMonitorsInput(date: Date): Promise<QualityMonitorsInput[]>;

}


import QualityOrigin from '../infra/typeorm/entities/QualityOrigin';

export default interface IQualityOriginRepository {
  DateQualityOrigin(date: Date): Promise<QualityOrigin[]>;

}

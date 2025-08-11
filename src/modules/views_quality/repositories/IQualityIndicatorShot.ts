
import QualityIndicatorShot from '../infra/typeorm/entities/QualityIndicatorShot';

export default interface IQualityIndicatorShotRepository {
  DateQualityIndicatorShot(date: Date): Promise<QualityIndicatorShot[]>;

}


import QualityIndicatorDefects from '../infra/typeorm/entities/QualityIndicatorDefects';

export default interface IQualityIndicatorDefectsRepository {
  DateQualityIndicatorDefects(date: Date): Promise<QualityIndicatorDefects[]>;

}

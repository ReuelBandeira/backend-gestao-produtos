
import QualityIndicatorProduction from '../infra/typeorm/entities/QualityIndicatorProduction';

export default interface IQualityIndicatorProductionRepository {
  DateQualityIndicatorProduction(date: Date): Promise<QualityIndicatorProduction[]>;

}

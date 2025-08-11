
import QualityDefectsPosition from '../infra/typeorm/entities/QualityDefectsPosition';

export default interface IQualityDefectsPositionRepository {
  DateQualityDefectsPosition(date: Date): Promise<QualityDefectsPosition[]>;

}

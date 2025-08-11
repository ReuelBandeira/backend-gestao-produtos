
import QualityAllDefects from '../infra/typeorm/entities/QualityAllDefects';

export default interface IQualityAllDefectsRepository {
  DateQualityAllDefects(date: Date): Promise<QualityAllDefects[]>;

}

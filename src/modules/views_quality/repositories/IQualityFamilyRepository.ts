
import QualityFamily from '../infra/typeorm/entities/QualityFamily';

export default interface IQualityFamilyRepository {
  DateQualityFamily(date: Date): Promise<QualityFamily[]>;

}

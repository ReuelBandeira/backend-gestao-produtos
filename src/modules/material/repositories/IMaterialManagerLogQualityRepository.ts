import {
  ICreateMaterialLogQualityDTO,
} from '../dtos/ICreateLogQuality';
import  MaterialManagerLogQuality  from '../infra/typeorm/entities/MaterialManagerLogQuality';

export default interface IMaterialManagerLogQuality {
  create(
    data: ICreateMaterialLogQualityDTO[] | ICreateMaterialLogQualityDTO,
  ): Promise<MaterialManagerLogQuality[] | MaterialManagerLogQuality>;

}

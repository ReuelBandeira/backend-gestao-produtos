import {
  ICreateMaterialLogRefilDTO,
} from '../dtos/ICreateLogRefil';
import  MaterialManagerLogRefil  from '../infra/typeorm/entities/MaterialManagerLogRefil';

export default interface IMaterialLogRefil {
  create(
    data: ICreateMaterialLogRefilDTO[] | ICreateMaterialLogRefilDTO,
  ): Promise<MaterialManagerLogRefil[] | MaterialManagerLogRefil>;

}

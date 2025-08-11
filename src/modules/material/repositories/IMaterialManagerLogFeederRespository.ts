import {
  ICreateMaterialLogFeederDTO,
} from '../dtos/ICreateLogFeeder';
import  MaterialManagerLogFeeder  from '../infra/typeorm/entities/MaterialManagerLogFeeder';

export default interface IMaterialManagerLogFeeder {
  create(
    data: ICreateMaterialLogFeederDTO[] | ICreateMaterialLogFeederDTO,
  ): Promise<MaterialManagerLogFeeder[] | MaterialManagerLogFeeder>;

}

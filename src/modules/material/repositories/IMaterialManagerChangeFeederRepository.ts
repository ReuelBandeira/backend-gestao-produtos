import ICreateChangeFeederDTO from '../dtos/ICreateChangeFeederDTO';
import MaterialManagerChangeFeeder from '../infra/typeorm/entities/MaterialManagerChangeFeeder';

export default interface IMaterialManagerChangeFeederRepository {
  create(data: ICreateChangeFeederDTO): Promise<MaterialManagerChangeFeeder>;
  findChangeFeederByListCodeAndFeederNew(
    list_code: string,
    id_feeder_new: number,
  ): Promise<MaterialManagerChangeFeeder | undefined>;

  validationFeederMaterialChange(list_code: string,module: string,position :number,checkFeederId : number): Promise<MaterialManagerChangeFeeder[]>;
  updateListCode(list_code: string, list_codeAlt: string):Promise<void>;

  check_feeder_change(list_code: string): Promise<MaterialManagerChangeFeeder[]>;



}

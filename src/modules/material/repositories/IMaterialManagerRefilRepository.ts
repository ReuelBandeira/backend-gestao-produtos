import ICreateMaterialManagerRefilDTO from '../dtos/ICreateMaterialManagerRefilDTO';
import MaterialManagerRefil from '../infra/typeorm/entities/MaterialManagerRefil';

export default interface IMaterialManagerRefilRepository {
  create(data: ICreateMaterialManagerRefilDTO): Promise<MaterialManagerRefil>;
  findByListCode(list_code: string): Promise<MaterialManagerRefil[]>;
  findByComponentAndSerial(
    component: string,
    serial: string
  ): Promise<MaterialManagerRefil | undefined>;
  validationEntranceRefil(sequential_new: string): Promise<MaterialManagerRefil[]>;
  checkComponentOld(list_code: string, machine: string, module: string, side: number, position :number): Promise<MaterialManagerRefil[]>;

}

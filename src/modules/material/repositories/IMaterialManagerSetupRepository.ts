import ICreateSetupDTO from '../dtos/ICreateSetupDTO';
import { MaterialManagerSetup } from '../infra/typeorm/entities/MaterialManagerSetup';

export default interface IMaterialManagerSetupRepository {
  findLastMaterialManagerByListCode(
    list_code: string
  ): Promise<MaterialManagerSetup | undefined>;
  create(data: ICreateSetupDTO): Promise<MaterialManagerSetup>;
  getTotalSetupByListCode(list_code: string): Promise<number>;
  verifyComponentAlreadyRead(
    list_code: string,
    module: string,
    side: number,
    position: number,
    component: string
  ): Promise<boolean>;
  verifyLineListStatus(
    id_line: number,
    list_code: string
  ): Promise<MaterialManagerSetup[]>;

  findSetupByListCode(list_code: string): Promise<MaterialManagerSetup[]>;

  findSetupByLog(
    dateStart: Date,
    dateEnd: Date
  ): Promise<MaterialManagerSetup[] | undefined>;

  findSetupFeeder(
    list_code: string
  ): Promise<MaterialManagerSetup[] | undefined>;

  verifyLineList(list_code: string): Promise<MaterialManagerSetup[]>;

  verifyStatusLineList(id_line: number): Promise<MaterialManagerSetup[]>;

  updateStatusSetup(list_code: string): Promise<void>;

  verifyComponentSetup(
    list_code: string,
    component: string,
    alternative_component: string,
    module: string,
    side: number,
    position: number
  ): Promise<MaterialManagerSetup[]>;

  verifyComponentSetupRefil(
    list_code: string,
    component: string,
    module: string,
    position: number
  ): Promise<MaterialManagerSetup | undefined>;

  findByComponentAndSerial(
    component: string,
    serial: string
  ): Promise<MaterialManagerSetup | undefined>;

  validationFeederSetup(list_code: string,module: string,position :number,checkFeederId : number): Promise<MaterialManagerSetup[]>;


}

import {
  ICreateMaterialManagerDTO,
  IMaterialPagination,
} from '../dtos/ICreateMaterialManagerDTO';
import { MaterialManager } from '../infra/typeorm/entities/MaterialManager';


export default interface IMaterialManagerRepository {
  findByComponentAndListCode(
    component: string,
    list_code: string
  ): Promise<MaterialManager[]>;
  findByStructCode(
    list_code: string,
  ): Promise<MaterialManager[] | undefined>;
  findByListCodes(list_code: string): Promise<MaterialManager[]>;
  create(
    data: ICreateMaterialManagerDTO[] | ICreateMaterialManagerDTO
  ): Promise<MaterialManager[] | MaterialManager>;
  toggleDisableComponentMaterial(
    material: MaterialManager
  ): Promise<MaterialManager>;
  findComponentOrAlternateMaterial(
    component: string,
    module: string,
    side: number,
    position: number,
    list_code: string
  ): Promise<MaterialManager | undefined>;

  findComponent(
    component: string,
    module: string,
    side: number,
    position: number,
    list_code: string
  ): Promise<MaterialManager[]>;

  findDetailsToPdfByListCode(
    list_code: string
  ): Promise<MaterialManager[] | undefined>;
  findDetailsByListCode(
    list_code: string
  ): Promise<MaterialManager[] | undefined>;
  findByListCodeSearch(
    list_code: string
  ): Promise<MaterialManager[] | undefined>;
  countPositionInModule(
    list_code: string,
    machine: string,
    module: string,
    side: number
  ): Promise<number>;
  findById(id: number): Promise<MaterialManager | undefined>;
  listAll(page: number): Promise<IMaterialPagination>;
  delete(list_code: string): Promise<void>;
  updateStatus(
    list_code: string,
    status: 'online' | 'loading' | 'available' | 'ready' | 'finished'| 'update',
    id_employee: number
  ): Promise<void>;
  updateStatusComponent(id: number): Promise<void>;
  validateFieldListMaterial(
    field: string,
    value: string | number
  ): Promise<boolean>;
  validateFieldListMaterialWithListCode(
    field: string,
    value: string | number,
    list_code: string
  ): Promise<boolean>;
  totalComponentSMTList(list_code: string): Promise<number>;

  verifyListStatus(list_code: string): Promise<MaterialManager[]>;

  verifyProductList(struct_code: string): Promise<MaterialManager | undefined>;

  verifyComponentMaterialListMerge(
    struct_code: string,
    list_code: string,
    component: string,
    module: string,
    side: number,
    position: number
  ): Promise<MaterialManager | undefined>;

  updateQuantityComponentMerge(
    list_code: string,
    components: string,
    module: string,
    side: number,
    position: number,
    quantity: number,
    qtyBot: number,
    struct_code?: string,
  ): Promise<void>;

  updateSideProductComponentMerge(
    list_code: string,
    struct_code: string
  ): Promise<void>;

  updateFeederPitch(id: number, feederPitch: number): Promise<void>;

  //
  listAllFilter(
    page: number,
    product_name: string,
    status: string,
    side: string
  ): Promise<IMaterialPagination | undefined>;

  updateStatusComponentOnline(list_code: string): Promise<void>;

  checkLatestProductList(list_code: string): Promise<MaterialManager[]>;

  checkLatestProductListMerge(list_code: string): Promise<MaterialManager[]>;

  updateStatusComponentRead(
    list_code: string,
    main_components: string,
    position: number
  ): Promise<void>;

  consultarModulo(list_code: string): Promise<MaterialManager[] | undefined>;

  moduloLido(list_code: string): Promise<MaterialManager[] | undefined>;

  componentAlternativeLines(
    list_code: string,
    component: string,
    position: number
  ): Promise<MaterialManager[]>;

  totalComponentSMTListQuality(
    list_code: string,
    machine: string,
    module: string,
    side: number
  ): Promise<number>;

  findProductName(
    list_code: string,
  ): Promise<MaterialManager[] | undefined>;

  findProductDelimiter(
    product_name: string,
  ): Promise<MaterialManager[] | undefined>;

  updateFile(list_code: string, filename: string): Promise<any>;

  findDetailsByListCodeQuality(
    list_code: string
  ): Promise<MaterialManager[] | undefined>;





}

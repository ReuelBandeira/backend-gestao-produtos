import ICreateSolderPasteControllDTO, {
  SolderPasteControllPagination,
} from '../dtos/ICreateSolderPasteControllDTO';
import SolderPasteControll from '../infra/typeorm/entities/SolderPasteControll';

export default interface ISolderPasteControllRepository {
  findBySerial(serial_paste: string): Promise<SolderPasteControll | undefined>;

  findSerialSolderPasteProvider(
    serial_paste: string
  ): Promise<SolderPasteControll>;

  restriction_use_generated_tag(
    serial_paste: string
  ): Promise<SolderPasteControll>;

  findAllSolderPasteControllFreezerOrderAscLedFree(): Promise<
    SolderPasteControll[]
  >;

  findAllSolderPasteControllFreezer(
    page: number
  ): Promise<SolderPasteControllPagination | SolderPasteControll[]>;
  findAllSolderPasteControllUnFreezer(
    page: number
  ): Promise<SolderPasteControllPagination | SolderPasteControll[]>;
  findAllSolderPasteControllUse(
    page: number
  ): Promise<SolderPasteControllPagination | SolderPasteControll[]>;

  create(data: ICreateSolderPasteControllDTO): Promise<SolderPasteControll>;

  findBySerialName(
    serial_paste: string
  ): Promise<SolderPasteControll | undefined>;

  findBySerialuseName(
    serial_paste: string
  ): Promise<SolderPasteControll | undefined>;

  updateDateTimeFreezer(serial_paste: string,id_employee_freezer: number): Promise<void>;

  updateDateTimeUnFreezer(serial_paste: string,id_employee_unfreezer: number): Promise<void>;

  updateDateTimeUse(serial_paste: string, id_employee_use: number): Promise<void>;

  findBySolderPasteControllUnFreezer(
    serial_paste: string
  ): Promise<SolderPasteControll | undefined>;

  findAllSolderPasteControllFreezerProviderOrderAsc(
    id_provider: number
  ): Promise<SolderPasteControll[]>;

  validation_input_sn_cooler(
    id_provider: number
  ): Promise<SolderPasteControll[]>;

  findAllSolderPasteControllUnFreezerProviderOrderAsc(
    id_provider: number
  ): Promise<SolderPasteControll[]>;

  conf_day(id_provider: number): Promise<SolderPasteControll[]>;

  provider_name_sn(
    serial_paste: string
  ): Promise<SolderPasteControll | undefined>;

  findBySerialUnFreezer(
    serial_paste: string
  ): Promise<SolderPasteControll | undefined>;

  findBySerialMixer(serial_paste: string): Promise<SolderPasteControll | undefined>;

  register_quantity_mixer(serial_paste: string,quantity_mixer: number): Promise<void>;


}

import ICreateSolderPasteMixerDTO, {
  SolderPasteMixerPagination ,
} from '../dtos/ICreateSolderPasteMixerDTO';
import SolderPasteMixer from '../infra/typeorm/entities/SolderPasteMixer';

export default interface ISolderPasteMixerRepository {
  findById(id: number): Promise<SolderPasteMixer | undefined>;
  findBySolderPasteMixerNameSearch(
    description_SolderPasteMixer: string,
    page:number,
  ): Promise<(SolderPasteMixerPagination | undefined)[] | undefined>;
  findAllSolderPasteMixer(page: number): Promise<SolderPasteMixerPagination | SolderPasteMixer[]>;
  create(data: ICreateSolderPasteMixerDTO): Promise<SolderPasteMixer>;
  update(
    id:number,
    id_employee_exit:number
): Promise<void>;
  delete(id: number): Promise<void>;

  findBySerial(serial_paste: string): Promise<SolderPasteMixer | undefined>;

  validationTimeMixer(serial_paste: string): Promise<SolderPasteMixer | undefined>;

  findBySerialInMixer(serial_paste: string): Promise<SolderPasteMixer | undefined>;

}

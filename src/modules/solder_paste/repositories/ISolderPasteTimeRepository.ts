import ICreateSolderPasteTimeDTO, {
  SolderPasteTimePagination ,
} from '../dtos/ICreateSolderPasteTimeDTO';
import ConfigureSoldePasteTime from '../infra/typeorm/entities/ConfigureSoldePasteTime';

export default interface ISolderPasteTimeRepository {
  findById(id: number): Promise<ConfigureSoldePasteTime | undefined>;
  findByTypePasteName(type_paste: string): Promise<SolderPasteTimePagination | undefined>;
  findByTypeProviderName(id_provider: number): Promise<SolderPasteTimePagination | undefined>;
  findAllSolderPasteTime(): Promise<SolderPasteTimePagination | ConfigureSoldePasteTime[]>;
  create(data: ICreateSolderPasteTimeDTO): Promise<ConfigureSoldePasteTime>;
  delete(id: number): Promise<void>;

}

import ICreateSolderPasteDTO, {
    SolderPastePagination ,
} from '../dtos/ICreateSolderPasteDTO';
import SolderPaste from '../infra/typeorm/entities/SolderPaste';

export default interface ISolderPasteRepository {

  listSerialQuantitySupplierTypePaste(id_provider: number, type_paste: string): Promise<SolderPaste | undefined>;
  create(data: ICreateSolderPasteDTO): Promise<SolderPaste>;

  conf_day(id_provider: number): Promise<SolderPaste [] | undefined>;

}

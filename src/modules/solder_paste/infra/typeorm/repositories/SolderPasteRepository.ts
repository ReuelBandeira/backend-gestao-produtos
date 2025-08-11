import ICreateSolderPasteDTO, {
  SolderPastePagination,
} from '@modules/solder_paste/dtos/ICreateSolderPasteDTO';
import ISolderPasteRepository from '@modules/solder_paste/repositories/ISolderPasteRepository';
import { getRepository, Like, Repository } from 'typeorm';
import ConfigureSoldePasteTime from '../entities/ConfigureSoldePasteTime';

import SolderPaste from '../entities/SolderPaste';
import SolderPasteControll from '../entities/SolderPasteControll';

const TOTAL_PER_PAGE = 11;

export default class SolderPasteRepository implements ISolderPasteRepository {
  private ormRepository: Repository<SolderPaste>;

  private ormConfRepository: Repository<ConfigureSoldePasteTime>;

  constructor() {
    this.ormRepository = getRepository(SolderPaste);

    this.ormConfRepository = getRepository(ConfigureSoldePasteTime);

  }

  public async listSerialQuantitySupplierTypePaste  (id_provider: number, type_paste: string): Promise<SolderPaste | undefined> {
    const solderPaste = await this.ormRepository.query('SELECT sum(quantity) as sequential, id_provider, type_paste FROM solder_paste where id_provider= "'+ id_provider+ '" and type_paste = "'+ type_paste+ '" group by id_provider, type_paste');

    return solderPaste;
  }

  public async create({
    id_provider,
    id_employee,
    quantity,
    type_paste,

  }: ICreateSolderPasteDTO): Promise<SolderPaste> {
    const solderPaste = this.ormRepository.create({
      id_provider,
      id_employee,
      quantity,
      type_paste,
    });

    await this.ormRepository.save(solderPaste);

    return solderPaste;
  }

  async conf_day(
    id_provider: number
  ): Promise<SolderPasteControll [] > {

    const findSolder = await this.ormConfRepository
      .createQueryBuilder('solder_paste_type_time')
      .select([
        'thaw_time',
      ])
      .where ({id_provider})
      .getRawMany();

    return findSolder;
  }





}

import ICreateScrapDTO from '../dtos/ICreateScrapDTO';
import IFilterScrapDTO from '../dtos/IFilterScrapDTO';
import IPaginateScrapDTO from '../dtos/IPaginateScrapDTO';
import Scrap from '../infra/typeorm/entities/Scrap';

export default interface IScrapRepository {
  findBySerial(serial_number: string): Promise<Scrap | undefined>;
  findByComponentAndListCode(
    component: string,
    list_code: string
  ): Promise<Scrap | undefined>;
  findById(id: number): Promise<Scrap | undefined>;
  findAllScrapsLimited(): Promise<Scrap[]>;
  create(data: ICreateScrapDTO): Promise<Scrap>;
  update(data: Scrap): Promise<Scrap>;
  findAllScraps(data: Omit<IFilterScrapDTO, 'page'>): Promise<Scrap[]>;
  findAllScrapsPaginate(data: IFilterScrapDTO): Promise<IPaginateScrapDTO>;

  findByListCode(list_code: string): Promise<Scrap[]>;
  findByDate(date: Date): Promise<Scrap[]>;
}

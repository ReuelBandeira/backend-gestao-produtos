import ICreateOriginDTO from '../dtos/ICreateOriginDTO';
import IPaginateOriginDTO from '../dtos/IPaginateOriginDTO';
import Origin from '../infra/typeorm/entities/Origin';

export default interface IOriginRepository {
  findById(id: number): Promise<Origin | undefined>;
  findBySearch(code: string): Promise<Origin[]>;
  findByCode(code: string): Promise<Origin | undefined>;
  findAllOrigins(page: number): Promise<IPaginateOriginDTO>;
  findAllOriginsNotPaginate(type:string): Promise<Origin[]>;

  create(data: ICreateOriginDTO): Promise<Origin>;
  update(origin: Origin): Promise<Origin>;
  delete(id: number): Promise<void>;
}

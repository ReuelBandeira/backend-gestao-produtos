import { ICreateShiftDTO } from '../dtos/ICreateShiftDTO';
import IPaginateShiftDTO from '../dtos/IPaginateShiftDTO';
import Shift from '../infra/typeorm/entities/Shift';

export default interface IShiftRepository {
  findById(id: number): Promise<Shift | undefined>;
  findBySearch(name: string): Promise<Shift | undefined>;
  findAllShiftsPaginate(page: number): Promise<IPaginateShiftDTO>;
  findAllShifts(): Promise<Shift[]>;
  update(data: Shift): Promise<Shift | undefined>;
  create(data: ICreateShiftDTO): Promise<Shift>;
}

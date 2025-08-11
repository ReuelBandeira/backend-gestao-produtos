import IFilterRepairDTO from '../dtos/IFilterRepairDTO';
import IPaginateRepairDTO from '../dtos/IPaginateRepairDTO';
import Repair from '../infra/typeorm/entities/Repair';

export default interface IRepairRepository {
  findById(id: number): Promise<Repair | undefined>;
  findBySearch(serial_number: string): Promise<Repair[] | undefined>;
  findOne(serial_number: number): Promise<Repair | undefined>;
  findAllRepairs(page: number): Promise<IPaginateRepairDTO>;
  checkIfExist(
    id_tracking: number,
    id_defect: number
  ): Promise<Repair | undefined>;
  update(repair: Repair): Promise<Repair | undefined>;
  findAllRepairsByFilter(data: IFilterRepairDTO): Promise<Repair[]>;
  findRegisters(id_tracking: number): Promise<Repair[] | undefined>;
}

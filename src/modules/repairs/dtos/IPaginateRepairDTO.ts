import Repair from '../infra/typeorm/entities/Repair';

export default interface IPaginateRepairDTO {
  repairs: Repair[];
  totalPages: number;
  totalRepairs: number;
}

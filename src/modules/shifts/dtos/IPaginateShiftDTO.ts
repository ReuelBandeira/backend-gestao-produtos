import Shift from '../infra/typeorm/entities/Shift';

export default interface IPaginateShiftDTO {
  shifts: Shift[];
  totalPages: number;
  totalShifts: number;
}

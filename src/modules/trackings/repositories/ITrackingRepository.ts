import { TrackingRoot } from '../dtos/ICreateTrackingDTO';
import Tracking from '../infra/typeorm/entities/Tracking';

export default interface ITrackingRepository {
  checkIfExists(serial_number: string): Promise<Tracking | undefined>;
  findTrackinsByOP(mo_number: string): Promise<Tracking[]>;
  findById(id: number): Promise<Tracking | undefined>;
  update(data: Tracking): Promise<Tracking>;
  findByHourByHour(id_line: number, startDate: string, endDate: string): Promise<TrackingRoot[]>
}

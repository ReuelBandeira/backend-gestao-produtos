import IDowntimeCheckinControlDTO from "../dtos/IDowntimeCheckinControlDTO";
import DowtimeCheckinControl from "../infra/typeorm/entities/DowntimeCheckinControl";

export default interface IDowntimeCheckinControlRepository {
  create(checkinData: IDowntimeCheckinControlDTO): Promise<DowtimeCheckinControl>;
}

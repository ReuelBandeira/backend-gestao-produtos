import IDowntimeCheckinControlDTO from "@modules/downtime_management/dtos/IDowntimeCheckinControlDTO";
import IDowntimeCheckinControlRepository from "@modules/downtime_management/repositories/IDowntimeCheckinControlRepository";
import { getRepository, Repository } from "typeorm";
import DowntimeCheckinControl from "../entities/DowntimeCheckinControl";


const TOTAL_PER_PAGE = 11;

export default class DowntimeCheckinControlRepository implements IDowntimeCheckinControlRepository {
  private ormRepository: Repository<DowntimeCheckinControl>;

  constructor() {
    this.ormRepository = getRepository(DowntimeCheckinControl);
  }

  public async create(checkinData: IDowntimeCheckinControlDTO): Promise<DowntimeCheckinControl> {
    const checkin_control = this.ormRepository.create(checkinData);
    await this.ormRepository.save(checkin_control);

    return checkin_control;
  }

}





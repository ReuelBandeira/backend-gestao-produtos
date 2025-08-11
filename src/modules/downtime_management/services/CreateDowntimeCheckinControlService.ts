import { inject, injectable } from "tsyringe";
import DowntimeCheckinControl from "../infra/typeorm/entities/DowntimeCheckinControl";
import IDowntimeCheckinControlRepository from "../repositories/IDowntimeCheckinControlRepository";


interface IRequest {
  id: number;
  zone_type:string;
  id_employee:number;
  status:string;
  date_accompanying_checkin:string,
  type:string;
}

@injectable()
export default class CreateDowntimeCheckinService {
  constructor(
    @inject('DowntimeCheckinControlRepository')
    private downtimeCheckinControlRepository: IDowntimeCheckinControlRepository,
  ) { }

  async execute({
    id,
    zone_type,
    id_employee,
    status,
    date_accompanying_checkin,
    type,
  }: IRequest): Promise<DowntimeCheckinControl> {


    const checkin_control = await this.downtimeCheckinControlRepository.create({
      id_downtime:id,
      zone_type,
      id_employee_checkin:id_employee,
      status,
      date_accompanying_checkin,
      type
    });

    return checkin_control;
  }
}

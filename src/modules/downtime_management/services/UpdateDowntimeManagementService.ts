import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IDowntimeManagementRepository from '../repositories/IDowntimeManagementRepository';


interface IRequest {
  id: number;
  zone_type:string;
  id_employee:number;
  status:string;
  date_accompanying_checkin:Date,
  type:string;

}

@injectable()
export default class UpdateDowntimeManagementService {
  constructor(
    @inject('DowntimeManagementRepository')
    private downtimeManagementRepository: IDowntimeManagementRepository,
  ) {}

  async execute({
    id,
    zone_type,
    id_employee,
    status,
    date_accompanying_checkin,
    type

  }: IRequest): Promise<void> {


    const check_type_user = await this.downtimeManagementRepository.validationUserType(
      id_employee,
    );
    const validation_type = check_type_user.length;

    const check_type_user_leader = await this.downtimeManagementRepository.validationUserTypeLeader(
      id_employee,
    );
    const validation_type_user_leader = check_type_user_leader.length;

    const check_type_user_monitor = await this.downtimeManagementRepository.validationUserTypeMonitor(
      id_employee,
    );

    const validation_type_user_monitor = check_type_user_monitor.length;

     if (zone_type =="SMT" && type == "Equipamento" && validation_type == 0) {
      throw new AppError(`Esse usuário não tem permissão para essa execução, somente o Técnico SMT. Favor verificar!`);
    }

      await this.downtimeManagementRepository.updateCheckin(
        id,
        id_employee,
        status,
        date_accompanying_checkin
      );

  };

}

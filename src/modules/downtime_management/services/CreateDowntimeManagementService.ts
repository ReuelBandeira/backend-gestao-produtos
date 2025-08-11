import AppError from '@shared/errors/AppError';
import { zonedTimeToUtc } from 'date-fns-tz';
import { inject, injectable } from 'tsyringe';
import DowntimeManagement from '../infra/typeorm/entities/DowntimeManagement';
import IDowntimeManagementRepository from '../repositories/IDowntimeManagementRepository';

interface IRequest {
  id_department: number;
  id_type: number;
  reason: string;
  stop_start_date: Date;
  id_line: number;
  id_machine: number;
  equipment: string;
  id_cause:number;
  module:string;
  final_stop_date:Date;
  status:string;
  name_machine:string;
  id_employee:number;
  id_employee_checkin: number;
  date_accompanying_checkin: Date;
  serial_number: string;
  component: string;
  id_action: number;
  comment: string;
  zone_type:string;
  post: string;
}

@injectable()
export default class CreateDowntimeManagementService {
  constructor(
    @inject('DowntimeManagementRepository')
    private downtimeManagementRepository: IDowntimeManagementRepository,
  ) { }

  async execute({
    id_department,
    id_type,
    reason,
    stop_start_date,
    id_line,
    id_machine,
    equipment,
    id_cause,
    module,
    final_stop_date,
    status,
    name_machine,
    id_employee,
    id_employee_checkin,
    date_accompanying_checkin,
    serial_number,
    component,
    id_action,
    comment,
    zone_type,
    post
  }: IRequest): Promise<DowntimeManagement> {


    const downtime_management = await this.downtimeManagementRepository.create({
      id_department,
      id_type,
      reason,
      stop_start_date,
      id_line,
      id_machine,
      equipment,
      id_cause,
      module,
      final_stop_date,
      status,
      name_machine,
      id_employee,
      id_employee_checkin,
      date_accompanying_checkin,
      serial_number,
      component,
      id_action,
      comment,
      zone_type,
      post
    });

    return downtime_management;
  }
}

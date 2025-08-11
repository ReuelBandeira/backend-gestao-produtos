import AppError from '@shared/errors/AppError';
import { differenceInMinutes } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import ICreateMslMovementDTO from '../dtos/ICreateMslMovementDTO';
import MslMovement from '../infra/typeorm/entities/MslMovement';
import IMslMovementRepository from '../repositories/IMslMovementRepository';

interface IRequest {
  component: string;
  serial: string;
  start_date: Date;
  movement_type: string;
  total_time_open?: number;
  id_machine: number;
  id_employee: number;
}

@injectable()
export default class CreateCouseService {
  constructor(
    @inject('MslMovementRepository')
    private mslMovementRepository: IMslMovementRepository
  ) {}

  async execute({
    component,
    serial,
    start_date,
    movement_type,
    total_time_open,
    id_machine,
    id_employee
  }: IRequest): Promise<MslMovement> {

    const mslMovement = await this.mslMovementRepository.create({
      component,
      serial,
      start_date,
      movement_type,
      total_time_open,
      id_machine,
      id_employee
    });

    return mslMovement;
  }
}

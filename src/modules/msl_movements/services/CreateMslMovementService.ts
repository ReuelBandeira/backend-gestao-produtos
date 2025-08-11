import AppError from '@shared/errors/AppError';
import { differenceInMinutes } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import ICreateMslMovementDTO from '../dtos/ICreateMslMovementDTO';
import MslMovement from '../infra/typeorm/entities/MslMovement';
import IMslMovementRepository from '../repositories/IMslMovementRepository';

@injectable()
export default class CreateMslMovementService {
  constructor(
    @inject('MslMovementRepository')
    private mslMovementRepository: IMslMovementRepository
  ) {}

  async execute({
    component,
    id_employee,
    id_machine,
    movement_type,
    start_date,
  }: Omit<ICreateMslMovementDTO, 'serial'>): Promise<MslMovement> {
    const parts = component.split(';');

    if (parts.length !== 3) {
      throw new AppError('Componente não encontrado');
    }

    const lastComponent = await this.mslMovementRepository.findByComponentOpen(
      parts[0],
      parts[2]
    );

    if (movement_type === 'FECHADO') {
      if (!lastComponent) {
        throw new AppError('O componente não foi aberto');
      }

      if (lastComponent.movement_type !== 'ABERTO') {
        throw new AppError('O componente não foi aberto');
      }

      const mslMovement = await this.mslMovementRepository.create({
        component: parts[0],
        id_employee,
        id_machine,
        movement_type,
        start_date: lastComponent.start_date,
        total_time_open: differenceInMinutes(
          new Date(),
          lastComponent.start_date
        ),
        serial: parts[2],
      });

      return mslMovement;
    }

    if (lastComponent && lastComponent.movement_type === 'ABERTO') {
      throw new AppError('O componente já foi aberto');
    }

    const mslMovement = await this.mslMovementRepository.create({
      component: parts[0],
      id_employee,
      id_machine,
      movement_type,
      start_date,
      serial: parts[2],
    });

    return mslMovement;
  }
}

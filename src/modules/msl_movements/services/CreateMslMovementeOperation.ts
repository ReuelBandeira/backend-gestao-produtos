import IManagementMslRepository from '@modules/management_msl/repositories/IManagementMslRepository';
import IMslMachinesRepository from '@modules/msl_machines/repositories/IMslMachinesRepository';
import AppError from '@shared/errors/AppError';
import { differenceInMinutes } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import ICreateMslMovementDTO from '../dtos/ICreateMslMovementDTO';
import MslMovement from '../infra/typeorm/entities/MslMovement';
import IMslMovementRepository from '../repositories/IMslMovementRepository';

@injectable()
export default class CreateMslMovementOperationService {
  constructor(
    @inject('MslMovementRepository')
    private mslMovementRepository: IMslMovementRepository,

    @inject('ManagementMslRepository')
    private managementMslRepository: IManagementMslRepository,

    @inject('MslMachinesRepository')
    private mslMachinesRepository: IMslMachinesRepository
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
      throw new AppError('QRCode inválido');
    }

    movement_type = movement_type.toUpperCase();

    const lastComponent = await this.mslMovementRepository.findByComponentOpen(
      parts[0],
      parts[2]
    );

    const msl = await this.managementMslRepository.findByComponent(parts[0]);
    if (!msl) {
      throw new AppError('Componente não encontrado na gestão de Msl');
    }

    const machine = await this.mslMachinesRepository.findById(id_machine);
    if (!machine) {
      throw new AppError('Máquina não encontrada');
    }

    if (movement_type === 'SAÍDA' && !lastComponent) {
      throw new AppError('Componente não deu entrada');
    }

    if (
      lastComponent &&
      lastComponent.movement_type === 'SAÍDA' &&
      movement_type === 'SAÍDA'
    ) {
      throw new AppError('Componente já deu saída');
    }

    if (
      lastComponent &&
      movement_type === 'ENTRADA' &&
      lastComponent.movement_type === 'ENTRADA'
    ) {
      throw new AppError('Componente já deu entrada');
    }

    // if (lastComponent && movement_type === "SAÍDA" && lastComponent.id_machine !== id_machine) {
    //   throw new AppError(
    //     `A saída deste componente deve ser na máquina ${lastComponent.machine.machine}`
    //   );
    // }

    if (machine.type === 'BAKING') {
      if (movement_type === 'ENTRADA') {
        // apenas registra quando não tiver nada
        if (!lastComponent) {
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

        // Calcula o tempo quando tiver um ultimo registro
        if (
          lastComponent.movement_type === 'ABERTO' ||
          lastComponent.movement_type === 'SAÍDA' ||
          lastComponent.movement_type === 'PRODUÇÃO'
        ) {
          const mslMovement = await this.mslMovementRepository.create({
            component: parts[0],
            id_employee,
            id_machine,
            movement_type,
            start_date,
            total_time_open:
              differenceInMinutes(new Date(), lastComponent.start_date) +
              lastComponent.total_time_open,
            serial: parts[2],
          });

          return mslMovement;
        }
      }

      // if (!lastComponent) {
      //   throw new AppError('Componente não encontrado');
      // }

      // if (
      //   lastComponent.movement_type === 'SAÍDA' &&
      //   movement_type === 'SAÍDA'
      // ) {
      //   throw new AppError('Componente já deu saída');
      // }

      // if (lastComponent.id_machine !== id_machine) {
      //   throw new AppError(
      //     `A saída deste componente deve ser na máquina ${lastComponent.machine.machine}`
      //   );
      // }

      // if (lastComponent.movement_type !== 'ENTRADA') {
      //   throw new AppError('Impossível calcular o tempo de baking');
      // }

      const time = differenceInMinutes(new Date(), lastComponent.start_date);

      if (time >= msl.management.time_baking * 60) {
        const mslMovement = await this.mslMovementRepository.create({
          component: parts[0],
          id_employee,
          id_machine,
          movement_type,
          start_date,
          total_time_open: undefined,
          serial: parts[2],
        });

        return mslMovement;
      }

      const mslMovement = await this.mslMovementRepository.create({
        component: parts[0],
        id_employee,
        id_machine,
        movement_type,
        start_date,
        total_time_open: lastComponent.total_time_open,
        serial: parts[2],
      });

      return mslMovement;
    }

    if (movement_type === 'ENTRADA') {
      // if (lastComponent?.movement_type === 'ENTRADA') {
      //   throw new AppError('Componente já deu entrada');
      // }

      // apenas registra quando não tiver nada
      if (!lastComponent) {
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

      if (
        lastComponent.movement_type === 'ABERTO' ||
        lastComponent.movement_type === 'SAÍDA' ||
        lastComponent.movement_type === 'PRODUÇÃO'
      ) {
        const mslMovement = await this.mslMovementRepository.create({
          component: parts[0],
          id_employee,
          id_machine,
          movement_type,
          start_date,
          total_time_open:
            differenceInMinutes(new Date(), lastComponent.start_date) +
            lastComponent.total_time_open,
          serial: parts[2],
        });

        return mslMovement;
      }
    }

    if (!lastComponent) {
      throw new AppError('Componente não encontrado');
    }

    // if (movement_type === 'SAÍDA') {
    //   if (lastComponent?.movement_type === 'SAíDA') {
    //     throw new AppError('Componente já deu saída');
    //   }
    // }

    // if (lastComponent.id_machine !== id_machine) {
    //   throw new AppError(
    //     `A saída deste componente deve ser na máquina ${lastComponent.machine.machine}`
    //   );
    // }

    const mslMovement = await this.mslMovementRepository.create({
      component: parts[0],
      id_employee,
      id_machine,
      movement_type,
      start_date,
      total_time_open: lastComponent
        ? lastComponent.total_time_open
        : undefined,
      serial: parts[2],
    });

    return mslMovement;
  }
}

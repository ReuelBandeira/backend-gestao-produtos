import ICreateMslMovementDTO from '@modules/msl_movements/dtos/ICreateMslMovementDTO';
import CreateMslMovementOperationService from '@modules/msl_movements/services/CreateMslMovementeOperation';
import CreateMslMovementService from '@modules/msl_movements/services/CreateMslMovementService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import MslMovementRepository from '../../typeorm/repositories/MslMovementRepository';

export default class MslMovementController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { component, movement_type } = request.body as ICreateMslMovementDTO;
    const { id: id_employee } = request.user;

    const createMslMovementService = container.resolve(
      CreateMslMovementService
    );

    const mslMovement = await createMslMovementService.execute({
      id_employee,
      id_machine: 2, // Máquina IQC do banco
      component,
      movement_type,
      start_date: new Date(),
    });

    return response.status(201).json(mslMovement);
  }

  public async limit(request: Request, response: Response): Promise<Response> {
    const mslMovementRepository = new MslMovementRepository();

    const mslMovements = await mslMovementRepository.findLimit();

    return response.status(200).json(mslMovements);
  }

  public async createOperation(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { component, movement_type, id_machine } =
      request.body as ICreateMslMovementDTO;
    const { id: id_employee } = request.user;

    const createMslMovementOperationService = container.resolve(
      CreateMslMovementOperationService
    );

    const mslMovement = await createMslMovementOperationService.execute({
      id_employee,
      id_machine,
      component,
      movement_type,
      start_date: new Date(),
    });

    return response.status(201).json(mslMovement);
  }
}

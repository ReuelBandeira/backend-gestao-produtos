import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import WorkStation from '../infra/typeorm/entities/WorkStation';
import IWorkStationRepository from '../repositories/IWorkStationRepository';

interface IRequest {
  name: string;
  workgroup_id: number;
}

@injectable()
export default class CreateWorkStationService {
  constructor(
    @inject('WorkStationRepository')
    private workStationRepository: IWorkStationRepository,
  ) {}

  public async execute({ name, workgroup_id }: IRequest): Promise<WorkStation> {
    const workStationAlreadyExists = await this.workStationRepository.findByName(
      name,
    );

    if (workStationAlreadyExists) {
      throw new AppError('Esse grupo de trabalho já existe');
    }

    const workStation = await this.workStationRepository.create({
      name,
      workgroup_id,
    });

    return workStation;
  }
}

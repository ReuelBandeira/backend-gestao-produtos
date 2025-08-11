import Management from '@modules/levels_management_msl/infra/typeorm/entities/Management';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IManagementRepository from '../repositories/IManagementRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteManagementService {
  constructor(
    @inject('ManagementRepository')
    private ManagementRepository: IManagementRepository,
  ) {}

  async execute({ id }: IRequest): Promise<Management> {


    const management = await this.ManagementRepository.findById(id);

    if (!management) {
      throw new AppError(`A gestão com o id: ${id} não existe.`);
    }

    await this.ManagementRepository.delete(id);

    return management;
  }
}


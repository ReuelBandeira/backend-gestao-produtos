import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IRouteBodyRepository from '../repositories/IRouteBodyRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteRouteBodyService {
  constructor(
    @inject('RouteBodyRepository')
    private routeBodyRepository: IRouteBodyRepository,
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const checkIfRouteHeadExist = await this.routeBodyRepository.findById(id);

    if (!checkIfRouteHeadExist) {
      throw new AppError(`Este grupo não existe`);
    }

    await this.routeBodyRepository.delete(id);
  }
}

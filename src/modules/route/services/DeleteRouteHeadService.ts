import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IRouteHeadRepository from '../repositories/IRouteHeadRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteRouteHeadService {
  constructor(
    @inject('RouteHeadRepository')
    private routeHeadRepository: IRouteHeadRepository,
  ) {}

  async execute({ id }: IRequest): Promise<void> {
    const checkIfRouteHeadExist = await this.routeHeadRepository.findById(id);

    if (!checkIfRouteHeadExist) {
      throw new AppError(`O cabeçalho dessa rota não existe`);
    }

    await this.routeHeadRepository.delete(id);
  }
}

import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import RouteHead from '../infra/typeorm/entities/RouteHead';
import IRouteHeadRepository from '../repositories/IRouteHeadRepository';

interface IRequest {
  id: number;
  name: string;
  description: string;
  type: string;
}

@injectable()
export default class UpdateRouteHeadService {
  constructor(
    @inject('RouteHeadRepository')
    private routeHeadRepository: IRouteHeadRepository,
  ) {}

  async execute({ id, name, description, type }: IRequest): Promise<RouteHead> {
    const routeHeadUpdate = await this.routeHeadRepository.findById(id);

    if (!routeHeadUpdate) {
      throw new AppError(`Essa linha: ${name} não existe.`);
    }

    Object.assign(routeHeadUpdate, {
      name,
      description,
      type,
    });

    const updateLine = await this.routeHeadRepository.update(routeHeadUpdate);

    return updateLine;
  }
}

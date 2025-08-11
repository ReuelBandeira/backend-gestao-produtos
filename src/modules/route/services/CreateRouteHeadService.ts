import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import RouteHead from '../infra/typeorm/entities/RouteHead';
import IRouteHeadRepository from '../repositories/IRouteHeadRepository';

interface IRequest {
  name: string;
  description: string;
  type: string;
}

@injectable()
export default class CreateRouteHeadService {
  constructor(
    @inject('RouteHeadRepository')
    private routeHeadRepository: IRouteHeadRepository,
  ) {}

  async execute({ name, description, type }: IRequest): Promise<RouteHead> {
    const checkIfRouteHeadNameExist = await this.routeHeadRepository.findByRouteHeadName(
      name,
    );

    if (checkIfRouteHeadNameExist) {
      throw new AppError(`Essa rota: ${name} já existe`);
    }

    const routeHead = await this.routeHeadRepository.create({
      name,
      description,
      type,
    });

    return routeHead;
  }
}

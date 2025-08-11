/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import RouteBody from '../infra/typeorm/entities/RouteBody';
import IRouteBodyRepository from '../repositories/IRouteBodyRepository';
import IRouteHeadRepository from '../repositories/IRouteHeadRepository';
import ICreateRouteBodyDTO from '../dtos/ICreateRouteBodyDTO';

interface IRequest {
  route_head_id: number;
  workgroup_id: number;
  next_workgroup_id?: number;
  isObligatory: boolean;
  hasRework: boolean;
  order: number;
}

@injectable()
export default class CreateRouteBodyService {
  constructor(
    @inject('RouteBodyRepository')
    private routeBodyRepository: IRouteBodyRepository,
    @inject('RouteHeadRepository')
    private routeHeadRepository: IRouteHeadRepository,
  ) {}

  async execute({
    route_head_id,
    workgroup_id,
    next_workgroup_id,
    isObligatory,
    hasRework,
    order,
  }: IRequest): Promise<RouteBody[]> {
    const routeHeadExists = await this.routeHeadRepository.findById(
      route_head_id,
    );


    if (!routeHeadExists) {
      throw new AppError(
        `O corpo da rota com id: ${route_head_id} não existe para o cabeçalho.`,
      );
    }

    const routesBodyToSave: ICreateRouteBodyDTO[] = [];

    const routeCreated = {
      route_head_id,
      next_workgroup_id,
      workgroup_id,
      hasRework,
      isObligatory,
      order,
    };

    routesBodyToSave.push(routeCreated);

    const routesBody = await this.routeBodyRepository.create(routesBodyToSave);

    return routesBody;
  }
}

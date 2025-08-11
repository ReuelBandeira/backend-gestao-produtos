import { getRepository, Repository } from 'typeorm';
import IRouteBodyRepository from '@modules/route/repositories/IRouteBodyRepository';
import ICreateRouteBodyDTO from '@modules/route/dtos/ICreateRouteBodyDTO';
import RouteBody from '../entities/RouteBody';

export default class RouteBodyRepository implements IRouteBodyRepository {
  private ormRepository: Repository<RouteBody>;

  constructor() {
    this.ormRepository = getRepository(RouteBody);
  }

  public async findById(id: number): Promise<RouteBody | undefined> {
    const routeBody = await this.ormRepository.findOne({
      where: { id },
      //relations: ['workgroups'],
      relations: ['workgroup'],
    });
    return routeBody;
  }

  public async findAllRouteBodys(route_head_id: number): Promise<RouteBody[]> {
    const routes = await this.ormRepository.find({
      relations: ['workgroup'],
      where: { route_head_id },
      order: { order: 'ASC' }

    });

    return routes;
  }

  public async create(data: ICreateRouteBodyDTO[]): Promise<RouteBody[]> {
    const routeBody = await this.ormRepository.create(data);

    await this.ormRepository.save(routeBody);

    return routeBody;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete(id);
  }
}

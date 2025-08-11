import ICreateRouteBodyDTO from '@modules/route/dtos/ICreateRouteBodyDTO';
import RouteBody from '@modules/route/infra/typeorm/entities/RouteBody';
import IRouteBodyRepository from '../IRouteBodyRepository';

export default class FakeRouteBodyRepository implements IRouteBodyRepository {
  private routesBody: RouteBody[] = [];

  public async findById(id: number): Promise<RouteBody | undefined> {
    const findRouteBody = await this.routesBody.find(
      (routeBody) => routeBody.id === id,
    );

    return findRouteBody;
  }

  public async findAllRouteBodys(): Promise<RouteBody[]> {
    return this.routesBody;
  }

  public async create({
    route_head_id,
    workgroup_id,
    next_workgroup_id,
    isObligatory,
    hasRework,
  }: ICreateRouteBodyDTO): Promise<RouteBody> {
    const routeBody = new RouteBody();

    Object.assign(routeBody, {
      id: Math.round(Math.random() * 10),
      route_head_id,
      workgroup_id,
      next_workgroup_id,
      isObligatory,
      hasRework,
    });
    this.routesBody.push(routeBody);

    return routeBody;
  }

  public async update(routeBody: RouteBody): Promise<RouteBody> {
    const findByIndex = await this.routesBody.findIndex(
      (findRouteBody) => findRouteBody.id === routeBody.id,
    );

    this.routesBody[findByIndex] = routeBody;

    return routeBody;
  }

  public async delete(id: number): Promise<void> {
    const findByIndex = await this.routesBody.findIndex(
      (findRouteBody) => findRouteBody.id === id,
    );

    this.routesBody.splice(findByIndex, 1);
  }
}

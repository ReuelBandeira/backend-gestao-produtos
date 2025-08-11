import ICreateRouteHeadDTO from '@modules/route/dtos/ICreateRouteHeadDTO';
import RouteHead from '@modules/route/infra/typeorm/entities/RouteHead';
import AppError from '@shared/errors/AppError';
import IRouteHeadRepository, {
  RouteHeadPagination,
} from '../IRouteHeadRepository';

export default class FakeRouteHeadRepository implements IRouteHeadRepository {
  private routesHead: RouteHead[] = [];

  public async findById(id: number): Promise<RouteHead | undefined> {
    const findRouteHead = await this.routesHead.find(
      (routeHead) => routeHead.id === id,
    );

    return findRouteHead;
  }

  public async findByRouteHeadName(
    name: string,
  ): Promise<RouteHead | undefined> {
    const findRouteHead = this.routesHead.find(
      (routeHead) => routeHead.name === name,
    );

    return findRouteHead;
  }

  public async findByRouteHeadNameSearch(
    routeHead_name: string,
  ): Promise<RouteHead[]> {
    throw new AppError('Method not implemented.');
  }

  public async findAllRouteHeads(page: number): Promise<RouteHeadPagination> {
    return {
      routeHeads: this.routesHead,
      totalRouteHeads: 1,
      totalPages: 1,
    };
  }

  public async create({
    name,
    description,
    type,
  }: ICreateRouteHeadDTO): Promise<RouteHead> {
    const routeHead = new RouteHead();

    Object.assign(routeHead, {
      id: Math.round(Math.random() * 10),
      name,
      description,
      type,
    });
    this.routesHead.push(routeHead);

    return routeHead;
  }

  public async update(routeHead: RouteHead): Promise<RouteHead> {
    const findByIndex = await this.routesHead.findIndex(
      (findRouteHead) => findRouteHead.id === routeHead.id,
    );

    this.routesHead[findByIndex] = routeHead;

    return routeHead;
  }

  public async delete(id: number): Promise<void> {
    const findByIndex = await this.routesHead.findIndex(
      (findRouteHead) => findRouteHead.id === id,
    );

    this.routesHead.splice(findByIndex, 1);
  }
}

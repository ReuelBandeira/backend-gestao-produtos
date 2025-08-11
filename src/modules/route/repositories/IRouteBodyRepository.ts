import ICreateRouteBodyDTO from '../dtos/ICreateRouteBodyDTO';
import RouteBody from '../infra/typeorm/entities/RouteBody';

export default interface IRouteBodyRepository {
  findById(id: number): Promise<RouteBody | undefined>;
  findAllRouteBodys(route_head_id: number): Promise<RouteBody[]>;
  create(data: ICreateRouteBodyDTO[]): Promise<RouteBody[]>;
  delete(id: number): Promise<void>;
}

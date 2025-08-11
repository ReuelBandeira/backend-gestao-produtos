import ICreateRouteHeadDTO from '../dtos/ICreateRouteHeadDTO';
import RouteHead from '../infra/typeorm/entities/RouteHead';

export interface RouteHeadPagination {
  routeHeads: RouteHead[];
  totalRouteHeads: number;
  totalPages: number;
}

export default interface IRouteHeadRepository {
  findById(id: number): Promise<RouteHead | undefined>;
  findByRouteHeadName(routeHead_name: string): Promise<RouteHead | undefined>;
  findByRouteHeadNameSearch(routeHead_name: string): Promise<RouteHead[]>;
  findAllRouteHeads(page: number): Promise<RouteHeadPagination>;
  findAllRoute(): Promise<RouteHead[]>;
  create(data: ICreateRouteHeadDTO): Promise<RouteHead>;
  update(routeHead: RouteHead): Promise<RouteHead>;
  delete(id: number): Promise<void>;
}

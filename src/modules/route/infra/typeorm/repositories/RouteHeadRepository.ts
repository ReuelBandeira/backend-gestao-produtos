import ICreateRouteHeadDTO from '@modules/route/dtos/ICreateRouteHeadDTO';
import IRouteHeadRepository, {
  RouteHeadPagination,
} from '@modules/route/repositories/IRouteHeadRepository';
import { getRepository, Like, Repository } from 'typeorm';
import RouteHead from '../entities/RouteHead';

const TOTAL_PER_PAGE = 10;

export default class RouteHeadRepository implements IRouteHeadRepository {
  private ormRepository: Repository<RouteHead>;

  constructor() {
    this.ormRepository = getRepository(RouteHead);
  }

  public async findById(id: number): Promise<RouteHead | undefined> {
    const routeHead = await this.ormRepository.findOne(id);
    return routeHead;
  }

  public async findByRouteHeadName(
    routeHead_name: string
  ): Promise<RouteHead | undefined> {
    const routeHead = await this.ormRepository.findOne({
      where: { name: routeHead_name },
    });
    return routeHead;
  }

  public async findByRouteHeadNameSearch(
    routeHead_name: string
  ): Promise<RouteHead[]> {
    const routeHeads = await this.ormRepository.find({
      where: { name: Like(`%${routeHead_name}%`) },
      relations: ['routes'],
      take: TOTAL_PER_PAGE,
    });
    return routeHeads;
  }

  public async findAllRouteHeads(page: number): Promise<RouteHeadPagination> {
    const routeHeads = await this.ormRepository.find({
      order: { id: 'DESC' },
      relations: ['routes', 'routes.workgroup', 'routes.workgroupNext'],
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });
    const totalRouteHeads = (await this.ormRepository.find()).length;
    return {
      routeHeads,
      totalRouteHeads,
      totalPages: totalRouteHeads / TOTAL_PER_PAGE,
    };
  }

  public async findAllRoute(): Promise<RouteHead[]> {
    const routeHeads = await this.ormRepository.find({
      relations: ['routes'],
    });
    return routeHeads;
  }

  public async create({
    description,
    name,
    type,
  }: ICreateRouteHeadDTO): Promise<RouteHead> {
    const routeHead = this.ormRepository.create({
      description,
      name,
      type,
    });

    await this.ormRepository.save(routeHead);

    return routeHead;
  }

  public async update(routeHead: RouteHead): Promise<RouteHead> {
    const update = await this.ormRepository.save(routeHead);

    return update;
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete(id);
  }
}

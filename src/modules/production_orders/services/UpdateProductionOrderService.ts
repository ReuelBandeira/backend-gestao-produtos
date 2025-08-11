import IEmployeeRepository from '@modules/employee/repositories/IEmployeeRepository';
import ILineRepository from '@modules/lines/repositories/ILineRepository';
import IRouteHeadRepository from '@modules/route/repositories/IRouteHeadRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ProductionOrder } from '../infra/typeorm/entities/ProductionOrders';
import IProductionOrdersRepository from '../repositories/IProductionOrdersRepository';

interface IRequest {
  id: number;
  id_route_code?: number;
  id_employee: number;
  mo_code: string;
  type:string;
}

@injectable()
export default class UpdateProductionOrderService {
  constructor(
    @inject('ProductionOrdersRepository')
    private productionOrder: IProductionOrdersRepository,
    @inject('RouteHeadRepository')
    private routeHeadRepository: IRouteHeadRepository,
    @inject('EmployeeRepository')
    private employeeRepository: IEmployeeRepository
  ) {}

  async execute({
    id,
    id_route_code,
    id_employee,
    mo_code,
    type
  }: IRequest): Promise<ProductionOrder> {
    const productionOrderUpdate = await this.productionOrder.findById(id);

    const findEmployee = await this.employeeRepository.findById(id_employee);

    if (!productionOrderUpdate) {
      throw new AppError(`Essa Ordem de Produção ${mo_code} não existe.`, 404);
    }

    if (!findEmployee) {
      throw new AppError(`Esse funcionario ${id_employee} não existe`, 404);
    }

    Object.assign(productionOrderUpdate, {
      id_route_code,
      mo_status: 'input',
      id_employee: findEmployee.id,
      type
    });

    const productionOrder = await this.productionOrder.update(
      productionOrderUpdate
    );

    return {
      ...productionOrder,
      employee: { ...findEmployee },
    };
  }
}

import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICheckToolPrinterRepository from '@modules/check_tool_printer/repositories/ICheckToolPrinterRepository';
import CheckToolPrinter from '@modules/check_tool_printer/infra/typeorm/entities/CheckToolPrinter';
import { QueryResult } from 'typeorm';
import { ProductionOrder } from '../infra/typeorm/entities/ProductionOrders';
import IProductionOrdersRepository from '../repositories/IProductionOrdersRepository';

interface IRequest {
  id: number;
  mo_status: string;
}

@injectable()
export default class UpdateStatusProductionOrderService {
  constructor(
    @inject('ProductionOrdersRepository')
    private productionOrder: IProductionOrdersRepository,
    @inject('CheckToolPrinterRepository')
    private CheckToolPrinter: ICheckToolPrinterRepository,
  ) {}

  public async execute({ id, mo_status }: IRequest): Promise<ProductionOrder> {
    const po = await this.productionOrder.findById(id);
    if (!po) {
      throw new AppError(`A ordem de produção com o Id: ${id} não existe.`);
    }

    Object.assign(po, {
      mo_status,
    });

    await this.productionOrder.update(po);

    return po;
  }

  public async update(id: number): Promise<CheckToolPrinter | void >{
    let result;
    const po =  await this.CheckToolPrinter.findByProdutionOrderStatus(id);
    if(po){
      result = await this.CheckToolPrinter.updateStatusOP(id)
      return result;
    }

    return result

  }
}

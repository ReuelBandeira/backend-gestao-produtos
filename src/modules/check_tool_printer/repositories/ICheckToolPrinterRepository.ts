import CheckToolPrinter from '../infra/typeorm/entities/CheckToolPrinter';

export default interface ICheckToolPrinterRepository {
  findByLineAndProductionOrder(
    id_line: number,
    id_production_order: number
  ): Promise<CheckToolPrinter[]>;

  findByProductionOrder(
    id_production_order: number
  ): Promise<CheckToolPrinter[]>;

  updateStatusListcode(list_code: string): Promise<void>;
  updateStatusOP(  id_production_order: number): Promise<void>

  findByTooling(list_code: string): Promise<CheckToolPrinter[] | undefined>
  findByListCode(list_code: string): Promise<CheckToolPrinter | undefined>
  findByProdutionOrderStatus(id_production_order: number): Promise<CheckToolPrinter[] | undefined>
}

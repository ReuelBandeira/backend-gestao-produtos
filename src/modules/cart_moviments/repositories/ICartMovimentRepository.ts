import ICreateCartMovimentDto from "../dtos/ICreateCartMovimentDto";
import IPaginateCartDTO from "../dtos/IPaginateCartDTO";
import IUpdateCartMovimentDto from "../dtos/IUpdateCartMovimentDto";
import CartMoviment from "../infra/typeorm/entities/CartMoviment";

export interface ICartMovimentRepository {
  create(data: ICreateCartMovimentDto): Promise<void>
  findAllByCart(id_cart: number, isRemovalDate: boolean): Promise<CartMoviment[]>
  findAllByListCodeAndComponent(list_code: string, component: string): Promise<CartMoviment | undefined>
  updateComponentById(id: number): Promise<void>
  removalComponent(data: IUpdateCartMovimentDto): Promise<void>
  updateStatusByListCode(list_code: string): Promise<void>
  clearMoviments(id_cart: number): Promise<void>
  updateByIdForProduction(id_cart: number, status: string): Promise<void>
  checkIfExistPosition(id_cart: number, id_shelf: number, position: number): Promise<CartMoviment | undefined>
  findTotalCart(): Promise<CartMoviment[] | undefined>,
  findAllCart(page: number): Promise<IPaginateCartDTO>
}

import ICreateCartCriticalDto from "../dtos/ICreateCartCriticalDto";
import CartCritical from "../infra/typeorm/entities/CartCriticals";

export interface ICartCriticalRepository {
  create(data: ICreateCartCriticalDto): Promise<void>
  checkIfExist(component: string, id_cart: number, list_code: string): Promise<CartCritical | undefined>
  update(data: ICreateCartCriticalDto): Promise<void>
  updateUsed(data: { component: string, id_cart: number, list_code: string, component_quantity: number }): Promise<void>
  findAllCartCritial(): Promise<CartCritical[]>
  removalComponents(id_cart: number): Promise<void>
}

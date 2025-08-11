import ICreateCartDTO from '../dtos/ICreateCartDTO';
import Cart from '../infra/typeorm/entities/Cart';

export default interface IActionDowntimeRepository {
  findById(id: number): Promise<Cart | undefined>;
  findByNameSearch(
    descriptiom: string,
  ): Promise<(Cart | undefined)[] | undefined>;
  findByName(descriptiom: string): Promise<Cart | undefined>;
  findAllAction(): Promise<Cart | Cart[]>;

  create(data: ICreateCartDTO): Promise<Cart>;
  update(cart: Cart): Promise<Cart>;
  delete(id: number): Promise<void>;
  deleteValidation(id: number): Promise<Cart[] | undefined>;
  update_code_cart(cart: Cart): Promise<Cart>;

  preview_id(): Promise<Cart | undefined>;

  updateStatusCart(id_cart: number, status: string): Promise<void>
}

import ICreateCartMngShelfDTO from '../dtos/ICreateCartMngShelfDTO';
import Cart from '../infra/typeorm/entities/Cart';
import CartMngShelf from '../infra/typeorm/entities/CartManageShelf';

export default interface ICartMngShelfRepository {
  // findById(id: number): Promise<CartMngShelf | undefined>;
  // findByNameSearch(
  //   descriptiom: string,
  // ): Promise<(CartMngShelf | undefined)[] | undefined>;
  // findByName(descriptiom: string): Promise<CartMngShelf | undefined>;
  // findAllAction(): Promise<CartMngShelf | CartMngShelf[]>;
  findAllRegistersByCart(id_cart: number): Promise<CartMngShelf[]>
  create(cartMngData: ICreateCartMngShelfDTO): Promise<CartMngShelf>;
  preview_id_cart(id: number): Promise<Cart | undefined>;
  findByIdCartAndIdShelf(id_cart: number, id_shelf: number): Promise<CartMngShelf | undefined>
  // update(cart: CartMngShelf): Promise<CartMngShelf>;
  // delete(id: number): Promise<void>;
  // deleteValidation(id: number): Promise<CartMngShelf[]| undefined>;
  // update_code_cart(cart: CartMngShelf): Promise<CartMngShelf>;
}

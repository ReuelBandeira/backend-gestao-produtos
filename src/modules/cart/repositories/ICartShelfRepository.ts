// import ICreateCartDTO from '../dtos/ICreateCartMngShelfDTO';
import CartShelf from '../infra/typeorm/entities/CartShelf';

export default interface ICartShelfRepository {
  findById(id: number): Promise<CartShelf | undefined>;
  // findByNameSearch(
  //   descriptiom: string,
  // ): Promise<(CartShelf | undefined)[] | undefined>;
  // findByName(descriptiom: string): Promise<CartShelf | undefined>;
  // findAllAction(): Promise<CartShelf | CartShelf[]>;

  // // create(data: ICreateCartDTO): Promise<CartShelf>;
  // update(cart: CartShelf): Promise<CartShelf>;
  // delete(id: number): Promise<void>;
  // deleteValidation(id: number): Promise<CartShelf[]| undefined>;
  // update_code_cart(cart: CartShelf): Promise<CartShelf>;
}

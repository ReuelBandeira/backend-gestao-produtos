// import ICreateCartDTO from '@modules/cart/dtos/ICreateCartDTO';
import ICartShelfRepository from '@modules/cart/repositories/ICartShelfRepository';
import { getRepository, Repository } from 'typeorm';
import CartShelf from '../entities/CartShelf';

// const TOTAL_PER_PAGE = 11;

export default class CartShelfRepository implements ICartShelfRepository {
  private ormRepository: Repository<CartShelf>;



  constructor() {
    this.ormRepository = getRepository(CartShelf);
  }

  public async findById(id: number): Promise<CartShelf | undefined> {
    const shelf = await this.ormRepository.findOne({
      where: { id },
    });

    return shelf;
  }

  public async findAllRegisters(): Promise<CartShelf | CartShelf[]> {
    const shelf = await this.ormRepository.find({
      order: { id: 'ASC' },
    });
    return shelf;
  }

  // public async findByName(description: string): Promise<CartShelf | undefined> {
  //   const cart = await this.ormRepository.findOne({
  //     where: { description }
  //   });

  //   return cart;
  // }

  // public async findByNameSearch(
  //   code_cart: string,
  // ): Promise<(Cart | undefined)[] | undefined> {
  //   const cart = await this.ormRepository.find({
  //     where: { code_cart: Like(`%${code_cart}%`) },
  //   });

  //   return cart;
  // }

  // public async create(cartData: ICreateCartDTO): Promise<CartShelf> {
  //   const cart = this.ormRepository.create(cartData);
  //   await this.ormRepository.save(cart);

  //   return cart;
  // }

  // public async update(cartData: Cart): Promise<CartShelf> {
  //   const cart = await this.ormRepository.save(cartData);
  //   return cart;
  // }

  // public async findAllCart(page=1,): Promise<CartShelf | CartShelf[]> {
  //   const cart = await this.ormRepository.find({
  //     order: { id: 'DESC' },
  //     skip: (page - 1) * TOTAL_PER_PAGE,
  //     take: TOTAL_PER_PAGE,
  //   });

  //   const totalCart = (await this.ormRepository.find()).length;

  //   return {
  //     cart,
  //     totalPages:totalCart/ TOTAL_PER_PAGE,
  //     totalCart,

  //   };
  // }

  // public async delete(id: number): Promise<void> {
  //   await this.ormRepository.softDelete({ id });
  // }


  // public async deleteValidation(
  //   id_cart: number,
  // ): Promise<DowntimeManagement[] > {
  //   const validation = await this. ormDowntimeManagementRepository
  //     .createQueryBuilder('dowtime_management')
  //     .select([
  //       'id',
  //       'id_cart'
  //     ])
  //     .where({id_cart})
  //     .getRawMany();

  //   return validation;

  // }

  // public async update_code_cart(cartData: CartShelf): Promise<CartShelf> {
  //   const cart = await this.ormRepository.save(cartData);
  //   return cart;
  // }
}

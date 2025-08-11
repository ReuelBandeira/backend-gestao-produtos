import ICreateCartDTO from '@modules/cart/dtos/ICreateCartDTO';
import ICartRepository from '@modules/cart/repositories/ICartRepository';
import DowntimeManagement from '@modules/downtime_management/infra/typeorm/entities/DowntimeManagement';
import { getRepository, Like, Repository } from 'typeorm';
import Cart from '../entities/Cart';
import CartMngShelf from '../entities/CartManageShelf';

const TOTAL_PER_PAGE = 11;

export default class CartRepository implements ICartRepository {

  private ormRepository: Repository<Cart>;

  private ormDowntimeManagementRepository: Repository<DowntimeManagement>;

  private ormCartMngShelfRepository: Repository<CartMngShelf>;


  constructor() {
    this.ormRepository = getRepository(Cart);
    this.ormDowntimeManagementRepository = getRepository(DowntimeManagement);
  }

  public async updateStatusCart(id_cart: number, status: string): Promise<void> {
    await this.ormRepository.update({
      id: id_cart
    }, {
      status
    })
  }

  public async findById(id: number): Promise<Cart | undefined> {
    const cart = await this.ormRepository.findOne({
      where: { id },
    });

    return cart;
  }

  public async findByName(description: string): Promise<Cart | undefined> {
    const cart = await this.ormRepository.findOne({
      where: { description }
    });

    return cart;
  }

  public async preview_id(): Promise<Cart | undefined> {
    const cart = await this.ormRepository.findOne({
      order: { id: 'DESC' }, // Ordena por ID em ordem decrescente
      withDeleted: true
    });

    return cart;
  }

  public async findByNameSearch(
    status: string,
  ): Promise<(Cart | undefined)[] | undefined> {
    const cart = await this.ormRepository.find({
      where: { status: Like(`%${status}%`) },
    });

    return cart;
  }

  public async create(cartData: ICreateCartDTO): Promise<Cart> {
    const cart = this.ormRepository.create(cartData);
    await this.ormRepository.save(cart);

    return cart;
  }

  public async update(cartData: Cart): Promise<Cart> {
    const cart = await this.ormRepository.save(cartData);
    return cart;
  }

  public async findAllCart(page = 1,): Promise<Cart | Cart[]> {
    const cart = await this.ormRepository.find({
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalCart = (await this.ormRepository.find()).length;

    return {
      cart,
      totalPages: totalCart / TOTAL_PER_PAGE,
      totalCart,

    };
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async findAllRegisters(): Promise<Cart | Cart[]> {
    const cart = await this.ormRepository.find({
      order: { id: 'DESC' },
    });
    return cart;
  }

  public async findAllCar(): Promise<Cart | Cart[]> {
    const cart = await this.ormRepository.find();
    return cart;
  }


  public async deleteValidation(
    id_cart: number,
  ): Promise<DowntimeManagement[]> {
    const validation = await this.ormDowntimeManagementRepository
      .createQueryBuilder('dowtime_management')
      .select([
        'id',
        'id_cart'
      ])
      .where({ id_cart })
      .getRawMany();

    return validation;

  }

  public async update_code_cart(cartData: Cart): Promise<Cart> {
    const cart = await this.ormRepository.save(cartData);
    return cart;
  }

  async CartAndShelfRegisters(
    id_cart: number,
  ): Promise<CartMngShelf[]> {
    console.log("=================", id_cart)
    const cartMngJoin = await this.ormCartMngShelfRepository
      .createQueryBuilder('cart_manage_shelf')
      .select([
        'id_cart',
        'id_cart_shelf'
      ])
      .where({ id_cart })
      .getRawMany();

    return cartMngJoin;
  }

  // public async feedersRegistered(
  //   feeder_code: string,
  // ): Promise<Feeder[]> {
  //   const feeders = await this.ormCartMngShelfRepository
  //     .createQueryBuilder()
  //     .select([
  //       'id',
  //       'feeder_coe',
  //       'status',
  //       'used_qty'
  //     ])
  //     .where({feeder_code})
  //     .getRawMany();

  //   return feeders;
  // }


}

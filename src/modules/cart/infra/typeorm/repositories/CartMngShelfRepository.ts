import ICreateCartMngDTO from '@modules/cart/dtos/ICreateCartMngShelfDTO';
import ICartMngShelfRepository from '@modules/cart/repositories/ICartMngShelfRepository';
import { getRepository, Repository } from 'typeorm';
import CartMngShelf from '../entities/CartManageShelf';

const TOTAL_PER_PAGE = 11;

export default class CartMngShelfRepository implements ICartMngShelfRepository {
  private ormRepository: Repository<CartMngShelf>;


  constructor() {
    this.ormRepository = getRepository(CartMngShelf);
  }

  public async preview_id_cart(): Promise<CartMngShelf | undefined> {
    const cart = await this.ormRepository.findOne({
      order: { id: 'DESC' }, // Ordena por ID em ordem decrescente
    });

    return cart;
  }

  public async findAllRegisters(): Promise<CartMngShelf[]> {
    const shelf = await this.ormRepository.find({
      order: {
        id: 'ASC'
      }
    });
    return shelf;
  }

  public async findAllRegistersByCart(id_cart: number): Promise<CartMngShelf[]> {
    const shelf = await this.ormRepository.find({
      where: {
        id_cart
      }
    });
    return shelf;
  }

  public async findJoinRegisters(): Promise<CartMngShelf | CartMngShelf[]> {
    const shelf = await this.ormRepository.find({
      relations: ["cartCategory", "cartShelfCategory"]
    });
    return shelf;
  }

  public async findAllCartMng(page = 1,): Promise<CartMngShelf | CartMngShelf[]> {
    const cartMng = await this.ormRepository.find({
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalCart = (await this.ormRepository.find()).length;

    return {
      cartMng,
      totalPages: totalCart / TOTAL_PER_PAGE,
      totalCart,

    };
  }
  // public async findById(id: number): Promise<Cart | undefined> {
  //   const cart = await this.ormRepository.findOne({
  //     where: { id },
  //   });

  //   return cart;
  // }

  // public async findByName(description: string): Promise<Cart | undefined> {
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

  public async create(cartMngData: ICreateCartMngDTO): Promise<CartMngShelf> {
    const cartMng = this.ormRepository.create(cartMngData);
    await this.ormRepository.save(cartMng);

    return cartMng;
  }

  // public async update(cartData: Cart): Promise<Cart> {
  //   const cart = await this.ormRepository.save(cartData);
  //   return cart;
  // }

  // public async findAllCart(page=1,): Promise<Cart | Cart[]> {
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

  // public async findAllRegisters(): Promise<Cart | Cart[]> {
  //   const cart = await this.ormRepository.find({
  //     order: { id: 'DESC' },
  //   });
  //   return cart;
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

  // public async update_code_cart(cartData: Cart): Promise<Cart> {
  //   const cart = await this.ormRepository.save(cartData);
  //   return cart;
  // }

  public async testeteste(id_cart: number): Promise<CartMngShelf | CartMngShelf[]> {
    const shelf = await this.ormRepository.find({
      where: ({ id_cart }),
      relations: ["cartShelfCategory"]
    });
    return shelf;
  }

  async testeQuery(
    id_cart: number,
  ): Promise<CartMngShelf[] | undefined> {
    const cartMngJoin = await this.ormRepository

      .createQueryBuilder('cart_manage_shelf')
      .leftJoinAndSelect('cart_manage_shelf.cartShelfCategory', 'cartShelfCategory')
      .select([
        // 'id_cart',
        'id_cart_shelf',
        'cartShelfCategory.code_shelf as code_shelf',
        'qty_position',
      ])
      .where({ id_cart })
      .getRawMany();

    return cartMngJoin;
  }

  async findByIdCartAndIdShelf(id_cart: number, id_shelf: number): Promise<CartMngShelf | undefined> {
    return await this.ormRepository.findOne({
      where: {
        id_cart,
        id_cart_shelf: id_shelf
      }
    })
  }
}

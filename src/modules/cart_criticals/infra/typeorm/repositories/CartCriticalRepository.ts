import ICreateCartCriticalDto from '@modules/cart_criticals/dtos/ICreateCartCriticalDto';
import { ICartCriticalRepository } from '@modules/cart_criticals/repositories/ICartCriticalRepository';
import { getRepository, Repository } from 'typeorm';
import CartCritical from '../entities/CartCriticals';

export default class CartCriticalRepository implements ICartCriticalRepository {
  private ormRepository: Repository<CartCritical>;

  constructor() {
    this.ormRepository = getRepository(CartCritical);
  }

  async create(data: ICreateCartCriticalDto): Promise<void> {
    await this.ormRepository.save(data)
  }

  async checkIfExist(component: string, id_cart: number, list_code: string): Promise<CartCritical | undefined> {
    return await this.ormRepository.findOne({
      where: {
        component,
        id_cart,
        list_code
      }
    })
  }

  async update({ component, id_cart, component_quantity, list_code }: ICreateCartCriticalDto): Promise<void> {
    await this.ormRepository.update(
      {
        component,
        id_cart,
        list_code
      },
      {
        component_quantity
      }
    )
  }

  async updateUsed(data: { component: string; id_cart: number; list_code: string; component_quantity: number; }): Promise<void> {
    await this.ormRepository.update(
      {
        component: data.component,
        id_cart: data.id_cart,
        list_code: data.list_code
      },
      {
        used_quantity: data.component_quantity
      })
  }

  async findAllCartCritial(): Promise<CartCritical[]> {
    return await this.ormRepository.find({
      order: {
        created_at: 'DESC'
      }, relations: [
        'line',
      ]
    })
  }

  async removalComponents(id_cart: number): Promise<void> {
    await this.ormRepository.delete({
      id_cart
    })
  }
}

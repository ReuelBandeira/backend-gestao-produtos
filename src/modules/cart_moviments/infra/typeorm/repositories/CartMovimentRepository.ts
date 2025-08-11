import ICreateCartMovimentDto from '@modules/cart_moviments/dtos/ICreateCartMovimentDto';
import IFilterCarDTO from '@modules/cart_moviments/dtos/IFilterCarDTO';
import IPaginateCartDTO from '@modules/cart_moviments/dtos/IPaginateCartDTO';
import IUpdateCartMovimentDto from '@modules/cart_moviments/dtos/IUpdateCartMovimentDto';
import { ICartMovimentRepository } from '@modules/cart_moviments/repositories/ICartMovimentRepository';
import { getRepository, In, IsNull, Not, Repository } from 'typeorm';
import CartMoviment from '../entities/CartMoviment';

const TOTAL_PER_PAGE = 11;

export default class CartMovimentRepository implements ICartMovimentRepository {
  private ormRepository: Repository<CartMoviment>;


  constructor() {
    this.ormRepository = getRepository(CartMoviment);
  }

  async create(data: ICreateCartMovimentDto): Promise<void> {
    await this.ormRepository.save(data)
  }

  async findAllByCart(id_cart: number, isRemovalDate: boolean): Promise<CartMoviment[]> {
    return await this.ormRepository.find({
      where: {
        id_cart,
        removal_date: isRemovalDate ? IsNull() : Not(IsNull())
      }
    })
  }

  public async findTotalCart(): Promise<CartMoviment[] | undefined> {
    const statusValues = ["Carregando", "Em produção"];
    const total_car = await this.ormRepository.find({
      order: { id: 'DESC' },
      where: {
        removal_date: IsNull(),
        status_cart: In(statusValues)
      },
    });
    return total_car;
  }

  public async findAllCart(page = 1): Promise<IPaginateCartDTO> {
    const statusValues = ["Carregando", "Em produção"];
    const [cart, totalCartMoviment] = await this.ormRepository.findAndCount({
      where: {
        removal_date: IsNull(),
        status_cart: In(statusValues)
      },
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
      relations: [
        'cart',
        'cartShelf',
        'employeeEntrance',
      ],
    });

    return {
      cart,
      totalPages: totalCartMoviment / TOTAL_PER_PAGE,
      totalCartMoviment,
    };

  }

  public async filterAllCar({
    id_cart
  }: IFilterCarDTO): Promise<CartMoviment[]> {


    const statusValues = ["Carregando", "Em produção"];
    return await this.ormRepository.find({
      where: {
        id_cart,
        status_cart: In(statusValues)
      },
      relations: [
        'cart',
        'cartShelf',
        'employeeEntrance',
      ],
      order: {
        created_at: 'DESC',
      },
    });
  }

  async findAllByListCodeAndComponent(list_code: string, component: string): Promise<CartMoviment | undefined> {
    return await this.ormRepository.findOne({
      where: {
        list_code,
        component,
        removal_date: IsNull()
      }
    })
  }

  async updateComponentById(id: number): Promise<void> {
    await this.ormRepository.update(id, {
      status: 1
    })
  }

  async removalComponent(data: IUpdateCartMovimentDto): Promise<void> {
    await this.ormRepository.update({
      id_cart: data.id_cart,
      id_shelf: data.id_shelf,
      position: data.position,
      list_code: data.list_code
    }, {
      removal_date: data.removal_date,
      status: data.status,
      id_employee_removal: data.id_employee_removal
    })
  }

  async updateStatusByListCode(list_code: string): Promise<void> {
    await this.ormRepository.update({
      list_code
    }, {
      status: 0,
    })
  }

  async clearMoviments(id_cart: number): Promise<void> {
    await this.ormRepository.delete({
      id_cart,
      status_cart: "Carregando"
    })
  }

  async updateByIdForProduction(id_cart: number, status: string): Promise<void> {
    await this.ormRepository.update(
      {
        id_cart,
        removal_date: IsNull()
      },
      {
        status_cart: status
      }
    )
  }

  async checkIfExistPosition(id_cart: number, id_shelf: number, position: number): Promise<CartMoviment | undefined> {
    return await this.ormRepository.findOne({
      where: {
        id_cart,
        position,
        id_shelf,
        removal_date: IsNull()
      }
    })
  }
}

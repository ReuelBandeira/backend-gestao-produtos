/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Cart from '../infra/typeorm/entities/Cart';
import ICartRepository from '../repositories/ICartRepository';

interface IRequest {
  id: number;
  status: string;
}

@injectable()
export default class UpdateCartService {
  constructor(
    @inject('CartRepository')
    private cartRepository: ICartRepository,
  ) {}

  async execute({ id, status }: IRequest): Promise<Cart> {
    const cart = await this.cartRepository.findById(id);


    if (!cart) {
      throw new AppError(`Este carrinho com id: ${id} não existe`);
    }


    Object.assign(cart, {
      status,
    });

    await this.cartRepository.update(cart);

    return cart;
  }
}

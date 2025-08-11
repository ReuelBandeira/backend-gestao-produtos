/* eslint-disable no-param-reassign */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Cart from '../infra/typeorm/entities/Cart';
import ICartRepository from '../repositories/ICartRepository';

interface IRequest {
  id: number;
  code_cart: string;
}

@injectable()
export default class UpdateCodeCartService {
  constructor(
    @inject('CartRepository')
    private cartRepository: ICartRepository,
  ) {}

  async execute({ id, code_cart }: IRequest): Promise<Cart> {
    const cart = await this.cartRepository.findById(id);

    if (!cart) {
      throw new AppError(`Está ação: ${code_cart} não existe`);
    }

    Object.assign(cart, {
      code_cart,
    });

    await this.cartRepository.update_code_cart(cart);

    return cart;
  }
}

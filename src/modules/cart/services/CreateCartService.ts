/* eslint-disable no-else-return */
// import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Cart from '../infra/typeorm/entities/Cart';
import ICartRepository from '../repositories/ICartRepository';

interface IRequest {
  status: string;
  description: string;
}

@injectable()
export default class CreateCartService {
  constructor(
    @inject('CartRepository')
    private cartRepository: ICartRepository,
  ) {}

  async execute({ status, description }: IRequest): Promise<Cart> {
    const preview = await this.cartRepository.preview_id()

    const nextId = preview ? preview.id + 1 : 1
    const code_cart = String(`CA${nextId}`);
    const cart = await this.cartRepository.create({
      status,
      description,
      code_cart
    });


    return cart;

  }
}

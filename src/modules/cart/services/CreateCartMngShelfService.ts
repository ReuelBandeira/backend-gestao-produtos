// import AppError from '@shared/errors/AppError';

import { inject, injectable } from "tsyringe";
import CartMngShelf from '../infra/typeorm/entities/CartManageShelf';
import ICartMngShelfRepository from "../repositories/ICartMngShelfRepository";

interface IRequest {
  id_cart_shelf: number;
  qty_position: number;
  id_cart: number
}

@injectable()
export default class CreateCartMngShelfService {

  constructor(
    @inject('CartMngShelfRepository')
    private cartMngShelfRepository: ICartMngShelfRepository,
  ) {}

  async execute({ id_cart, id_cart_shelf, qty_position }: IRequest): Promise<CartMngShelf> {
    const shelf = await this.cartMngShelfRepository.create({
      id_cart,
      id_cart_shelf,
      qty_position,
    });


    return shelf;
  }
}

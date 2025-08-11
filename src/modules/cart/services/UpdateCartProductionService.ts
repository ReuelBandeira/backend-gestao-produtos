/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-param-reassign */
import { ICartMovimentRepository } from '@modules/cart_moviments/repositories/ICartMovimentRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICartRepository from '../repositories/ICartRepository';

@injectable()
export default class UpdateCartProductionService {
  constructor(
    // @ts-ignore
    @inject('CartRepository')
    private cartRepository: ICartRepository,

    // @ts-ignore
    @inject('CartMovimentRepository')
    private cartMovimentRepository: ICartMovimentRepository,

  ) {}

  async execute(id_cart: number, status: string): Promise<void> {
    const cart = await this.cartRepository.findById(id_cart);

    if (!cart) {
      throw new AppError('Carrinho não encontrado');
    }

    if (cart.status === "Disponível") {
      throw new AppError('Carrinho não alimentado');
    }

    if (cart.status === "Carregando" && status === "Carregando") {
      throw new AppError('Carrinho já está com status carregando');
    }

    if (cart.status === "Produção" && status !== "Carregando") {
      throw new AppError('Carrinho não está em produção');
    }

    await this.cartRepository.updateStatusCart(id_cart, status)
    await this.cartMovimentRepository.updateByIdForProduction(id_cart, status)
  }
}

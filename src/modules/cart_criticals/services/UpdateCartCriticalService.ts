/* eslint-disable @typescript-eslint/ban-ts-comment */

import ICartMngShelfRepository from '@modules/cart/repositories/ICartMngShelfRepository';
import ICartRepository from '@modules/cart/repositories/ICartRepository';
import { ICartCriticalRepository } from '@modules/cart_criticals/repositories/ICartCriticalRepository';
import { ICartMovimentRepository } from '@modules/cart_moviments/repositories/ICartMovimentRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class UpdateCartCriticalService {
  constructor(
    // @ts-ignore
    @inject('CartMovimentRepository')
    private cartMovimentRepository: ICartMovimentRepository,

    // @ts-ignore
    @inject('CartRepository')
    private cartRepository: ICartRepository,

    // @ts-ignore
    @inject('CartMngShelfRepository')
    private cartMngShelfRepository: ICartMngShelfRepository,

    // @ts-ignore
    @inject('CartCriticalRepository')
    private cartCriticalRepository: ICartCriticalRepository,
  ) {}

  async execute({
    id_cart,
    list_code,
    component,
    component_quantity
  }: { component: string, id_cart: number, list_code: string, component_quantity: number }): Promise<void> {

    const checkIfExist = await this.cartCriticalRepository.checkIfExist(component, id_cart, list_code)

    if (checkIfExist) {
      await this.cartCriticalRepository.updateUsed({
        component,
        component_quantity: checkIfExist.used_quantity + component_quantity,
        id_cart,
        list_code
      })
    }
  }
}

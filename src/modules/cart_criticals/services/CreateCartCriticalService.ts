/* eslint-disable @typescript-eslint/ban-ts-comment */

import ICartMngShelfRepository from '@modules/cart/repositories/ICartMngShelfRepository';
import ICartRepository from '@modules/cart/repositories/ICartRepository';
import { ICartCriticalRepository } from '@modules/cart_criticals/repositories/ICartCriticalRepository';
import { ICartMovimentRepository } from '@modules/cart_moviments/repositories/ICartMovimentRepository';
import { inject, injectable } from 'tsyringe';
import ICreateCartCriticalDto from '../dtos/ICreateCartCriticalDto';

@injectable()
export default class CreateCartCriticalService {
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
  }: ICreateCartCriticalDto): Promise<void> {

    const checkIfExist = await this.cartCriticalRepository.checkIfExist(component, id_cart, list_code)

    if (checkIfExist) {
      await this.cartCriticalRepository.update({
        component,
        component_quantity: checkIfExist.component_quantity + component_quantity,
        id_cart,
        list_code
      })

      return
    }

    await this.cartCriticalRepository.create({
      component,
      component_quantity,
      id_cart,
      list_code
    })
  }
}

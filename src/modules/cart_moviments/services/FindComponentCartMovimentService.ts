/* eslint-disable no-restricted-syntax */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import IBomRepository from '@modules/bom/repositories/ICreateBomRepository';
import ICartMngShelfRepository from '@modules/cart/repositories/ICartMngShelfRepository';
import ICartRepository from '@modules/cart/repositories/ICartRepository';
import CreateValidationStringComponentService from '@modules/material/services/CreateValidationStringComponentService';
import AppError from '@shared/errors/AppError';
import { container, inject, injectable } from 'tsyringe';
import { ICartMovimentRepository } from '../repositories/ICartMovimentRepository';


@injectable()
export default class FindComponentCartMovimentService {
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
    @inject('BomRepository')
    private bomRepository: IBomRepository,
  ) {}

  async execute(list_code: string, qrcode: string): Promise<void> {
    const serviceValidadeString = container.resolve(CreateValidationStringComponentService)

    const response = await serviceValidadeString.execute({
      list_code,
      component: qrcode
    })

    const component = response.componentFormatted

    const bom = await this.bomRepository.findByMainComponentOrAlternativeComponent(component)

    if (!bom) {
      throw new AppError('Componente não encontrado na BOM')
    }

    const allComponents = await this.bomRepository.findAllMainComponents(bom.main_component)

    const components: string[] = []

    allComponents.forEach(item => {
      const index = components.findIndex(el => el === item.main_component)

      if (index === -1) {
        components.push(item.main_component)
      }

      const indexA = components.findIndex(el => el === item.alternative_component)


      if (indexA === -1) {
        components.push(item.alternative_component)
      }
    })

    for await (const iterator of components) {
      const moviment = await this.cartMovimentRepository.findAllByListCodeAndComponent(list_code, iterator)

      if (moviment) {
        await this.cartMovimentRepository.updateComponentById(moviment.id)
      }
    }

  }
}

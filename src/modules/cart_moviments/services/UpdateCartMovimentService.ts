/* eslint-disable @typescript-eslint/ban-ts-comment */

import IBomRepository from '@modules/bom/repositories/ICreateBomRepository';
import ICartRepository from '@modules/cart/repositories/ICartRepository';
import { ICartCriticalRepository } from '@modules/cart_criticals/repositories/ICartCriticalRepository';
import UpdateCartCriticalService from '@modules/cart_criticals/services/UpdateCartCriticalService';
import CreateValidationStringComponentService from '@modules/material/services/CreateValidationStringComponentService';
import AppError from '@shared/errors/AppError';
import { container, inject, injectable } from 'tsyringe';
import IUpdateCartMovimentDto from '../dtos/IUpdateCartMovimentDto';
import { ICartMovimentRepository } from '../repositories/ICartMovimentRepository';

@injectable()
export default class UpdateCartMovimentService {
  constructor(
    // @ts-ignore
    @inject('CartMovimentRepository')
    private cartMovimentRepository: ICartMovimentRepository,

    // @ts-ignore
    @inject('CartRepository')
    private cartRepository: ICartRepository,

    // @ts-ignore
    @inject('CartCriticalRepository')
    private cartCriticalRepository: ICartCriticalRepository,

    // @ts-ignore
    @inject('BomRepository')
    private bomRepository: IBomRepository,
  ) {}

  async execute({
    qrcode,
    id_cart,
    id_shelf,
    id_employee_removal,
    position,
    list_code
  }: Omit<IUpdateCartMovimentDto, 'component' | 'component_quantity' | 'component_sequential' | 'removal_date' | 'status'>): Promise<void> {
    const serviceValidadeString = container.resolve(CreateValidationStringComponentService)

    const response = await serviceValidadeString.execute({
      list_code,
      component: qrcode
    })

    const component = response.componentFormatted
    const component_quantity = response.qty_component
    const component_sequential = response.sequential
    const removal_date = new Date()
    const status = 0 // Apagado

    const existPosition = await this.cartMovimentRepository.checkIfExistPosition(id_cart, id_shelf, position)

    if (existPosition && existPosition.status === 0) {
      throw new AppError('Componente não disponível para retirada')
    }

    if (existPosition && existPosition.component !== component) {
      throw new AppError('Componente diferente da posição')
    }

    await this.cartMovimentRepository.removalComponent({
      component,
      component_quantity,
      component_sequential,
      removal_date,
      id_cart,
      id_employee_removal,
      id_shelf,
      position,
      qrcode,
      status,
      list_code
    })

    const moviments = await this.cartMovimentRepository.findAllByCart(id_cart, true)

    if (moviments.length === 0) {
      await this.cartRepository.updateStatusCart(id_cart, "Disponível")
      // remover registros da tabela de components críticos
      await this.cartCriticalRepository.removalComponents(id_cart)
    }

    await this.cartMovimentRepository.updateStatusByListCode(list_code)

    const bom = await this.bomRepository.findByMainComponentOrAlternativeComponent(component)

    if (!bom) {
      throw new AppError('Componente não encontrado na BOM')
    }

    const updateCartCriticalService = container.resolve(UpdateCartCriticalService);

    await updateCartCriticalService.execute({
      component: bom.main_component,
      component_quantity,
      id_cart,
      list_code
    })
  }
}

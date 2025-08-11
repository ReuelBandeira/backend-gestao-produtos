/* eslint-disable @typescript-eslint/ban-ts-comment */

import IBomRepository from '@modules/bom/repositories/ICreateBomRepository';
import ICartMngShelfRepository from '@modules/cart/repositories/ICartMngShelfRepository';
import ICartRepository from '@modules/cart/repositories/ICartRepository';
import { ICartCriticalRepository } from '@modules/cart_criticals/repositories/ICartCriticalRepository';
import CreateCartCriticalService from '@modules/cart_criticals/services/CreateCartCriticalService';
import CreateValidationStringComponentService from '@modules/material/services/CreateValidationStringComponentService';
import AppError from '@shared/errors/AppError';
import { container, inject, injectable } from 'tsyringe';
import ICreateCartMovimentDto from '../dtos/ICreateCartMovimentDto';
import { ICartMovimentRepository } from '../repositories/ICartMovimentRepository';

@injectable()
export default class CreateCartMovimentService {
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

    // @ts-ignore
    @inject('BomRepository')
    private bomRepository: IBomRepository,
  ) {}

  async execute({
    qrcode,
    id_cart,
    id_shelf,
    id_employee_entrance,
    position,
    list_code
  }: Omit<ICreateCartMovimentDto, 'component' | 'component_quantity' | 'component_sequential' | 'entrance_date' | 'status' | 'status_cart'>): Promise<void> {
    const serviceValidadeString = container.resolve(CreateValidationStringComponentService)

    const response = await serviceValidadeString.execute({
      list_code,
      component: qrcode
    })

    const component = response.componentFormatted
    const component_quantity = response.qty_component
    const component_sequential = response.sequential
    const entrance_date = new Date()
    const status = 0 // Apagado
    const status_cart = "Carregando"

    const cartShelf = await this.cartMngShelfRepository.findByIdCartAndIdShelf(id_cart, id_shelf)

    if (cartShelf && position > cartShelf.qty_position) {
      throw new AppError('Essa posição não existe na prateleira especificada')
    }

    const existPosition = await this.cartMovimentRepository.checkIfExistPosition(id_cart, id_shelf, position)

    if (existPosition) {
      throw new AppError('Já existe um componente nesta posição')
    }

    const moviments = await this.cartMovimentRepository.findAllByCart(id_cart, true)

    if (moviments.length === 0) {
      await this.cartRepository.updateStatusCart(id_cart, "Carregando")
    }

    await this.cartMovimentRepository.create({
      component,
      component_quantity,
      component_sequential,
      entrance_date,
      id_cart,
      id_employee_entrance,
      id_shelf,
      position,
      qrcode,
      status,
      list_code,
      status_cart
    })

    const bom = await this.bomRepository.findByMainComponentOrAlternativeComponent(component)

    if (!bom) {
      throw new AppError('Componente não encontrado na BOM')
    }

    const createCartCriticalService = container.resolve(CreateCartCriticalService);

    await createCartCriticalService.execute({
      component: bom.main_component,
      component_quantity,
      id_cart,
      list_code
    })
  }
}

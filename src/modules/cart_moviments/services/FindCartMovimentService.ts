/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import ICartMngShelfRepository from '@modules/cart/repositories/ICartMngShelfRepository';
import ICartRepository from '@modules/cart/repositories/ICartRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICartMovimentRepository } from '../repositories/ICartMovimentRepository';

interface IArrayPossition {
  idCar: number
  statusCar: string
  shelfs: {
    idShelfs: number
    positions: {
      idPosition: number
      statusLed: number
    }[]
  }[]
}

@injectable()
export default class FindCartMovimentService {
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
  ) {}

  async execute(id_cart: number): Promise<IArrayPossition> {
    const cart = await this.cartRepository.findById(id_cart)

    if (!cart) {
      throw new AppError('Carrinho não encontrado')
    }

    const arrayStatusPositions: IArrayPossition = {
      idCar: id_cart,
      statusCar: cart.status,
      shelfs: []
    }

    const moviments = await this.cartMovimentRepository.findAllByCart(id_cart, true)

    if (cart.status === 'Disponível' || cart.status === 'Carregando') {
      const shelfs = await this.cartMngShelfRepository.findAllRegistersByCart(id_cart)

      shelfs.forEach(item => {
        const array = {
          idShelfs: item.id_cart_shelf,
          positions: [] as any
        }

        for (let index = 1; index <= item.qty_position; index++) {
          let statusLed

          if (cart.status === 'Disponível') {
            statusLed = 1
          }

          if (cart.status === 'Carregando') {
            const positionIsMovimented = !!moviments.find(el => el.position === index && el.id_shelf === item.id_cart_shelf)
            statusLed = positionIsMovimented ? 0 : 1
          }

          array.positions.push({
            idPosition: index,
            statusLed
          })
        }

        arrayStatusPositions.shelfs.push(array)
      })

      return arrayStatusPositions
    }

    moviments.forEach(item => {
      const arrayOfIndex = arrayStatusPositions.shelfs.findIndex(el => el.idShelfs === item.id_shelf)

      if (arrayOfIndex > -1) {
        arrayStatusPositions.shelfs[arrayOfIndex].positions.push({
          idPosition: item.position,
          statusLed: item.status
        })
      } else {
        arrayStatusPositions.shelfs.push({
          idShelfs: item.id_shelf,
          positions: [{
            idPosition: item.position,
            statusLed: item.status
          }]
        })
      }
    })

    return arrayStatusPositions
  }
}

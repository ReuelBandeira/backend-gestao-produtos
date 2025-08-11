/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import CartRepository from '@modules/cart/infra/typeorm/repositories/CartRepository';
import CartCriticalRepository from '@modules/cart_criticals/infra/typeorm/repositories/CartCriticalRepository';
import ICreateCartMovimentDto from '@modules/cart_moviments/dtos/ICreateCartMovimentDto';
import IUpdateCartMovimentDto from '@modules/cart_moviments/dtos/IUpdateCartMovimentDto';
import CreateCartMovimentService from '@modules/cart_moviments/services/CreateCartMovimentService';
import FindCartMovimentService from '@modules/cart_moviments/services/FindCartMovimentService';
import FindComponentCartMovimentService from '@modules/cart_moviments/services/FindComponentCartMovimentService';
import UpdateCartMovimentService from '@modules/cart_moviments/services/UpdateCartMovimentService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import IFilterCarDTO from '@modules/cart_moviments/dtos/IFilterCarDTO';
import CartMovimentRepository from '../../typeorm/repositories/CartMovimentRepository';

export default class CartMovimentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id_cart, id_shelf, position, qrcode, list_code } = request.body as ICreateCartMovimentDto;

    const { id: id_employee_entrance } = request.user;

    const createCartMovimentService = container.resolve(CreateCartMovimentService);

    await createCartMovimentService.execute({
      id_cart,
      id_employee_entrance,
      id_shelf,
      position,
      qrcode,
      list_code
    })

    return response.status(201).json();
  }

  public async positions(request: Request, response: Response): Promise<Response> {
    const { id_cart } = request.query;

    const findCartMovimentService = container.resolve(FindCartMovimentService);

    const result = await findCartMovimentService.execute(Number(id_cart))

    return response.status(200).json(result);
  }

  public async check(request: Request, response: Response): Promise<Response> {
    const { list_code, component } = request.query;

    const findComponentCartMovimentService = container.resolve(FindComponentCartMovimentService);

    await findComponentCartMovimentService.execute(String(list_code), String(component))

    return response.status(200).json({});
  }

  public async report(request: Request, response: Response): Promise<Response> {
    const CartMoviment = new CartMovimentRepository();

    const cartTotal= await CartMoviment.findTotalCart();
    const amount_repairs=cartTotal?.length;

    const { page } = request.query;
    const { cart, totalPages, totalCartMoviment } =
    await CartMoviment.findAllCart(Number(page));

    return response.status(200).json({
      cart,
      totalPages,
      totalCartMoviment,
      amount_repairs

    });
  }

  public async CarByFilter(request: Request, response: Response): Promise<Response> {

    const { id_cart } = request.params as IFilterCarDTO;
    const CartMoviment = new CartMovimentRepository();

    const cart  = await CartMoviment.filterAllCar({id_cart});

    return response.status(200).json({
      cart,
    });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id_cart, id_shelf, position, qrcode, list_code } = request.body as IUpdateCartMovimentDto;

    const { id: id_employee_removal } = request.user;

    const updateCartMovimentService = container.resolve(UpdateCartMovimentService);

    await updateCartMovimentService.execute({
      id_cart,
      id_employee_removal,
      id_shelf,
      position,
      qrcode,
      list_code
    })

    return response.status(200).json();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id_cart } = request.params

    const cartMovimentRepository = new CartMovimentRepository();
    const cartRepository = new CartRepository();
    const cartCritical = new CartCriticalRepository()

    const cart = await cartRepository.findById(Number(id_cart))
    if (cart && cart.status === "Produção") {
      throw new AppError('Carrinho não pode ser limpo pois está em produção')
    }

    await cartMovimentRepository.clearMoviments(Number(id_cart))
    // Remover componentes da tabela de componentes críticos
    await cartCritical.removalComponents(Number(id_cart))

    return response.status(200).json();
  }
}


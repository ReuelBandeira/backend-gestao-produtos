/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import CreateCartMngService from '@modules/cart/services/CreateCartMngShelfService';
import CreateCartService from '@modules/cart/services/CreateCartService';
import DeleteCartService from '@modules/cart/services/DeleteCartService';
import UpdateCartProductionService from '@modules/cart/services/UpdateCartProductionService';
import UpdateCartService from '@modules/cart/services/UpdateCartService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CartMngShelfRepository from '../../typeorm/repositories/CartMngShelfRepository';
import CartRepository from '../../typeorm/repositories/CartRepository';
import CartShelfRepository from '../../typeorm/repositories/CartShelfRepository';

export default class CartController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { status, description, shelf } = request.body;

    const createCart = container.resolve(CreateCartService);

    const cart = await createCart.execute({
      status,
      description,
    });

    const cartManageShelf = container.resolve(CreateCartMngService);

    for (let i = 0; i < shelf.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const registers_shelfs = await cartManageShelf.execute({
        id_cart: cart.id,
        id_cart_shelf: shelf[i].id_cart_shelf,
        qty_position: shelf[i].qty_position
      });

      if (i === shelf.length - 1) {
        return response.status(201).json({ cart, registers_shelfs });
      }
    }

    return response.status(201).json();
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const workgroupRepository = new CartRepository();

    const { page } = request.query;

    const p = typeof page === 'string' ? parseInt(page) : 1;

    const {
      cart,
      totalPages,
      totalCart,

    } = await workgroupRepository.findAllCart(
      p,
    );

    return response.json({
      cart,
      totalPages,
      totalCart,

    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { status } = request.query;

    const cartRepository = new CartRepository();

    const cart = await cartRepository.findByNameSearch(String(status));
    const joinMng = new CartMngShelfRepository()

    if (!cart) {
      throw new AppError('This cart does not exist', 404);
    }

    const registers = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < cart.length; i++) {

      const id_cart = cart[i].id;
      // eslint-disable-next-line no-await-in-loop
      const shelfs = await joinMng.testeQuery(id_cart);
      // eslint-disable-next-line no-shadow
      const carts_registers = cart[i];

      const obj = {
        ...
        carts_registers,
        shelfs,
      };
      registers.push(obj);
    }

    return response.json(registers);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { status } = request.body;

    const idParsed = parseInt(id);
    const updateCart = container.resolve(UpdateCartService);

    const workgroup = await updateCart.execute({
      id: idParsed,
      status
    });

    return response.status(201).json(workgroup);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteCart = container.resolve(DeleteCartService);

    await deleteCart.execute({ id: parsedId });

    return response.status(204).json({});
  }


  public async findallCar(request: Request, response: Response): Promise<Response> {

    const cartRepository = new CartRepository();

    const cart = await cartRepository.findAllCar();

    return response.status(200).json({ cart });
  }

  public async findCarts(request: Request, response: Response): Promise<Response> {
    const carts = new CartRepository();

    const joinMng = new CartMngShelfRepository()

    const { page } = request.query;

    const p = typeof page === 'string' ? parseInt(page) : 1;

    const {
      cart,
      totalPages,
      totalCart } = await carts.findAllCart(p);


    const registers = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < cart.length; i++) {

      const id_cart = cart[i].id;
      // eslint-disable-next-line no-await-in-loop
      const shelfs = await joinMng.testeQuery(id_cart);
      // eslint-disable-next-line no-shadow
      const carts_registers = cart[i];

      const obj = {
        ...
        carts_registers,
        shelfs,
      };
      registers.push(obj);
    }
    return response.json({
      cart: registers,
      totalPages,
      totalCart,
    });
  }

  public async findShelfs(request: Request, response: Response): Promise<Response> {
    const shelfs = new CartShelfRepository();

    const shelfs_registers = await shelfs.findAllRegisters();

    return response.json({
      shelfs_registers,

    });
  }

  public async findMngShelfs(request: Request, response: Response): Promise<Response> {
    const Mngshelfs = new CartMngShelfRepository();

    const shelfs_registers = await Mngshelfs.findAllRegisters();

    return response.json({
      shelfs_registers,

    });
  }

  public async findJoinMngShelf(request: Request, response: Response): Promise<Response> {
    const Mngshelfs = new CartMngShelfRepository();

    const shelfs_registers = await Mngshelfs.findJoinRegisters();

    return response.json({
      shelfs_registers,

    });
  }

  public async indexMng(request: Request, response: Response): Promise<Response> {
    const workgroupRepository = new CartMngShelfRepository();

    const { page } = request.query;

    const p = typeof page === 'string' ? parseInt(page) : 1;

    const {
      cartMng,
      totalPages,
      totalCartMng,

    } = await workgroupRepository.findAllCartMng(
      p,
    );

    return response.json({
      cartMng,
      totalPages,
      totalCartMng,

    });
  }

  public async production(request: Request, response: Response): Promise<Response> {
    const { id_cart, status } = request.body;

    const updateCartProductionService = container.resolve(UpdateCartProductionService);

    await updateCartProductionService.execute(Number(id_cart), String(status))

    return response.json({})
  }
}

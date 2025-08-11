/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CreateProductionOderService from '@modules/production_orders/services/CreateProductionOrderService';
import UpdateProductionOrderService from '@modules/production_orders/services/UpdateProductionOrderService';
import DeleteProductionOderService from '@modules/production_orders/services/DeleteProductionOderService';
import UpdateStatusProductionOrderService from '@modules/production_orders/services/UpdateStatusProductionOderService';
import CreateProductionOrderBalancesService from '@modules/production_orders/services/CreateProductionOrdersBalancesService';
import ProductionOrdersRepository from '../../typeorm/repositories/ProductionOrdersRepository';

export default class ProductionOrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createProductionOrder = container.resolve(
      CreateProductionOderService
    );

    const { id: id_employee } = request.user;



    const {type} = request.body;

    const productionOrder = await createProductionOrder.execute({
      filename: request.file.filename,
      id_employee,
      type
    });

    return response.status(201).json(productionOrder);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page, all } = request.query;
    const p = typeof page === 'string' ? parseInt(page) : 1;
    const poRepository = new ProductionOrdersRepository();

    if (all) {
      const po = await poRepository.findAllOPsWithoutPagination();
      return response.json(po);
    }

    const { po, totalPages, totalOrders } =
      await poRepository.findAllProductionOrders(p);

    return response.json({
      po,
      totalPages,
      totalOrders,
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { mo_code } = request.query;

    const poRepository = new ProductionOrdersRepository();

    const po = await poRepository.findByProductionOrderCodeSearch(
      String(mo_code)
    );

    if (!po) {
      throw new AppError('This PO does not exist', 404);
    }

    return response.json({ po });
  }

  public async findPO(request: Request, response: Response): Promise<Response> {
    const { mo_code } = request.params;

    const poRepository = new ProductionOrdersRepository();

    const po = await poRepository.findByCodeOp(String(mo_code));

    return response.json(po);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id_route_code, mo_code } = request.body;
    const { id: id_employee } = request.user;

    const idParsed = Number(id);
    const productionOderUpdate = container.resolve(
      UpdateProductionOrderService
    );

    const productionOrder = await productionOderUpdate.execute({
      id: idParsed,
      id_route_code,
      mo_code,
      id_employee,
    });

    return response.status(201).json(productionOrder);
  }

  public async updateStatus(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;
    const { mo_status } = request.body;
    const updateStatusPO = container.resolve(
      UpdateStatusProductionOrderService
    );

    const idParsed = Number(id);
    const po = await updateStatusPO.execute({ id: idParsed, mo_status });
    await updateStatusPO.update(idParsed)

    return response.status(201).json(po);
  }

  public async historical(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { page } = request.query;

    const p = typeof page === 'string' ? parseInt(page) : 1;

    const poRepository = new ProductionOrdersRepository();

    const { productionOrderHistory, totalPages, totalproductionOrder } =
      await poRepository.findProductionHistory(p);

    return response.json({
      productionOrderHistory,
      totalPages,
      totalproductionOrder,
    });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    const deleteProductionOder = container.resolve(DeleteProductionOderService);
    const idParsed = Number(id);

    await deleteProductionOder.execute({ id: idParsed });

    return response.status(204).json({});
  }

  public async detail(request: Request, response: Response): Promise<Response> {
    const { page, id_work_station } = request.query;

    const p = typeof page === 'string' ? parseInt(page) : 1;

    const poRepository = new ProductionOrdersRepository();

    const { productionOrder, totalPages, totalproductionOrder } =
      await poRepository.findDetailsSerial(Number(id_work_station), Number(p));
    return response.json({ productionOrder, totalPages, totalproductionOrder });
  }

  public async season(request: Request, response: Response): Promise<Response> {
    const { page, serial_number } = request.query;

    const p = typeof page === 'string' ? parseInt(page) : 1;

    const poRepository = new ProductionOrdersRepository();

    const { productionOrder, totalPages, totalproductionOrder } =
      await poRepository.findSeasonSerial(Number(serial_number), Number(p));
    return response.json({ productionOrder, totalPages, totalproductionOrder });
  }

  public async indexFilter(request: Request, response: Response): Promise<Response> {
    const { mo_status, id_product, dateStart, dateEnd, page } = request.query;

    let p = typeof page === 'string' ? parseInt(page) : 1;

    const poRepository = new ProductionOrdersRepository();

    if (!p === false) {
      const {
        po,
        totalOrders,
        totalPages,
      } = await poRepository.listAllFilter(String(mo_status), Number(id_product), dateStart, dateEnd, Number(p),);

      return response.json({
        po,
        totalOrders,
        totalPages,
      });

    }

    const {
      po,
      totalOrders,
      totalPages,

    } = await poRepository.listAllFilter(String(mo_status), Number(id_product), dateStart, dateEnd, Number(p = 1),);

    return response.json({
      po,
      totalOrders,
      totalPages,
    });
  }

  public async opBalances(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { product_name, production_order } = request.query;

    const createOpBalances = container.resolve(
      CreateProductionOrderBalancesService
    );

    const balancesOp = await createOpBalances.execute({
      product_name,
      // id_material_entrance_smt,
      production_order,
    });

    return response.json(balancesOp);
  }

  public async ProductsPo(
    request: Request,
    response: Response
  ): Promise<Response> {

    const poRepository = new ProductionOrdersRepository();

    const productInOp = await poRepository.ProductsIndPo();

    const uniqueProducts = [];
    const processedProducts = new Set();

    for (let i = 0; i < productInOp.length; i++) {
      const { id_product, product_name } = productInOp[i];
      if (!processedProducts.has(id_product)) {
        processedProducts.add(id_product);
        uniqueProducts.push({ id_product, product_name });
      }
    }

    return response.json(
      uniqueProducts
    );
  }

  public async opsWithComposition(
    request: Request,
    response: Response
  ): Promise<Response> {
    const poRepository = new ProductionOrdersRepository();
    const productionOrders = await poRepository.findByOPsWithComposition()

    return response.json(productionOrders);
  }
}








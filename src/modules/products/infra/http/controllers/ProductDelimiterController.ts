/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import CreateProductProviderSolderPasteService from '@modules/products/services/CreateProductProviderSolderPasteService';
import CreateProductDelimiterService from '@modules/products/services/CreateProductDelimiterService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ProductDelimiterRepository from '../../typeorm/repositories/ProductDelimiterRepository';
import DeleteProductDelimiterService from '@modules/products/services/DeleteProductDelimiterService';
import UpdateProductDelimiterService from '@modules/products/services/UpdateProductDelimiterService';

export default class ProductDelimiterController {


  public async create(request: Request, response: Response): Promise<Response> {
    const {id_product,delimiter,position_quantity,type} = request.body;

    const { id: id_employee } = request.user;

    const createProduct = container.resolve(CreateProductDelimiterService);

    const product = await createProduct.execute({
      id_product,
      delimiter,
      position_quantity,
      type,
      id_employee
    });

    return response.status(201).json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteProducts = container.resolve(DeleteProductDelimiterService);

    await deleteProducts.execute({ id: parsedId });

    return response.status(204).json({});
  }


  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { position_quantity} = request.body;

    const { id: id_employee } = request.user;

    const update = container.resolve(UpdateProductDelimiterService);

    const product = await update.execute({
      id,position_quantity,id_employee
    });

    return response.status(201).json(product);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;
    const p = typeof page === 'string' ? parseInt(page) : 1;
    const productDelimiterRepository = new ProductDelimiterRepository();

    const {
      products,
      totalPages,
      totalProducts,
    } = await productDelimiterRepository.findAllProductsDelimiter(p);

    return response.json({ products_delimiter:products, totalPages, totalProducts });
  }


  public async listAll(request: Request, response: Response): Promise<Response> {

    const productDelimiterRepository = new ProductDelimiterRepository();

    const products_delimiter_all = await productDelimiterRepository.findAll();

    return response.json(products_delimiter_all);
  }

  public async filterProduct(request: Request, response: Response): Promise<Response> {

    const {id_product,page } = request.query;
    const p = typeof page === 'string' ? parseInt(page) : 1;

    const productDelimiterRepository = new ProductDelimiterRepository();

    const {
      products,
      totalPages,
      totalProducts,
    } = await productDelimiterRepository.ProductFilter(Number(id_product),p);

    return response.json({products,
      totalPages,
      totalProducts,});
  }



}

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import CreateProductProviderSolderPasteService from '@modules/products/services/CreateProductProviderSolderPasteService';
import CreateProductService from '@modules/products/services/CreateProductService';
import DeleteProductService from '@modules/products/services/DeleteProductService';
import UpdateProductService from '@modules/products/services/UpdateProductService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ProductRepository from '../../typeorm/repositories/ProductRepository';

export default class ProductController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;
    const p = typeof page === 'string' ? parseInt(page) : 1;
    const productRepository = new ProductRepository();


    const {
      products,
      totalPages,
      totalProducts,
    } = await productRepository.findAllProducts(p);

    const registers = [];
    for (let i = 0; i < products.length; i++) {

      const id_product = Number(products[i].id)

      // eslint-disable-next-line no-await-in-loop
      const providers_solder = await productRepository.findProviders(Number(id_product));

      const product_registers = products[i];

      const obj_registers = {
        ...
        product_registers,
        providers_solder

      };
      registers.push(obj_registers);
    }


    return response.json({ products: registers, totalPages, totalProducts });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { product_name } = request.query;

    const productRepository = new ProductRepository();

    const products = await productRepository.findByProductNameSearch(
      String(product_name),
    );

    if (!products) {
      throw new AppError('This Product does not exist', 404);
    }

    const registers = [];
    for (let i = 0; i < products.length; i++) {

      const id_product = Number(products[i].id)

      // eslint-disable-next-line no-await-in-loop
      const providers_solder = await productRepository.findProviders(Number(id_product));

      const product_registers = products[i];

      const obj_registers = {
        ...
        product_registers,
        providers_solder

      };
      registers.push(obj_registers);
    }

    return response.json({ products: registers });
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { product_name, description, type_side, exception, side_init, providers, number_plates_panel, client, code_pcba, type_plate, amount_parent, id_family } = request.body as ICreateProductDTO;

    // validação sem repetições

    const providers_map = providers.map(function (item, indice) {
      return item.id_provider;
    });

    const providersT = providers_map.filter(function (a) {
      return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
    }, Object.create(null));

    if (providers_map.length > providersT.length) {
      throw new AppError(
        `Há campos com fornecedores repetidos. Favor verificar!`
      );
    }


    const createProduct = container.resolve(CreateProductService);
    const createProductProviderSolderPaste = container.resolve(CreateProductProviderSolderPasteService);

    const product = await createProduct.execute({
      product_name,
      description,
      type_side,
      exception,
      side_init,
      number_plates_panel,
      client,
      code_pcba,
      type_plate,
      amount_parent,
      id_family
    });

    const id_product = product.id;

    for (let i = 0; i < providers.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const registerProductProviderSolderPaste = await createProductProviderSolderPaste.execute({
        id_product,
        id_provider: (providers[i].id_provider)
      });
    }

    return response.status(201).json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { product_name } = request.params;
    const { description, type_side, exception, side_init, providers, number_plates_panel, client, code_pcba,
      type_plate, amount_parent, id_family } = request.body;

    const productRepository = new ProductRepository();

    const update = container.resolve(UpdateProductService);

    const createProductProviderSolderPaste = container.resolve(CreateProductProviderSolderPasteService);

    const product = await update.execute({
      product_name,
      description,
      type_side,
      exception,
      side_init,
      number_plates_panel,
      client,
      code_pcba,
      type_plate,
      amount_parent,
      id_family
    });

    const register_product_name = await productRepository.findIdProduct(String(product_name));
    const id_product = register_product_name[0].id

    const delete_register_product_provider = await productRepository.deleteProductProvider(Number(id_product));

    for (let i = 0; i < providers.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const registerProductProviderSolderPaste = await createProductProviderSolderPaste.execute({
        id_product,
        id_provider: (providers[i].id_provider)
      });
    }

    return response.status(201).json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteProducts = container.resolve(DeleteProductService);

    await deleteProducts.execute({ id: parsedId });

    return response.status(204).json({});
  }

  public async listProducts(request: Request, response: Response): Promise<Response> {
    const productRepository = new ProductRepository();

    const products = await productRepository.findAllProductsList();

    return response.json(products);
  }

  public async listProductsSelect(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const productRepository = new ProductRepository();

    const products = await productRepository.findAllProductListSelect(id);

    return response.json({

      products

    });
  }

  public async findAllProductsWithoutComposition(request: Request, response: Response): Promise<Response> {
    const productRepository = new ProductRepository();

    const products = await productRepository.findAllProductsWithoutComposition();

    return response.json(products);
  }
}

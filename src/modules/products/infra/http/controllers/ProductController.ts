/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CreateProductService from '@modules/products/services/CreateProductsService';
import UpdateProductService from '@modules/products/services/UpdateProductsService';
import DeleteProductService from '@modules/products/services/DeleteProductsService';
import upload from '@config/multerConfig';
import { MulterError } from 'multer';
import ProductRepository from '../../typeorm/repositories/ProductsRepository';

export default class ProductController {
  public async create(request: Request, response: Response): Promise<Response> {
    return new Promise((resolve, reject) => {
      // Middleware Multer para o upload da imagem
      // eslint-disable-next-line consistent-return
      upload.single('image')(request, response, async (err: unknown) => {
        if (err) {
          if (err instanceof MulterError) {
            return reject(
              new AppError(`Erro ao fazer upload da imagem: ${err.message}`)
            );
          }
          return reject(
            new AppError('Erro desconhecido ao fazer upload da imagem.')
          );
        }

        try {
          // Extraia os dados do request
          const { name, description, price, expirationDate, categoryId } =
            request.body;
          const image = request.file?.filename || ''; // Nome do arquivo salvo

          // Crie o produto
          const createProduct = container.resolve(CreateProductService);

          const product = await createProduct.execute({
            name,
            description,
            price,
            expirationDate,
            image,
            categoryId,
          });

          resolve(response.status(201).json(product));
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const productsRepository = new ProductRepository();

    const { page } = request.query;

    const p = typeof page === 'string' ? parseInt(page) : 1;

    const { products, totalPages, totalProduct } =
      await productsRepository.findAllProduct(p);

    return response.json({
      products,
      totalPages,
      totalProduct,
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.query;

    const productsRepository = new ProductRepository();

    const product = await productsRepository.findByNameSearch(
      String(name),
      String(description)
    );

    if (!product) {
      throw new AppError('This Product does not exist', 404);
    }

    return response.json(product);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    return new Promise((resolve, reject) => {
      // Middleware Multer para o upload da imagem
      // eslint-disable-next-line consistent-return
      upload.single('image')(request, response, async (err: unknown) => {
        if (err) {
          if (err instanceof MulterError) {
            return reject(
              new AppError(`Erro ao fazer upload da imagem: ${err.message}`)
            );
          }
          return reject(
            new AppError('Erro desconhecido ao fazer upload da imagem.')
          );
        }

        try {
          const { id } = request.params;
          const { name, description, price, expirationDate, categoryId } =
            request.body;
          const image = request.file?.filename || ''; // Nome do arquivo salvo

          const idParsed = parseInt(id);
          const updateProduct = container.resolve(UpdateProductService);

          const updatedProduct = await updateProduct.execute({
            id: idParsed,
            name,
            description,
            price,
            expirationDate,
            image,
            categoryId,
          });

          resolve(response.status(200).json(updatedProduct));
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteProduct = container.resolve(DeleteProductService);

    await deleteProduct.execute({ id: parsedId });

    return response.status(204).json({});
  }

  public async findProduct(
    request: Request,
    response: Response
  ): Promise<Response> {
    const Product = new ProductRepository();

    const products_registers = await Product.findAllRegisters();

    return response.json({
      products_registers,
    });
  }
}

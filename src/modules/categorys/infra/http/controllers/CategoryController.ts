/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CreateCategoryService from '@modules/categorys/services/CreateCategoryService';
import UpdateCategoryService from '@modules/categorys/services/UpdateCategoryService';
import DeleteCategoryService from '@modules/categorys/services/DeleteCategoryService';
import CategoryRepository from '../../typeorm/repositories/CategoryRepository';

export default class CategoryController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createCategory = container.resolve(CreateCategoryService);

    const categorys = await createCategory.execute({
      name,
    });

    return response.status(201).json(categorys);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const categorysRepository = new CategoryRepository();

    const categorys = await categorysRepository.findByNameSearch(String(name));

    if (!categorys) {
      throw new AppError('This Category does not exist', 404);
    }

    return response.json(categorys);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name } = request.body;

    const idParsed = parseInt(id);
    const updateCategory = container.resolve(UpdateCategoryService);

    const Category = await updateCategory.execute({
      id: idParsed,
      name,
    });

    return response.status(201).json(Category);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);

    const deleteCategory = container.resolve(DeleteCategoryService);

    await deleteCategory.execute({ id: parsedId });

    return response.status(204).json({});
  }

  public async findCategory(
    request: Request,
    response: Response
  ): Promise<Response> {
    const categorys = new CategoryRepository();

    const categorys_registers = await categorys.findAllRegisters();

    return response.json({
      categorys_registers,
    });
  }
}

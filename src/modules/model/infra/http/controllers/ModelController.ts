/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CreateModelService from '@modules/model/services/CreateModelService';
import UpdateModelService from '@modules/model/services/UpdateModelService';
import DeleteModelService from '@modules/model/services/DeleteModelService';
import ModelRepository from '../../typeorm/repositories/ModelRepository';

export default class ModelController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {model,type} = request.body;

    const createModel = container.resolve(CreateModelService);

    const models = await createModel.execute({
      model,
      type
    });


    return response.status(201).json(models);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const workgroupRepository = new ModelRepository();

    const { page } = request.query;

    const p = typeof page === 'string' ? parseInt(page):1;

    const {
      model,
      totalPages,
      totalModel,

    } = await workgroupRepository.findAllModel(
      p,
    );

    return response.json({
      model,
      totalPages,
      totalModel,

    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { model } = request.query;

    const modelRepository = new ModelRepository();

    const models = await modelRepository.findByNameSearch(String(model));

    if (!models) {
      throw new AppError('This model does not exist', 404);
    }

    return response.json(models);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { model, type } = request.body;

    const idParsed = parseInt(id);
    const updateModel = container.resolve(UpdateModelService);

    const models = await updateModel.execute({
      id: idParsed,
      model,
      type
    });

    return response.status(201).json(models);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteModel = container.resolve(DeleteModelService);

    await deleteModel.execute({ id: parsedId });

    return response.status(204).json({});
  }

  public async findModel(request: Request, response: Response): Promise<Response> {
    const model = new ModelRepository();

    const model_registers = await model.findAllRegisters();

    return response.json({
      model_registers

    });
  }


}

import ICreateModelDTO from '@modules/model/dtos/ICreateModelDTO';
import IModelRepository from '@modules/model/repositories/IModelRepository';
import { getRepository, Like, Repository } from 'typeorm';
import Model from '../entities/Model';

const TOTAL_PER_PAGE = 11;

export default class ModelDowntimeRepository implements IModelRepository {
  private ormRepository: Repository<Model>;

  constructor() {
    this.ormRepository = getRepository(Model);

  }

  public async findById(id: number): Promise<Model | undefined> {
    const model = await this.ormRepository.findOne({
      where: { id },
    });

    return model;
  }

  public async findByName(model: string,type: string): Promise<Model | undefined> {
    const models = await this.ormRepository.findOne({
      where: { model, type }
    });

    return models;
  }

  public async findByNameSearch(
    model: string,
  ): Promise<(Model | undefined)[] | undefined> {
    const models = await this.ormRepository.find({
      where: { model: Like(`%${model}%`) },
    });

    return models;
  }

  public async create(modelData: ICreateModelDTO): Promise<Model> {
    const model = this.ormRepository.create(modelData);
    await this.ormRepository.save(model);

    return model;
  }

  public async update(modelData: Model): Promise<Model> {
    const model = await this.ormRepository.save(modelData);
    return model;
  }

  public async findAllModel(page=1,): Promise<Model | Model[]> {
    const model = await this.ormRepository.find({
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalModel = (await this.ormRepository.find()).length;

    return {
      model,
      totalPages:totalModel/ TOTAL_PER_PAGE,
      totalModel,

    };
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async findAllRegisters(): Promise<Model| Model[]> {
    const model = await this.ormRepository.find({
      order: { id: 'DESC' },
    });
    return model;
  }

}

import ICreateActionDTO from '@modules/action/dtos/ICreateActionDTO';
import IActionRepository from '@modules/action/repositories/IActionRepository';
import MaintenanceFeederActions from '@modules/maintenance_feeder/infra/typeorm/entities/MaintenanceFeederActions';
import { getRepository, Like, Repository } from 'typeorm';
import Action from '../entities/Action';

const TOTAL_PER_PAGE = 11;

export default class ActionRepository implements IActionRepository {
  private ormRepository: Repository<Action>;

  private ormMaintenanceRepository: Repository<MaintenanceFeederActions>;


  constructor() {
    this.ormRepository = getRepository(Action);
    this.ormMaintenanceRepository = getRepository(MaintenanceFeederActions);
  }

  public async findById(id: number): Promise<Action | undefined> {
    const action = await this.ormRepository.findOne({
      where: { id },
    });

    return action;
  }

  public async findByName(description: string): Promise<Action | undefined> {
    const action = await this.ormRepository.findOne({
      where: { description }
    });

    return action;
  }

  public async findByCode(code: string): Promise<Action | undefined> {
    const defect = await this.ormRepository
      .query(
        `${'SELECT * FROM action where code = "'}${code}"`
      );
    return defect;
  }

  public async findByNameSearch(
    description: string,
  ): Promise<(Action | undefined)[] | undefined> {
    const action = await this.ormRepository.find({
      where: { description: Like(`%${description}%`) },
    });

    return action;
  }

  public async create(actionData: ICreateActionDTO): Promise<Action> {
    const action = this.ormRepository.create(actionData);
    await this.ormRepository.save(action);

    return action;
  }

  public async update(actionData: Action): Promise<Action> {
    const action = await this.ormRepository.save(actionData);
    return action;
  }

  public async findAllAction(page=1,): Promise<Action | Action[]> {
    const action = await this.ormRepository.find({
      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
    });

    const totalAction = (await this.ormRepository.find()).length;

    return {
      action,
      totalPages:totalAction/ TOTAL_PER_PAGE,
      totalAction,

    };
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }

  public async findAllTypeFeeder(): Promise<Action | Action[]> {
    const action = await this.ormRepository.find({
      order: { id: 'DESC' },
      where: {
        type: 'type_feeder',
      },

    });
    return action;
  }

  public async deleteValidation(
    id_action: number,
  ): Promise<MaintenanceFeederActions[] > {
    const validation = await this.ormMaintenanceRepository
      .createQueryBuilder('maintenance_feeder_actions')
      .select([
        'id',
        'id_maintenance_feeder',
        'id_action'
      ])
      .where({id_action})
      .getRawMany();

    return validation;
  }

}

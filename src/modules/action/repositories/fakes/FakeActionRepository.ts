import ICreateActionDTO from '@modules/action/dtos/ICreateActionDTO';
import Action from '@modules/action/infra/typeorm/entities/Action';
import IActionRepository from '../IActionRepository';

export default class FakeActionRepository implements IActionRepository {
  private Action: Action[] = [];

  public async findByName(name: string): Promise<Action | undefined> {
    const findAction = this.Action.find(
      (Action) => Action.name === name,
    );

    return findAction;
  }

  findByNameSearch(
    name: string,
  ): Promise<(Action | undefined)[] | undefined> {
    throw new Error('Method not implemented.');
  }

  public async create({ name }: ICreateActionDTO): Promise<Action> {
    const Action = new Action();

    Object.assign(Action, {
      id: Math.round(Math.random() * 10),
      name,
    });
    this.Action.push(Action);
    return Action;
  }

  public async update(Action: Action): Promise<Action> {
    const findIndex = this.Action.findIndex(
      (findAction) => findAction.id === Action.id,
    );

    this.Action[findIndex] = Action;

    return Action;
  }

  public async findById(id: number): Promise<Action | undefined> {
    const findAction = this.Action.find(
      (Action) => Action.id === id,
    );

    return findAction;
  }

  public async findAllAction(): Promise<Action[]> {
    return this.Action;
  }

  public async listAction(): Promise<Action[]> {
    return this.Action;
  }

  public async delete(id: number): Promise<void> {
    const findActionIndex = this.Action.findIndex(
      (Action) => Action.id === id,
    );

    this.Action.splice(findActionIndex, 1);
  }
}

import ICreateCauseDTO from '@modules/Causes/dtos/ICreateCauseDTO';
import Cause from '@modules/Causes/infra/typeorm/entities/Cause';
import ICauseRepository from '../ICauseRepository';

export default class FakeCauseRepository implements ICauseRepository {
  private Causes: Cause[] = [];

  public async findByName(name: string): Promise<Cause | undefined> {
    const findCause = this.Causes.find(
      (Cause) => Cause.name === name,
    );

    return findCause;
  }

  findByNameSearch(
    name: string,
  ): Promise<(Cause | undefined)[] | undefined> {
    throw new Error('Method not implemented.');
  }

  public async create({ name }: ICreateCauseDTO): Promise<Cause> {
    const Cause = new Cause();

    Object.assign(Cause, {
      id: Math.round(Math.random() * 10),
      name,
    });
    this.Causes.push(Cause);
    return Cause;
  }

  public async update(Cause: Cause): Promise<Cause> {
    const findIndex = this.Causes.findIndex(
      (findCause) => findCause.id === Cause.id,
    );

    this.Causes[findIndex] = Cause;

    return Cause;
  }

  public async findById(id: number): Promise<Cause | undefined> {
    const findCause = this.Causes.find(
      (Cause) => Cause.id === id,
    );

    return findCause;
  }

  public async findAllCauses(): Promise<Cause[]> {
    return this.Causes;
  }

  public async listCauses(): Promise<Cause[]> {
    return this.Causes;
  }

  public async delete(id: number): Promise<void> {
    const findCauseIndex = this.Causes.findIndex(
      (Cause) => Cause.id === id,
    );

    this.Causes.splice(findCauseIndex, 1);
  }
}

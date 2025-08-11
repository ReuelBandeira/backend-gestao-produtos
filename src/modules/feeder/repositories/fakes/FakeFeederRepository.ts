import { ICreateFeederDTO } from '@modules/feeder/dtos/ICreateFeederDTO';
import { Feeder } from '@modules/feeder/infra/typeorm/entities/Feeder';
import AppError from '@shared/errors/AppError';
import { FeederPagination, IFeederRepository } from '../IFeederRepository';

export default class FakeFeederRepository implements IFeederRepository {
  private feeders: Feeder[] = [];

  async findById(id: number): Promise<Feeder | undefined> {
    const findFeeder = this.feeders.find((feeder) => feeder.id === id);

    return findFeeder;
  }

  async findByFeederName(feeder_code: string): Promise<Feeder | undefined> {
    const findFeeder = this.feeders.find(
      (feeder) => feeder.feeder_code === feeder_code,
    );

    return findFeeder;
  }

  async findByFeederNameSearch(
    feeder_code: string,
  ): Promise<(Feeder | undefined)[] | undefined> {
    throw new Error('Method not implemented.');
  }

  async findAllFeeders(page = 1): Promise<FeederPagination> {
    return {
      feeder: this.feeders,
      totalFeeders: 1,
      totalPages: page,
    };
  }

  async findAllFeedersWithoutPagination(): Promise<Feeder[]> {
    return this.feeders;
  }

  async create({
    feeder_code,
    status,
    mouting_limit,
    id_type_feeder,
  }: ICreateFeederDTO): Promise<Feeder> {
    const feeder = new Feeder();

    Object.assign(feeder, {
      id: Math.round(Math.random() * 10),
      feeder_code,
      status,
      mouting_limit,
      id_type_feeder,
    });

    this.feeders.push(feeder);

    return feeder;
  }

  async update(feeder: Feeder): Promise<Feeder> {
    const findByIndex = this.feeders.findIndex(
      (findFedder) => findFedder.id === feeder.id,
    );

    this.feeders[findByIndex] = feeder;

    return feeder;
  }

  public async delete(id: number): Promise<void> {
    const findByIndex = this.feeders.findIndex((feeder) => feeder.id === id);

    this.feeders.splice(findByIndex, 1);
  }
}

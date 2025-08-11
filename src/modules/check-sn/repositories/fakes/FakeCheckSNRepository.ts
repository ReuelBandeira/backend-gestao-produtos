import ICreateCheckSNDTO from '@modules/check-sn/dtos/ICreateCheckSNDTO';
import CheckSN from '@modules/check-sn/infra/typeorm/entities/CheckSN';
import AppError from '@shared/errors/AppError';
import { CheckSNPagination, ICheckSNRepository } from '../ICheckSNRepository';

export default class FakeCheckSNRepository implements ICheckSNRepository {
  private feeders: CheckSN[] = [];

  async findById(id: number): Promise<CheckSN | undefined> {
    const findFeeder = this.feeders.find((feeder) => feeder.id === id);

    return findFeeder;
  }

  async findByFeederName(feeder_code: string): Promise<CheckSN | undefined> {
    const findFeeder = this.feeders.find(
      (feeder) => feeder.feeder_code === feeder_code,
    );

    return findFeeder;
  }

  async findByFeederNameSearch(
    feeder_code: string,
  ): Promise<(CheckSN | undefined)[] | undefined> {
    throw new Error('Method not implemented.');
  }

  async findAllFeeders(page = 1): Promise<CheckSNPagination> {
    return {
      feeder: this.feeders,
      totalFeeders: 1,
      totalPages: page,
    };
  }

  async findAllFeedersWithoutPagination(): Promise<CheckSN[]> {
    return this.feeders;
  }

  async create({
    feeder_code,
    status,
    mouting_limit,
    id_type_feeder,
  }: ICreateCheckSNDTO): Promise<CheckSN> {
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

  async update(feeder: CheckSN): Promise<CheckSN> {
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

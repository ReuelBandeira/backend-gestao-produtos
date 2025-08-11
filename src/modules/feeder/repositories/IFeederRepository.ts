import { ICreateFeederDTO } from '../dtos/ICreateFeederDTO';
import { Feeder } from '../infra/typeorm/entities/Feeder';

export interface FeederPagination {
  feeder: Feeder[];
  totalFeeders: number;
  totalPages: number;
}

export interface IFeederRepository {

  findById(id: number): Promise<Feeder | undefined>;
  findByFeederName(feeder_code: string): Promise<Feeder | undefined>;
  findByFeederNameSearch(
    feeder_code: string,
  ): Promise<(Feeder | undefined)[] | undefined>;
  findAllFeeders(page: number): Promise<FeederPagination>;
  findAllFeedersWithoutPagination(): Promise<Feeder[]>;
  create(data: ICreateFeederDTO): Promise<Feeder>;
  update(feeder: Feeder): Promise<Feeder>;
  delete(id: number): Promise<void>;
  updateStatus(id: number): Promise<void>;
  findByLineFeeder(id: number): Promise<Feeder | undefined>;
  deleteValidation(id: number): Promise<Feeder[] | undefined>;
  findAllRegisters():Promise<Feeder| Feeder[] >;
  checkFeeder(feeder_code: string): Promise<Feeder[]>;
}

import ICreateCheckSNDTO from '@modules/check-sn/dtos/ICreateCheckSNDTO';
import {
  CheckSNPagination,
  ICheckSNRepository,
} from '@modules/check-sn/repositories/ICheckSNRepository';
import { getRepository, Like, Repository } from 'typeorm';
import CheckSN from '../entities/CheckSN';

const TOTAL_PER_PAGE = 14;

export class CheckSNRepository implements ICheckSNRepository {
  private ormrepository: Repository<CheckSN>;

  constructor() {
    this.ormrepository = getRepository(CheckSN);
  }


  async findByCheckSN(serial_number: string): Promise<CheckSN | undefined> {
    const feeder = await this.ormrepository.findOne({ serial_number });

    return feeder;
  }




  async create({
    serial_number,
    mo_number,
    model_name,
    id_line,
    station_name,
    in_station_time,
    id_employee,
  }: ICreateCheckSNDTO): Promise<CheckSN> {
    const createFeeder = this.ormrepository.create({
      serial_number,
      mo_number,
      model_name,
      id_line,
      station_name,
      in_station_time,
      id_employee,
    });

    await this.ormrepository.save(createFeeder);

    return createFeeder;
  }

  async update(feeder: CheckSN): Promise<CheckSN> {
    const update = await this.ormrepository.save(feeder);

    return update;
  }

  async delete(id: number): Promise<void> {
    await this.ormrepository.delete({ id });
  }
}

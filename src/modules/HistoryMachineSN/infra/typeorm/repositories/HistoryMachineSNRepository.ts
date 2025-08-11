
import IHistoryMachineSNRepository from '@modules/HistoryMachineSN/repositories/IHistoryMachineSNRepository';
import { getRepository, Repository } from 'typeorm';
import HistoryMachineSN from '../entities/HistoryMachineSN';

export default class HistoryMachineSNRepository implements IHistoryMachineSNRepository {
  private ormRepository: Repository<HistoryMachineSN>;

  constructor() {
    this.ormRepository = getRepository(HistoryMachineSN);
  }

  public async findBySerialNumber(serial_number: string): Promise<HistoryMachineSN[]> {
    return await this.ormRepository.find({
      relations: ["line"],
      where: {
        serial_number
      }
    })
  }
}

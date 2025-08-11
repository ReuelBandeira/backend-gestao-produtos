import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { ICreateShiftDTO } from '../dtos/ICreateShiftDTO';
import Shift from '../infra/typeorm/entities/Shift';
import IShiftRepository from '../repositories/IShiftRepository';

@injectable()
export default class CreateShiftService {
  constructor(
    @inject('ShiftRepository')
    private shiftRepository: IShiftRepository
  ) {}

  async execute(data: ICreateShiftDTO): Promise<Shift> {
    const checkNameExist = await this.shiftRepository.findBySearch(data.name);

    if (checkNameExist) {
      throw new AppError('Nome do turno já existe, favor verificar!', 404);
    }

    return await this.shiftRepository.create(data);
  }
}

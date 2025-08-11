import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUpdateShiftDTO } from '../dtos/IUpdateShiftDTO';
import Shift from '../infra/typeorm/entities/Shift';
import IShiftRepository from '../repositories/IShiftRepository';

@injectable()
export default class UpdateShiftService {
  constructor(
    @inject('ShiftRepository')
    private shiftRepository: IShiftRepository
  ) {}

  async execute({ id, ...rest }: IUpdateShiftDTO): Promise<Shift | undefined> {
    const shift = await this.shiftRepository.findById(id);

    if (!shift) {
      throw new AppError('Este turno não existe', 404);
    }

    Object.assign(shift, {
      ...rest,
    });

    return await this.shiftRepository.update(shift);
  }
}

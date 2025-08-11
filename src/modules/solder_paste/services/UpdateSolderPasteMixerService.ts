import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ISolderPasteMixerRepository from '../repositories/ISolderPasteMixerRepository';

interface IRequest {
  // id: number;
  serial_paste: string;
  id_employee_exit:number;
}

@injectable()
export default class UpdateSolderPasteMixerService {
  constructor(
    @inject('SolderPasteMixerRepository')
    private SolderPasteMixerRepository: ISolderPasteMixerRepository,
  ) {}

  async execute({
    // id,
    serial_paste,
    id_employee_exit

  }: IRequest): Promise<void> {

    const check = await this.SolderPasteMixerRepository.findBySerial(
      serial_paste,
    );

    if (check.length === 0) {
      throw new AppError(`O serial não existe.`);
    }
    const id_update=check[0].id;

    await this.SolderPasteMixerRepository.update(
      id_update,
      id_employee_exit
    );

  }
}

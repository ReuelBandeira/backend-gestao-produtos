import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IMachineRepository from '../repositories/ICreateMachineRepository';

interface IRequest {
  status: string;
  struct_bom_code: string;
  side_product: string;
}


@injectable()
export default class UpdateStatusMachineService {
  constructor(
    @inject('MachineRepository')
    private machineRepository: IMachineRepository,
  ) {}

  public async execute({
    status,
    struct_bom_code,
    side_product,
  }: IRequest): Promise<void> {
    const machine = await this.machineRepository.findByStructCode(
      struct_bom_code,
      side_product,
    );
    if (!machine) {
      throw new AppError(`Essa lista ${struct_bom_code} não existe`);
    }

    Object.assign(machine, {
      status,
    });

    await this.machineRepository.updateStatus(
      status,
      struct_bom_code,
      side_product,
    );
  }
}

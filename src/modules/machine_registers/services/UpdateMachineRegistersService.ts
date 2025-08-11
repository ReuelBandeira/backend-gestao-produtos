import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MachineRegisters from '../infra/typeorm/entities/MachineRegisters';
import IMachineRegistersRepository from '../repositories/IMachineRegistersRepository';

interface IRequest {
  id: number;
  description_tooling_control: string;

}

@injectable()
export default class UpdateMachineRegistersService {
  constructor(
    @inject('MachineRegistersRepository')
    private machineRegistersRepository: IMachineRegistersRepository,
  ) {}

  async execute({
      id,
      model,
      description,
      manufacturer,
      serial_number,
      voltage,
      id_line,
      line_layout,
      status


  }: IRequest): Promise<void> {


    if (line_layout !==0 && id_line!==1010){

        const check_position_layout = await this.machineRegistersRepository.validationLayoutLine(
          id_line,
          line_layout,
          status
        );

        if (check_position_layout) {
          throw new AppError(`A posição N° ${line_layout} não é permitida, pois ja existe uma máquina ativa na mesma linha. Favor verificar!`);
        }

        const regsiters_machineUpate = await this.machineRegistersRepository.findByMachineRegistersName(
          id,
        );

        if (!regsiters_machineUpate) {
          throw new AppError(`O cadastro: ${id} não existe.`);
        }
    };

    await this.machineRegistersRepository.update(
      id,
      model,
      description,
      manufacturer,
      serial_number,
      voltage,
      id_line,
      line_layout,
      status

    );

  }
}

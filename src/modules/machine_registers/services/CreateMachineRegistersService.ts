import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import MachineRegisters, { StatusType } from '../infra/typeorm/entities/MachineRegisters';
import IMachineRegistersRepository from '../repositories/IMachineRegistersRepository';

interface IRequest {
  model: string;
  description: string;
  manufacturer: string;
  serial_number: string;
  voltage: string;
  id_line: number;
  manufacturing_date:string;
  id_employee:number;
  status:StatusType;
  line_layout:number;

}

@injectable()
export default class CreateMachineRegistersService {
  constructor(
    @inject('MachineRegistersRepository')
    private machineRegistersRepository: IMachineRegistersRepository,
  ) { }

  async execute({
    model,
    description,
    manufacturer,
    serial_number,
    voltage,
    id_line,
    manufacturing_date,
    id_employee,
    status,
    line_layout,

  }: IRequest): Promise<MachineRegisters> {

    if (line_layout !==0 && id_line!==1010){

      const checkMachineRegisters = await this.machineRegistersRepository.validationCreate(
        model,
        description,
        manufacturer,
        serial_number,
        voltage,
        id_line,
        status,
        line_layout,

      );

      if (checkMachineRegisters) {
        throw new AppError(`Este registro de Máquinas ja existe. Favor verificar!`);
      }

      const check_serial_number = await this.machineRegistersRepository.validationSn(
        serial_number
      );

      if (check_serial_number) {
        throw new AppError(`Este Serial Number ${serial_number} ja existe. Favor verificar!`);
      }

      const check_position_layout = await this.machineRegistersRepository.validationLayoutLine(
        id_line,
        line_layout,
        status
      );

      if (check_position_layout) {
        throw new AppError(`A posição N° ${line_layout} não é permitida, pois ja existe uma máquina ativa na mesma linha. Favor verificar!`);
      }

    };

    if (line_layout ==0 || id_line==1010){

      const check_serial_number = await this.machineRegistersRepository.validationSn(
        serial_number
      );

      if (check_serial_number) {
        throw new AppError(`Este Serial Number ${serial_number} ja existe. Favor verificar!`);
      }

    };

    if (id_line!==1010 && line_layout ==0  ){

      throw new AppError(`A posição ${line_layout} não é permitida para esta linha. Favor verificar!`);

    };

    const tooling_control = await this.machineRegistersRepository.create({
      model,
      description,
      manufacturer,
      serial_number,
      voltage,
      id_line,
      manufacturing_date,
      id_employee,
      status,
      line_layout,

    });

    return tooling_control;
  }
}

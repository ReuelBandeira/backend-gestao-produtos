/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import SolderPasteMixer from '../infra/typeorm/entities/SolderPasteMixer';
import ISolderPasteMixerRepository from '../repositories/ISolderPasteMixerRepository';
import ISolderPasteControllRepository from '../repositories/ISolderPasteControllRepository';
// eslint-disable-next-line import/order
import IMachineRegistersRepository from '@modules/machine_registers/repositories/IMachineRegistersRepository';

interface IRequest {
  serial_paste: string;
  id_machine: number;
  id_employee_input: number;
}

@injectable()
export default class CreateSolderPasteMixerService {
  constructor(
    @inject('SolderPasteMixerRepository')
    private SolderPasteMixerRepository: ISolderPasteMixerRepository,
    @inject('SolderPasteControllRepository')
    private solderPasteControllRepository: ISolderPasteControllRepository,
    @inject('MachineRegistersRepository')
    private machineRegistersRepository: IMachineRegistersRepository
  ) {}

  async execute({
    serial_paste,
    id_machine,
    id_employee_input
  }: IRequest): Promise<SolderPasteMixer> {

    const checkMachine = await this.machineRegistersRepository.findByMachine(
      id_machine
    );

    if (checkMachine.length === 0) {
      throw new AppError(`Essa Máquina não existe!`);
    }

    const checkSerialInMixer = await this.SolderPasteMixerRepository.findBySerialInMixer(
      serial_paste
    );

    if (checkSerialInMixer.length !== 0) {
      throw new AppError(`Esse serial só poderá dar entrada quando for retirado da Mixer !`);
    }

    const checkSerial = await this.solderPasteControllRepository.findBySerialMixer(
      serial_paste
    );

    if (checkSerial.length === 0) {
      throw new AppError(`Esse serial é invalido ou foi descartado !`);
    }

    const checkSerialTime = await this.SolderPasteMixerRepository.validationTimeMixer(
      String(serial_paste)
    );

    if (checkSerialTime.length !== 0 && checkSerialTime[0].occurrence_count >= 3 && checkSerialTime[0].defrost_time <=8) {
      throw new AppError(`Esse serial esgotou sua entrada na Mixer !`);
    }

    const SolderPasteMixer = await this.SolderPasteMixerRepository.create({
      serial_paste,
      id_machine,
      id_employee_input
    });

    const input_quantity_mixer = await this.SolderPasteMixerRepository.findBySerial(
      String(serial_paste)
    );

    const quantity_mixer=input_quantity_mixer.length;

    const updateQtySolderPaste = await this.solderPasteControllRepository.register_quantity_mixer(
      String(serial_paste),
      Number(quantity_mixer)
    );

    return SolderPasteMixer;
  }
}

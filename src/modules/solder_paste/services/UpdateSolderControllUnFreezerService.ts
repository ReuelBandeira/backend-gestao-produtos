import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import SolderPasteControll from '../infra/typeorm/entities/SolderPasteControll';
import ISolderPasteControllRepository from '../repositories/ISolderPasteControllRepository';


interface IRequest {
  serial_paste: string,
  id_employee_unfreezer: number,
}

@injectable()
export default class UpdateSolderControllUnFreezerService {
  constructor(
    @inject('SolderPasteControllRepository')
    private solderPasteControllRepository: ISolderPasteControllRepository,
  ) {}

  async execute({
    serial_paste,
    id_employee_unfreezer

  }: IRequest): Promise<void> {

    const verifySNDelete= await this.solderPasteControllRepository.findSerialSolderPasteProvider(serial_paste);

    if (verifySNDelete.length ==0) {
      throw new AppError(`O número de série é inválido, foi descartado ou marcado como dado baixa !`);
    }

    const verifySerialPasteProvider= await this.solderPasteControllRepository.findSerialSolderPasteProvider(serial_paste);
    const verifySolderPasteFIFOProvider= await this.solderPasteControllRepository.findAllSolderPasteControllFreezerProviderOrderAsc(verifySerialPasteProvider[0].id_provider);

    if (verifySolderPasteFIFOProvider[0]?.serial_paste !== serial_paste) {
      throw new AppError(`Essa não é a proxima pasta a ser retirada do freezer. Favor verificar!`);
    }

    await this.solderPasteControllRepository.updateDateTimeUnFreezer(
      serial_paste,
      id_employee_unfreezer
    );

  }
}

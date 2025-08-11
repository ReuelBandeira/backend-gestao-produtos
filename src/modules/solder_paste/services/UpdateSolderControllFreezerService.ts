import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { zonedTimeToUtc } from 'date-fns-tz';
import SolderPasteControll from '../infra/typeorm/entities/SolderPasteControll';
import ISolderPasteControllRepository from '../repositories/ISolderPasteControllRepository';

interface IRequest {
  serial_paste: string,
  id_employee_freezer : number,
}

@injectable()
export default class UpdateSolderControllFreezerService {
  constructor(
    @inject('SolderPasteControllRepository')
    private solderPasteControllRepository: ISolderPasteControllRepository,
  ) {}

  async execute({
    serial_paste,
    id_employee_freezer,

  }: IRequest): Promise<void> {

    const verifySerialPasteProvider= await this.solderPasteControllRepository.findSerialSolderPasteProvider(serial_paste);

    if (verifySerialPasteProvider.length ===0) {
      throw new AppError(`O número de série é inválido, foi descartado ou marcado como dado baixa !`);
    }

    const date_line_use=verifySerialPasteProvider[0].datetime_use_line === null;
    const status_discard=verifySerialPasteProvider[0].discard_status === "No";

    const dataAtual = new Date();
    // Obtém o deslocamento do fuso horário em minutos
    const offset = dataAtual.getTimezoneOffset();
    // Aplica o deslocamento para obter a data corrigida
    const dataCorrigida = new Date(dataAtual.getTime() - offset * 60000);

    if (date_line_use === false && status_discard === true) {

      const solder_paste_create = {
        serial_paste:verifySerialPasteProvider[0].serial_paste,
        datetime_freezer:dataCorrigida,
        datetime_unfreezer: null,
        datetime_use:null,
        status:"Freezer",
        id_employee:id_employee_freezer ,
        type_paste:verifySerialPasteProvider[0].type_paste,
        id_provider:verifySerialPasteProvider[0].id_provider,
        expiration_date:verifySerialPasteProvider[0].expiration_date,
        manufacturing_date:verifySerialPasteProvider[0].manufacturing_date,
        lot_number:verifySerialPasteProvider[0].lot_number,
        weight:verifySerialPasteProvider[0].weight
      };
      await this.solderPasteControllRepository.create(solder_paste_create);

    }
    // else {
    //   throw new AppError(`Esse Serial não pode retornar ao refrigerador pois não foi usado em linha ou encontra-se descartado!`);
    // }




    const verifySolderPasteFIFOProvider= await this.solderPasteControllRepository.validation_input_sn_cooler(verifySerialPasteProvider[0].id_provider);


    if (verifySolderPasteFIFOProvider[0]?.serial_paste !== serial_paste && date_line_use !== false && status_discard === true) {
      throw new AppError(`Essa não é a proxima pasta a entrar no freezer para este fornecedor. Favor verificar!`);
    }

    const checkSerialExist = await this.solderPasteControllRepository.findBySerialName(
      serial_paste,
    );

    if (checkSerialExist && date_line_use === true) {
      throw new AppError(`Esse Serial já existe no Refrigerador! `);
    }

    const checkSerialExistUnFreezer = await this.solderPasteControllRepository.findBySerialUnFreezer(
      serial_paste,
    );
    if (checkSerialExistUnFreezer && date_line_use === true) {
      throw new AppError(`Esse Serial não pode voltar para o refrigerador, pois o mesmo ja foi retirado! `);
    }

   await this.solderPasteControllRepository.updateDateTimeFreezer(
      serial_paste,
      id_employee_freezer
    );

  }
}

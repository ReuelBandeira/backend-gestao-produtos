import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import SolderPasteControll from '../infra/typeorm/entities/SolderPasteControll';
import ISolderPasteControllRepository from '../repositories/ISolderPasteControllRepository';

interface IRequest {
  serial_paste: string,
  id_employee_use : number
}

@injectable()
export default class UpdateSolderControllUseService {
  constructor(
    @inject('SolderPasteControllRepository')
    private solderPasteControllRepository: ISolderPasteControllRepository,
  ) {}

  async execute({
    serial_paste,
    id_employee_use

  }: IRequest): Promise<void> {

    const verifySNDelete= await this.solderPasteControllRepository.findSerialSolderPasteProvider(serial_paste);

    if (verifySNDelete.length ==0) {
      throw new AppError(`O número de série é inválido, foi descartado ou marcado como dado baixa !`);
    }

    const restriction_use = await this.solderPasteControllRepository.restriction_use_generated_tag(serial_paste);

    if( restriction_use.length == 1){
      throw new AppError(`Esse Serial ainda não pode ser usado!`);
    }

   // adicionado para a regra da pasta pronta pra uso
    const checkSerialExist2 = await this.solderPasteControllRepository.findBySerialuseName(
    serial_paste
    );

    if( checkSerialExist2 ){
      throw new AppError(`Esse Serial não pode ser usado, pois encontra-se no refrigerador! `);
    }

    const checkSerialExist = await this.solderPasteControllRepository.findBySolderPasteControllUnFreezer(
      serial_paste
    );

    const checkProvider= await this.solderPasteControllRepository.provider_name_sn(
      serial_paste
    );


    const provider_id=checkProvider[0].id_provider;

    const validationUse = await this.solderPasteControllRepository.conf_day(
      provider_id
    );


    if(validationUse.length == 0){
      throw new AppError(`Esse Fornecedor não possui configuração de tempo de degelo. Favor verificar! `);
    }


    const released_use=validationUse[0].thaw_time;

    const defrost_time_format = checkSerialExist[0].defrost_time.split(':');

    const validation_use_date = checkSerialExist[0].number_days;

    if(validation_use_date >= 7){
      throw new AppError(`Esse Serial encontra-se vencido e não pode ser usado! `);
    }

    if(parseInt(defrost_time_format[0]) < released_use ){
      throw new AppError(`Esse Serial ainda não pode ser usado! `);
    }

    const verifySerialPasteProvider= await this.solderPasteControllRepository.findSerialSolderPasteProvider(serial_paste);
    const verifySolderPasteFIFOProvider= await this.solderPasteControllRepository.findAllSolderPasteControllUnFreezerProviderOrderAsc(verifySerialPasteProvider[0].id_provider);

    if (verifySolderPasteFIFOProvider[0]?.serial_paste !== serial_paste) {
      throw new AppError(`Esse não é a proxima pasta a ser usada. Favor verificar!`);
    }


    await this.solderPasteControllRepository.updateDateTimeUse(
      serial_paste,
      id_employee_use
    );

  }
}

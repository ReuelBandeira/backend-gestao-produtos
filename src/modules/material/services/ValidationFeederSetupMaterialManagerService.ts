/* eslint-disable radix */
import { IFeederRepository } from '@modules/feeder/repositories/IFeederRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  feeder_code: string;
}

interface IResponse {
  status: string;
  message: string;
  type_feeder: number;
}

@injectable()
export default class ValidationFeederSetupMaterialManagerService {
  constructor(
    @inject('FeederRepository')
    private feederRepository: IFeederRepository,
  ) {}

  public async execute({ feeder_code }: IRequest): Promise<IResponse> {
    const feederExists = await this.feederRepository.findByFeederName(
      feeder_code,
    );

    if (!feederExists) {
      throw new AppError('Este Feeder não existe', 404);
    }

    // limite de uso
    const result_feederLimit = [];

        const result_amount = {
              feeder_code:feederExists.feeder_code,
              mouting_limit:feederExists.mouting_limit,
              criticality_percentage: 0.9 * feederExists.mouting_limit,
              used_qty:feederExists.used_qty,
          }
          result_feederLimit.push(result_amount);

    const exceededLimits = result_feederLimit.filter(feeder => feeder.used_qty > feeder.mouting_limit || feeder.used_qty >= feeder.criticality_percentage);

    if (exceededLimits.length !==0) {
      throw new AppError('Este Feeder atingiu seu limite de uso ou está próximo de atingir');
    }


    if (
      feederExists.status === 'using' ||
      feederExists.status === 'maintence'
    ) {

      if(feederExists.status === 'using'){
        const feederLineName = await this.feederRepository.findByLineFeeder(feederExists.id);

        throw new AppError('Este Feeder não pode ser usado pois esta em uso na linha '+feederLineName[0].line_name+', módulo ' +feederLineName[0].machine+'-'+ feederLineName[0].module + ', posição '+feederLineName[0].position);

      }else{
        throw new AppError('Este Feeder não pode ser usado, pois esta em manuntenção');
      }
    }
    return {
      status: 'success',
      message: 'Campo Válido',
      type_feeder: feederExists.id_type_feeder,
    };
  }
}

/* eslint-disable radix */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IFeederRepository from '@modules/feeder/repositories/IFeederRepository';
import CheckToolPrinter from '@modules/check_tool_printer/infra/typeorm/repositories/CheckToolPrinterRepository';
import { ISqueegeeRepository } from '@modules/squeegees/repositories/ISqueegeeRepository';
import IToolingControlRepository from '@modules/tooling_control/repositories/IToolingControlRepository';
import IMaterialManagerRepository from '../repositories/IMaterialManagerRepository';
import IMaterialManagerSetupRepository from '../repositories/IMaterialManagerSetupRepository';

import ILogRoutineFinishRepository from '../repositories/ILogRoutineFinishRepository';
// eslint-disable-next-line import/order
import IProductionOrdersRepository from '@modules/production_orders/repositories/IProductionOrdersRepository';
import IMaterialManagerChangeFeederRepository from '../repositories/IMaterialManagerChangeFeederRepository';

interface IRequest {
  list_code: string;
  id_employee: number;
}

@injectable()
export default class RoutineFinishManagerService {
  constructor(
    @inject('CheckToolPrinterRepository')
    private checktoolprinter: CheckToolPrinter,
    @inject('MaterialManagerRepository')
    private materialRepository: IMaterialManagerRepository,
    @inject('MaterialManagerSetupRepository')
    private materialSetupRepository: IMaterialManagerSetupRepository,
    @inject('LogRoutineFinishRepository')
    private logRoutineFinishRepository: ILogRoutineFinishRepository,
    @inject('FeederRepository')
    private feederRepository: IFeederRepository,
    @inject('ProductionOrdersRepository')
    private productionOrderRepository: IProductionOrdersRepository,
    @inject('SqueegeeRepository')
    private squeegeeRepository: ISqueegeeRepository,
    @inject('ToolingControlRepository')
    private tooling_controlRepository: IToolingControlRepository,
    @inject('MaterialManagerChangeFeederRepository')
    private materialChangeFeederRepository: IMaterialManagerChangeFeederRepository,

  ) {}

  public async execute({ list_code, id_employee }: IRequest): Promise<void> {

    const findMaterialList =
      await this.materialRepository.findDetailsByListCode(list_code);

    if (findMaterialList?.length === 0) {
      throw new AppError('Esta lista não existe', 404);
    }

    const logRoutineFinish = await this.logRoutineFinishRepository.create({
      list_code,
      id_employee
    });

    if (!logRoutineFinish) {
      throw new AppError('Erro ao registra log');
    }

    const feeder = await this.materialSetupRepository.findSetupFeeder(
      String(list_code)
    );

    for (let i = 0; i < feeder.length; i++) {
      const idFeeder = feeder[i].id_feeder;

      // eslint-disable-next-line no-await-in-loop
      await this.feederRepository.updateStatus(idFeeder);
    }

    // registros de feeder de maior id em change

    const check_feeder_change = await this.materialChangeFeederRepository.check_feeder_change(
      String(list_code)
    );

    const feeder_change = {};

    check_feeder_change.forEach((item) => {
      const key = `${item.module}_${item.position}`;
      if (!feeder_change[key] || item.id > feeder_change[key].id) {
        feeder_change[key] = item;
      }
    });

    const result_feeder_change = Object.values(feeder_change);

    for (let i = 0; i < result_feeder_change.length; i++) {
      const idFeederChange = result_feeder_change[i].id_feeder_new;

      // eslint-disable-next-line no-await-in-loop
      await this.feederRepository.updateStatus(idFeederChange);
    }

    // registros de feeder de maior id em change: fim


    await this.materialRepository.updateStatusComponentOnline(
      list_code,
    );

    await this.materialSetupRepository.updateStatusSetup(
      list_code
    );

    // ? Função pra dar baixa na Lista
    await this.materialRepository.updateStatus(
      list_code,
      'finished',
      id_employee,
    );

    // encontra a op na traking
    const find_op_printer = await this.logRoutineFinishRepository.findbyOPCheckToolPrinter(String(list_code));

    if (find_op_printer?.length === 0) {
      throw new AppError('Esta lista não existe na Printer', 404);
    }

    await this.productionOrderRepository.finishOpList(Number(find_op_printer[0].id_production_order));

    const ids_toolings = await this.checktoolprinter.findByTooling(String(list_code));

    const uniqueToolingControls = new Set();
    const uniqueSqueegees = new Set();

    ids_toolings?.forEach(({ id_tooling_control, id_squeegee }) => {
    uniqueToolingControls.add(id_tooling_control);
    uniqueSqueegees.add(id_squeegee);
    });

    const result = {
    toolingControls: Array.from(uniqueToolingControls),
    squeegees: Array.from(uniqueSqueegees)
    };

    result.toolingControls.forEach(async (id) =>{
      await this.tooling_controlRepository.updateStatusToolingControl(typeof id === 'number' ? id : 0);
    })

    result.squeegees.forEach(async (id) =>{
      await this.squeegeeRepository.updateStatusSqueegees(typeof id === 'number' ? id : 0);
    })

    await this.checktoolprinter.updateStatusListcode(String(list_code));

    await this.materialRepository.delete(list_code);

  }
}

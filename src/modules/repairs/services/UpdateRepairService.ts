import ICauseRepository from '@modules/cause/repositories/ICauseRepository';
import IOriginRepository from '@modules/origins/repositories/IOriginRepository';
import ISNDetailRepository from '@modules/sn_detail/repositories/ISNDetailRepository';
import ISolutionRepository from '@modules/solutions/repositories/ISolutionRepository';
import ITrackingRepository from '@modules/trackings/repositories/ITrackingRepository';
import AppError from '@shared/errors/AppError';
import { zonedTimeToUtc } from 'date-fns-tz';
import { inject, injectable } from 'tsyringe';
import { IUpdateRepairDTO } from '../dtos/IUpdateRepairDTO';
import Repair from '../infra/typeorm/entities/Repair';
import IRepairRepository from '../repositories/IRepairRepository';

@injectable()
export default class UpdateRepairService {
  constructor(
    @inject('RepairRepository')
    private repairRepository: IRepairRepository,

    @inject('CauseRepository')
    private causeRepository: ICauseRepository,

    @inject('SolutionRepository')
    private solutionRepository: ISolutionRepository,

    @inject('OriginRepository')
    private originRepository: IOriginRepository,

    @inject('SNDetailRepository')
    private sNDetailRepository: ISNDetailRepository,

    @inject('TrackingRepository')
    private trackingRepository: ITrackingRepository
  ) {}

  async execute({
    id,
    ...rest
  }: IUpdateRepairDTO): Promise<Repair | undefined> {
    const repair = await this.repairRepository.findById(id);

    if (!repair) {
      throw new AppError('Este reparo não existe', 404);
    }

    const cause = await this.causeRepository.findById(rest.id_cause);

    if (!cause) {
      throw new AppError('Esta causa não existe', 404);
    }

    const solution = await this.solutionRepository.findById(rest.id_solution);

    if (!solution) {
      throw new AppError('Esta solução não existe', 404);
    }

    const origin = await this.originRepository.findById(rest.id_origin);

    if (!origin) {
      throw new AppError('Esta origim não existe', 404);
    }

    // reparos faltantes
    const missing_repair = await this.repairRepository.findRegisters(Number(repair.id_tracking ));

    const lastsndetail = await this.sNDetailRepository.findSNDetail(
      repair.tracking.serial_number
    );

    if(missing_repair?.length===0){

      await this.sNDetailRepository.create({
        id_work_station: 1,
        fase: lastsndetail[0].fase,
        id_employee: rest.id_technical,
        id_line: lastsndetail[0].id_line,
        mo_number: lastsndetail[0].mo_number,
        model_name: lastsndetail[0].model_name,
        serial_dad: lastsndetail[0].serial_dad,
        serial_number: lastsndetail[0].serial_number,
        serial_raspberry: lastsndetail[0].serial_raspberry,
        solder_paste_serial: lastsndetail[0].solder_paste_serial,
        out_line_time: zonedTimeToUtc(new Date(), 'UTC'),
        in_line_time: zonedTimeToUtc(new Date(), 'UTC'),
        in_station_time: zonedTimeToUtc(new Date(), 'UTC'),
      });

    };

    const tracking = await this.trackingRepository.checkIfExists(
      repair.tracking.serial_number
    );

    if (!tracking) {
      throw new AppError('Tracking não encontrado', 404);
    }

    Object.assign(tracking, {
      id_work_station: 1,
      id_employee: rest.id_technical,
      update_at: zonedTimeToUtc(new Date(), 'UTC'),
    });

    await this.trackingRepository.update(tracking);

    Object.assign(repair, {
      ...rest,
    });

    return await this.repairRepository.update(repair);
  }
}

import ProductionOrdersRepository from '@modules/production_orders/infra/typeorm/repositories/ProductionOrdersRepository';
import HourByHourService from '@modules/trackings/services/HourByHourService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import TrackingRepository from '../../typeorm/repositories/TrackingRepository';

export default class TrackingController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { mo_code } = request.query;

    const trackingRepository = new TrackingRepository();
    const productionOrderRepository = new ProductionOrdersRepository()

    const trackings = await trackingRepository.findTrackinsByOP(
      String(mo_code)
    );

    const op = await productionOrderRepository.findByCodeOp(String(mo_code))

    if (!op) {
      throw new AppError("Ordem de produção não encontrada")
    }

    const trackingsParse = trackings.map((item) => {
      const pltracking = item.serial_number.split(/[-_]/)[1];
      return {
        ...item,
        serial_number: pltracking || item.serial_number,
      };
    }).filter(item => item.workStation.workgroup.name === 'Depane' && item.serial_number.length === op.product.amount_parent || item.workStation.workgroup.name !== 'Depane')

    return response.status(200).json(trackingsParse);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id_shift, id_line, date } = request.query;

    const hourByHourService = container.resolve(HourByHourService)

    const hours = await hourByHourService.execute(Number(id_shift), Number(id_line), String(date))

    return response.status(200).json(hours)
  }
}

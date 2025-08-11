import { CreateFeederService } from '@modules/feeder/services/CreateFeederService';
import DeleteFeederService from '@modules/feeder/services/DeleteFeederService';
import UpdateFeederService from '@modules/feeder/services/UpdateFeederService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FeederRepository } from '../../typeorm/repositories/FeederRepository';

export default class FeederController {
  async create(request: Request, response: Response): Promise<Response> {
    const { feeder_code, mouting_limit, id_type_feeder } = request.body;

    const createFeeder = container.resolve(CreateFeederService);

    const feeder = await createFeeder.execute({
      feeder_code,
      mouting_limit,
      id_type_feeder,
    });

    return response.status(201).json(feeder);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const { page, all } = request.query;
    const p = typeof page === 'string' ? Number(page) : 1;
    const feederRepository = new FeederRepository();

    if (all) {
      const feeders = await feederRepository.findAllFeedersWithoutPagination();

      return response.json({feeders});
    }

    const {
      feeder: feeders,
      totalPages,
      totalFeeders,
    } = await feederRepository.findAllFeeders(p);

    return response.json({
      feeders,
      totalPages,
      totalFeeders,
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { feeder_code } = request.query;

    const feederRepository = new FeederRepository();

    const lines = await feederRepository.findByFeederNameSearch(
      String(feeder_code),
    );

    if (!lines) {
      throw new AppError('This line does not exist', 404);
    }

    return response.json(lines);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { feeder_code } = request.params;
    const { status, mouting_limit, id_type_feeder } = request.body;

    const updatefeeder = container.resolve(UpdateFeederService);

    const line = await updatefeeder.execute({
      feeder_code,
      status,
      mouting_limit,
      id_type_feeder,
    });

    return response.status(201).json(line);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteLine = container.resolve(DeleteFeederService);
    const idParsed = Number(id);

    await deleteLine.execute({ id: idParsed });

    return response.status(204).json({});
  }

  public async findfeeders(request: Request, response: Response): Promise<Response> {
    const {feeder_code} = request.query;

    const searchFeeders = new FeederRepository();

    const  totalFeeders= await searchFeeders.feedersRegistered(String(feeder_code));

    const checkFeeder=totalFeeders.length

    if (checkFeeder===0) {
      throw new AppError(`Feeder invalido ou não possui cadastro. Por favor verificar!`);
    }

    return response.status(200).json({
      totalFeeders
    });

  }

  public async findFeederLimit(request: Request, response: Response): Promise<Response> {

    const feederRepository = new FeederRepository();

    const feederLimit = await feederRepository.findAllRegisters();

    const result_feederLimit = [];
    for (let i = 0; i < feederLimit.length; i++) {

        const result_amount = {
              id:feederLimit[i].id,
              feeder_code:feederLimit[i].feeder_code,
              mouting_limit:feederLimit[i].mouting_limit,
              criticality_percentage: 0.9 * feederLimit[i].mouting_limit,
              used_qty:feederLimit[i].used_qty,
              typefeeder:feederLimit[i].typefeeder
          }
          result_feederLimit.push(result_amount);
    };

    const exceededLimits = result_feederLimit.filter(feeder => feeder.used_qty > feeder.mouting_limit || feeder.used_qty >= feeder.criticality_percentage);

    const registers=[];
    for(let i = 0; i < exceededLimits.length; i++){

      const id_feeder=exceededLimits[i].id;

      // eslint-disable-next-line no-await-in-loop
      const line_module = await feederRepository.findByLineFeeder(Number(id_feeder));

      const feeder_limit= exceededLimits[i];

      let obj_feeder={...
       feeder_limit,
       line_module,

      };
      registers.push(obj_feeder);
    }

    const alert_total = registers.length;

    return response.json({
      exceededLimits:registers,
      alert_total

    });
  }







}

/* eslint-disable radix */
import CreateRouteBodyService from '@modules/route/services/CreateRouteBodyService';
import DeleteRouteBodyService from '@modules/route/services/DeleteRouteBodyService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import RouteBodyRepository from '../../typeorm/repositories/RouteBodyRepository';

export default class RouteBodyController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      workgroup_id,
      next_workgroup_id,
      isObligatory,
      hasRework,
      route_head_id,
      order
    } = request.body;

    const createRouteBody = container.resolve(CreateRouteBodyService);

    const routeBodies = await createRouteBody.execute({
      workgroup_id,
      next_workgroup_id,
      isObligatory,
      hasRework,
      route_head_id,
      order,
    });

    return response.status(201).json(routeBodies);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const {route_head_id}  = request.params;

    const routeBodyRepostory = new RouteBodyRepository();

    const routeBodies = await routeBodyRepostory.findAllRouteBodys(route_head_id);

    return response.json({ routeBodies });
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const idParsed = parseInt(id);

    const deleteRouteGroupBody = container.resolve(DeleteRouteBodyService);

    await deleteRouteGroupBody.execute({ id: idParsed });

    return response.status(204).json({});
  }
}

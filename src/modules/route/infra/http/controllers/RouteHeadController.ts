/* eslint-disable radix */
import CreateRouteHeadService from '@modules/route/services/CreateRouteHeadService';
import DeleteRouteHeadService from '@modules/route/services/DeleteRouteHeadService';
import UpdateRouteHeadService from '@modules/route/services/UpdateRouteHeadService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import RouteHeadRepository from '../../typeorm/repositories/RouteHeadRepository';

export default class RouteHeadController {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, description, type } = request.body;

    const createRouteHead = container.resolve(CreateRouteHeadService);

    const routeHead = await createRouteHead.execute({
      name,
      description,
      type,
    });

    return response.status(201).json(routeHead);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;
    const p = typeof page === 'string' ? parseInt(page) : 1;

    const routeHeadRepostory = new RouteHeadRepository();

    const { routeHeads, totalPages, totalRouteHeads } =
      await routeHeadRepostory.findAllRouteHeads(p);

    return response.json({ routeHeads, totalPages, totalRouteHeads });
  }

  async routerAll(request: Request, response: Response): Promise<Response> {
    const routeHeadRepostory = new RouteHeadRepository();

    const routeHeadsAll = await routeHeadRepostory.findAllRoute();

    const routeHeads = routeHeadsAll.filter((item) => {
      const countIsObrgatory = item.routes.filter(
        (route) => route.isObligatory
      );
      return countIsObrgatory.length >= 2;
    });

    return response.json({ routeHeads });
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const routeHeadRepostory = new RouteHeadRepository();

    const routeHeads = await routeHeadRepostory.findByRouteHeadNameSearch(
      String(name)
    );

    return response.json(routeHeads);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { name, description, type } = request.body;

    const idParsed = parseInt(id);

    const updateRouteHead = container.resolve(UpdateRouteHeadService);

    const routeHead = await updateRouteHead.execute({
      id: idParsed,
      name,
      description,
      type,
    });

    return response.json(routeHead);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const idParsed = parseInt(id);

    const deleteRouteHead = container.resolve(DeleteRouteHeadService);

    await deleteRouteHead.execute({ id: idParsed });

    return response.status(204).json({});
  }
}

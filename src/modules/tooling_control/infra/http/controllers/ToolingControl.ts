/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import CreateToolingControlService from '@modules/tooling_control/services/CreateToolingControlService';
import DeleteToolingControlService from '@modules/tooling_control/services/DeleteToolingControlService';
import UpdateToolingControlService from '@modules/tooling_control/services/UpdateToolingControlService';
import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ToolingControlRepository from '../../typeorm/repositories/ToolingControlRepository';

export default class ToolingControlController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { page } = request.query;
    const p = typeof page === 'string' ? parseInt(page) : 1;
    const tooling_controlRepository = new ToolingControlRepository();

    const { toolingControl, totalPages, totalToolingControl } =
      await tooling_controlRepository.findAllProducts(p);

    return response.json({ toolingControl, totalPages, totalToolingControl });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { description_tooling_control } = request.query;

    // adcionado a paginação
    const p = typeof page === 'string' ? parseInt(page) : 1;

    const tooling_controlRepository = new ToolingControlRepository();

    const tooling_control =
      await tooling_controlRepository.findByProductNameSearch(
        String(description_tooling_control),
        p
      );

    return response.json(tooling_control);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id_toolgroup, id_product, tools, amount_used, usage_limit } =
      request.body;
    const toolsmap = tools.map(function (item, indice) {
      return item.description_tooling_control;
    });
    const toolsT = toolsmap.filter(function (a) {
      return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
    }, Object.create(null));
    const createToolingControl = container.resolve(CreateToolingControlService);
    const tooling_controlRepository = new ToolingControlRepository();
    const productDouble = await tooling_controlRepository.verifyProductDouble(
      id_product
    );
    const toolgroupname =
      await tooling_controlRepository.verifyToolgroupNameStencil(id_toolgroup);

    if (toolsmap.length > toolsT.length) {
      throw new AppError(
        `Há campos com ferramentas repetidas. Favor verificar!`
      );
    }

    if (productDouble && toolgroupname && tools.length < 2) {
      throw new AppError(
        `Para este Produto e Grupo Stencil é necessário adicionar no mínimo duas ferramentas!`
      );
    }

    for (let i = 0; i < tools.length; i++) {
      const toolingControl = await createToolingControl.execute({
        id_toolgroup,
        id_product,
        description_tooling_control: String(
          tools[i].description_tooling_control
        ),
        amount_used,
        usage_limit,
      });
    }

    return response.status(201).json();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { description_tooling_control } = request.body;

    const update = container.resolve(UpdateToolingControlService);

    const product = await update.execute({
      id,
      description_tooling_control,
    });

    return response.status(201).json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const parsedId = parseInt(id);
    const deleteProducts = container.resolve(DeleteToolingControlService);

    await deleteProducts.execute({ id: parsedId });

    return response.status(204).json({});
  }

  public async indexAllFilter(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { page, id_product, description_tooling_control } = request.query;
    const p = typeof page === 'string' ? parseInt(page) : 1;
    const tooling_controlRepository = new ToolingControlRepository();

    const { toolingControl, totalPages, totalToolingControl } =
      await tooling_controlRepository.findAllToolingControlFilter(
        p,
        id_product,
        String(description_tooling_control)
      );

    const tooling_controlWithouPassword = toolingControl.map((item) => {
      return { ...item, password: undefined };
    });

    return response.json({
      tooling_control: tooling_controlWithouPassword,
      totalPages,
      totalToolingControl,
    });
  }

  public async listToolingControl(
    request: Request,
    response: Response
  ): Promise<Response> {
    const tooling_controlRepository = new ToolingControlRepository();

    const tooling_control =
      await tooling_controlRepository.findAllToolingControlList();

    return response.json({
      tooling_control,
    });
  }

  public async check(request: Request, response: Response): Promise<Response> {
    const { description_tooling_control } = request.query;

    const tooling_controlRepository = new ToolingControlRepository();

    const tooling_control = await tooling_controlRepository.findByDescription(
      String(description_tooling_control)
    );

    if (!tooling_control) {
      throw new AppError('Ferramenta não encontrada');
    }

    return response.status(200).json({});
  }

  public async findAll(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { isStencil } = request.query;

    const toolingControlRepository = new ToolingControlRepository();

    const isStencilBoolean = String(isStencil) === 'true';

    const toolingControls =
      await toolingControlRepository.findAllToolingControl(isStencilBoolean);

    return response.status(200).json(toolingControls);
  }
}

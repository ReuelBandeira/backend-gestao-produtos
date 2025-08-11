/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable radix */
import CriticalComponentService from '@modules/critical_components/services/FindCriticalComponents';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class CriticalComponentController {
  public async all(request: Request, response: Response): Promise<Response> {
    const { id_line } = request.query;
    const criticals = container.resolve(CriticalComponentService);

    const res = await criticals.execute(id_line);

    return response.status(200).json(res);
  }
}

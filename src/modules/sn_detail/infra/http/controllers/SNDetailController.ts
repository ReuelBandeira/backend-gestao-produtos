import FindSNDetailService from '@modules/sn_detail/services/FindSNDetailService.';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SNDetailController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { serial_number } = request.query;

    const findSNDetailService = container.resolve(FindSNDetailService);

    const sNDetails = await findSNDetailService.execute(String(serial_number));

    return response.json(sNDetails);
  }
}

import { Request, Response } from 'express';
import { MaterialManagerRepository } from '../../typeorm/repositories/MaterialManagerRepository';


export default class ComponentUnread {
  public async show(request: Request, response: Response): Promise<Response> {
    const { list_code } = request.query;

    const componentUnread = new MaterialManagerRepository();

    const  totalComponentSMTUnread= await componentUnread.totalComponentSMTUnread(list_code);

    return response.status(200).json({

      totalComponentSMTUnread
    });

  }
}

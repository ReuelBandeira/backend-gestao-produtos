/* eslint-disable radix */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ILogRoutineFinishRepository from '../repositories/ILogRoutineFinishRepository';

interface IRequest {
  list_code: string,
  id_employee: number
}

interface IResponse {
  status: string;
  message: string;
}

@injectable()
export default class LogRoutineFinishService {
  constructor(
    @inject('LogRoutineFinishRepository')
    private logRoutineFinishRepository: ILogRoutineFinishRepository,
  ) {}

  public async execute(
    list_code: string,
    id_employee: number
  ): Promise<IResponse> {

    const materialListLog = await this.logRoutineFinishRepository.create({
      list_code,
      id_employee
    });



    return {

      status: 'success',
      message: 'Log',
    };
  }
}

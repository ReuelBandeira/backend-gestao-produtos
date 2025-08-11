import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Workgroup from '../infra/typeorm/entities/Workgroup';
import IWorkgroupRepository from '../repositories/IWorkgroupRepository';

interface IRequest {
  name: string;
}

@injectable()
export default class CreateEmployeeService {
  constructor(
    @inject('WorkgroupsRepository')
    private employeesRepository: IWorkgroupRepository,
  ) {}

  async execute({ name }: IRequest): Promise<Workgroup> {
    const checkNameExist = await this.employeesRepository.findByName(name);

    if (checkNameExist) {
      throw new AppError(`Esse grupo de trabalho já existe`);
    }

    const workgroup = await this.employeesRepository.create({
      name,
    });

    return workgroup;
  }
}

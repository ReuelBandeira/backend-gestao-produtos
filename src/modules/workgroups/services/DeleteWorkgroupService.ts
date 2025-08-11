import Workgroup from '@modules/workgroups/infra/typeorm/entities/Workgroup';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IWorkgroupRepository from '../repositories/IWorkgroupRepository';

interface IRequest {
  id: number;
}

@injectable()
export default class DeleteWorkgroupeeService {
  constructor(
    @inject('WorkgroupsRepository')
    private workgroupRepository: IWorkgroupRepository,
  ) {}

  async execute({ id }: IRequest): Promise<Workgroup> {
    const workgroup = await this.workgroupRepository.findById(id);

    if (!workgroup) {
      throw new AppError(`O grupo de trabalho com o id: ${id} não existe.`);
    }

    await this.workgroupRepository.delete(id);

    return workgroup;
  }
}

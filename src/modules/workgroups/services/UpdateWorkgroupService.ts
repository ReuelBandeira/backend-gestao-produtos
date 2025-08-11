/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-param-reassign */
import IWorkStationRepository from '@modules/workstations/repositories/IWorkStationRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Workgroup from '../infra/typeorm/entities/Workgroup';
import IWorkgroupRepository from '../repositories/IWorkgroupRepository';

interface IRequest {
  id: number;
  name: string;
  qtd_workstation: number;
}

@injectable()
export default class UpdateWorkgroupService {
  constructor(
    @inject('WorkgroupsRepository')
    private workgroupRepository: IWorkgroupRepository,

    @inject('WorkStationRepository')
    private workStationRepository: IWorkStationRepository
  ) {}

  async execute({ id, name, qtd_workstation }: IRequest): Promise<Workgroup> {
    const workgroup = await this.workgroupRepository.findById(id);

    if (!workgroup) {
      throw new AppError(`Esse grupo de trabalho não existe`, 404);
    }

    if (qtd_workstation === 0) {
      throw new AppError('A quantidade de postos não pode 0', 409);
    }

    if (qtd_workstation && qtd_workstation < workgroup.workstations.length) {
      for (
        let index = qtd_workstation;
        index < workgroup.workstations.length;
        index++
      ) {
        const workstations =
          await this.workStationRepository.findAllWorkStationsWorkgroup(id);

        if (workstations) {
          await this.workStationRepository.delete(workstations[0].id);
        }
      }
    }

    if (qtd_workstation && qtd_workstation > workgroup.workstations.length) {
      for (
        let index = workgroup.workstations.length;
        index < qtd_workstation;
        index++
      ) {
        const indexWS = String(index + 1).padStart(2, '0');
        const workstationsName = `${workgroup.name}_${indexWS}`;
        await this.workStationRepository.create({
          name: workstationsName,
          workgroup_id: id,
        });
      }
    }

    if (name !== workgroup.name) {
      const workstations = workgroup.workstations
        ? workgroup.workstations.map((item, index) => {
            const indexWS = String(index + 1).padStart(2, '0');
            item.name = item.name.replace(item.name, `${name}_${indexWS}`);
            return item;
          })
        : [];

      Object.assign(workgroup, {
        name,
        workstations,
      });

      await this.workgroupRepository.update(workgroup);
    }

    return workgroup;
  }
}

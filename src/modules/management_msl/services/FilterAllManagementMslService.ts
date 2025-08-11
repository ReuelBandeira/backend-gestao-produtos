/* eslint-disable no-restricted-syntax */
import IMaterialManagerRefilRepository from '@modules/material/repositories/IMaterialManagerRefilRepository';
import IMaterialManagerSetupRepository from '@modules/material/repositories/IMaterialManagerSetupRepository';
import IMslMovementRepository from '@modules/msl_movements/repositories/IMslMovementRepository';
import { differenceInMinutes } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import ManagementMsl from '../infra/typeorm/entities/ManagementMsl';
import IManagementMslRepository from '../repositories/IManagementMslRepository';

@injectable()
export default class FilterAllManagementMslService {
  constructor(
    @inject('ManagementMslRepository')
    private managementMslRepository: IManagementMslRepository,

    @inject('MslMovementRepository')
    private mslMovementRepository: IMslMovementRepository,

    @inject('MaterialManagerSetupRepository')
    private materialManagerSetupRepository: IMaterialManagerSetupRepository,

    @inject('MaterialManagerRefilRepository')
    private materialManagerRefilRepository: IMaterialManagerRefilRepository
  ) {}

  async execute(status?: string, lines?: string[]): Promise<ManagementMsl[]> {
    const components =
      await this.managementMslRepository.findAllManagementMslNotPaginate();

    const componentsStatus = [];

    for await (const item of components) {
      const component = await this.mslMovementRepository.findByComponent(
        item.component
      );

      if (component) {
        const timeInHours =
          component.movement_type === 'SAÍDA' ||
            component.movement_type === 'ABERTO' ||
            component.movement_type === 'PRODUÇÃO'
            ? differenceInMinutes(new Date(), component.start_date) / 60
            : 0;

        if (component.movement_type !== 'ENTRADA' && timeInHours > item.management.hours) {
          item.status = 'EXPIRADO';
        } else if (component.movement_type !== 'ENTRADA' &&
          timeInHours >=
          item.management.hours * (item.management.percentage / 100)
        ) {
          item.status = 'EXPIRANDO';
        } else if (component.movement_type === 'ENTRADA') {
          item.status = 'MÁQUINA';
        } else {
          item.status = 'ÚTIL';
        }


        const setup =
          await this.materialManagerSetupRepository.findByComponentAndSerial(
            component.component,
            component.serial
          );

        if (setup) {
          componentsStatus.push({
            ...item,
            machine: setup.machine,
            module: setup.module,
            side: setup.side,
            position: setup.position,
            line: setup.line.line_name,
            open_time: differenceInMinutes(new Date(), component.start_date),
            expire_time: component.movement_type !== 'ENTRADA' && differenceInMinutes(new Date().setMinutes(new Date().getMinutes() - item.management.hours * 60), component.start_date)
          });
        } else {
          const refil =
            await this.materialManagerRefilRepository.findByComponentAndSerial(
              component.component,
              component.serial
            );

          if (refil) {
            const setupOld =
              await this.materialManagerSetupRepository.findByComponentAndSerial(
                refil.component_old,
                refil.sequential_old
              );
            componentsStatus.push({
              ...item,
              machine: refil.machine,
              module: refil.module,
              side: refil.side,
              position: refil.position,
              line: setupOld?.line.line_name || 'N/A',
              open_time: differenceInMinutes(new Date(), component.start_date),
              expire_time: component.movement_type !== 'ENTRADA' && differenceInMinutes(new Date().setMinutes(new Date().getMinutes() - item.management.hours * 60), component.start_date)
            });
          } else {
            componentsStatus.push({
              ...item,
              machine: 'N/A',
              module: 'N/A',
              side: 'N/A',
              position: 'N/A',
              line: 'N/A',
              open_time: differenceInMinutes(new Date(), component.start_date),
              expire_time: component.movement_type !== 'ENTRADA' && differenceInMinutes(new Date().setMinutes(new Date().getMinutes() - item.management.hours * 60), component.start_date)
            });
          }
        }
      }
    }

    if (lines && lines.length) {
      return componentsStatus.filter((item) => lines.includes(item.line)).filter(item => item.status === "EXPIRANDO" || item.status === "EXPIRADO");
    }

    if (status) {
      return componentsStatus.filter((item) => item.status === status);
    }
    return componentsStatus;
  }
}

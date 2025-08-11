import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import CriticalComponent from '../infra/typeorm/entities/CriticalComponent';
import { ICriticalComponentRepository } from '../repositories/ICriticalComponentRepository';



@injectable()
export default class CriticalComponentService {
  constructor(
    @inject('CriticalComponentRepository')
    private criticalComponentRepository: ICriticalComponentRepository,
  ) {}

  async execute(id_line: number): Promise<CriticalComponent[]> {
    const components = await this.criticalComponentRepository.findCriticals(id_line)

    if (!components[0]?.kit_quantity) {
      throw new AppError("Setup do posto printer necessário")
    }

    return components.filter(item =>{
      const percentage = (item.used_quantity / item.component_quantity) * 100
      const percentageKit = (item.used_quantity / item.kit_quantity) * 100

      return percentage >= item.usage_percentage && percentageKit < item.usage_percentage
    })
  }
}

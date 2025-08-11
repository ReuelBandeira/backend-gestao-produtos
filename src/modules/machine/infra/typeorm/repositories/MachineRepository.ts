/* eslint-disable no-param-reassign */
import ICreateMachineDTO from '@modules/machine/dtos/ICreateMachineDTO';
import IMachineRepository from '@modules/machine/repositories/ICreateMachineRepository';
import { getRepository, Repository } from 'typeorm';
import { Machine } from '../entities/Machine';

export default class MachineRepository implements IMachineRepository {
  private ormRepository: Repository<Machine>;

  constructor() {
    this.ormRepository = getRepository(Machine);
  }

  public async findByStructCode(
    struct_bom_code: string,
    side_product: string,
  ): Promise<Machine[] | undefined> {
    const machineList = await this.ormRepository.find({
      where: { struct_bom_code, status: 'Y', side_product },
    });

    return machineList;
  }

  public async create(data: ICreateMachineDTO[]): Promise<Machine[]> {
    const machine = this.ormRepository.create(data);
    await this.ormRepository.save(machine);

    return machine;
  }

  public async updateStatus(
    status: string,
    struct_bom_code: string,
    side_product: string,
  ): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(Machine)
      .set({ status })
      .where({ struct_bom_code, status: 'Y', side_product })
      .execute();
  }
}

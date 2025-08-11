import ICreateSolderPasteMixerDTO, {
  SolderPasteMixerPagination,
} from '@modules/solder_paste/dtos/ICreateSolderPasteMixerDTO';
import ISolderPasteMixerRepository from '@modules/solder_paste/repositories/ISolderPasteMixerRepository';
import { getRepository, IsNull, Like, Repository } from 'typeorm';

import SolderPasteMixer from '../entities/SolderPasteMixer';
import SolderPasteControll from '../entities/SolderPasteControll';

const TOTAL_PER_PAGE = 11;

export default class SolderPasteMixerRepository implements ISolderPasteMixerRepository {

  private ormRepository: Repository<SolderPasteMixer>;

  private ormSolderPasteControllRepository: Repository<SolderPasteControll>;

  constructor() {
    this.ormRepository = getRepository(SolderPasteMixer);
    this. ormSolderPasteControllRepository = getRepository(SolderPasteControll);
  }

  public async findById(id: number): Promise<SolderPasteMixer | undefined> {
    const findSolderPasteMixer = await this.ormRepository.findOne({ id });

    return findSolderPasteMixer;
  }

  public async findBySerialFilter(serial_paste: string):Promise <SolderPasteMixer[]> {
    // eslint-disable-next-line no-shadow
    const SolderPasteMixer = await this.ormRepository.find({
      order:{id:'DESC'},
      relations: ['machine_registers','employee_exit','employee_input'],
      where: {serial_paste}
    });

    return  SolderPasteMixer;
  }

  public async create({
    serial_paste,
    id_machine,
    id_employee_input

  }: ICreateSolderPasteMixerDTO): Promise<SolderPasteMixer> {
    // eslint-disable-next-line no-shadow
    const SolderPasteMixer = this.ormRepository.create({
      serial_paste,
      id_machine,
      id_employee_input
    });

    await this.ormRepository.save(SolderPasteMixer);

    return SolderPasteMixer;
  }


  public async update(
    id: number,
    id_employee_exit: number
  ): Promise<void> {
    await this.ormRepository.createQueryBuilder()
      .update(SolderPasteMixer)
      .set({ id, exit_date: () => 'CURRENT_TIMESTAMP', id_employee_exit })
      .where({ id })
      .execute();
  }

  public async delete(id: number): Promise<void> {
    await this.ormRepository.softDelete({ id });
  }


  public async findAllSolderPasteMixer(page = 1): Promise<SolderPasteMixerPagination> {
    const SolderPasteMixer = await this.ormRepository.find({

      order: { id: 'DESC' },
      skip: (page - 1) * TOTAL_PER_PAGE,
      take: TOTAL_PER_PAGE,
      relations: ['machine_registers','employee_exit','employee_input'],

    });

    const totalSolderPasteMixer = (await this.ormRepository.find()).length;

    return {
      SolderPasteMixer,
      totalSolderPasteMixer,
      totalPages: totalSolderPasteMixer / TOTAL_PER_PAGE,
    };
  }

  public async findAllSolderPasteMixerList():Promise <SolderPasteMixer[]> {
    // eslint-disable-next-line no-shadow
    const SolderPasteMixer = await this.ormRepository.find({
      order:{id:'DESC'},
      relations: ['machine_registers','employee_exit','employee_input'],

    });

    return  SolderPasteMixer;
  }

  async validationTimeMixer(serial_paste: string): Promise<SolderPasteMixer[] | undefined> {

    const today = new Date(); // Obter a data atual

    const material = await this.ormRepository
      .createQueryBuilder('solder_paste_mixer')
      .select([
        'COUNT(solder_paste_mixer.serial_paste) AS occurrence_count',
        'ROUND(TIMESTAMPDIFF(SECOND, MIN(solder_paste_mixer.created_at), current_timestamp()) / 3600) AS defrost_time',
        'MIN(solder_paste_mixer.created_at) AS first_created_at',
      ])
      .where(`DATE(solder_paste_mixer.created_at) = DATE(:today)`, { today })
      .andWhere('solder_paste_mixer.serial_paste = :serial_paste', { serial_paste })
      .groupBy('solder_paste_mixer.serial_paste')
      .getRawMany();

    return material;
  }


  public async findBySerial(serial_paste: string):Promise <SolderPasteMixer[]> {
    // eslint-disable-next-line no-shadow
    const SolderPasteMixer = await this.ormRepository.find({
      order:{id:'DESC'},
      where: {serial_paste}
    });

    return  SolderPasteMixer;
  }

  public async updateStatusMixer(
    serial_paste:string
  ): Promise<void> {
    await this.ormSolderPasteControllRepository.createQueryBuilder("solder_paste_controll")
      .update(SolderPasteControll)
      .set({status_mixer:"released"})
      .where({serial_paste})
      .execute();
  }

  public async findBySerialInMixer(serial_paste: string): Promise<SolderPasteMixer[]> {
    // eslint-disable-next-line no-shadow
    const SolderPasteMixer = await this.ormRepository.find({
      order: { id: 'DESC' },
      where: { serial_paste, exit_date: IsNull() }
    });

    return SolderPasteMixer;
  }

}

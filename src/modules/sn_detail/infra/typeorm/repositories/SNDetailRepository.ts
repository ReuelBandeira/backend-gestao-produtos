import ICreateSNDetailDTO from '@modules/sn_detail/dtos/ICreateSNDetailDTO';
import ISNDetailRepository from '@modules/sn_detail/repositories/ISNDetailRepository';
import { getRepository, Repository } from 'typeorm';
import SNDetail from '../entities/SNDetail';

export default class SNDetailRepository implements ISNDetailRepository {
  private ormRepository: Repository<SNDetail>;

  constructor() {
    this.ormRepository = getRepository(SNDetail);
  }

  public async create(data: ICreateSNDetailDTO): Promise<SNDetail> {
    const sndetail = this.ormRepository.create(data);
    return await this.ormRepository.save(sndetail);
  }

  public async findSNDetail(serial_number: string): Promise<SNDetail[]> {
    return await this.ormRepository.find({
      where: [
        {
          serial_number,
        },
        {
          serial_number: `PL-${serial_number}`,
        },
        {
          serial_number: `BOTTOM_${serial_number}`,
        },
        {
          serial_number: `TOP_${serial_number}`,
        },
        {
          serial_number: `DP-${serial_number}`,
        },
      ],
      relations: ['workStation', 'workStation.workgroup', 'line', 'employee'],
      order: {
        created_at: 'DESC',
      },
    });
  }
}

import ICreateSNDetailDTO from '../dtos/ICreateSNDetailDTO';
import SNDetail from '../infra/typeorm/entities/SNDetail';

export default interface ISNDetailRepository {
  findSNDetail(serial_number: string): Promise<SNDetail[]>;
  create(data: ICreateSNDetailDTO): Promise<SNDetail>;
}

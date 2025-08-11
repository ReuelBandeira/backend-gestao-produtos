import ICreateHeadNozzleDTO from '../dtos/ICreateHeadNozzleDTO';
import HeadNozzle from '../infra/typeorm/entities/HeadNozzle';

export default interface IHeadNozzleRepository {
  findById(id: number): Promise<HeadNozzle | undefined>;
  findByNameSearch(
    serial_number: string,
  ): Promise<(HeadNozzle | undefined)[] | undefined>;
  findByName(id_model: number,serial_number: string): Promise<HeadNozzle | undefined>;
  findAllHeadNozzle(): Promise<HeadNozzle | HeadNozzle[]>;

  create(data: ICreateHeadNozzleDTO): Promise<HeadNozzle>;
  update(model: HeadNozzle): Promise<HeadNozzle>;
  delete(id: number): Promise<void>;

}

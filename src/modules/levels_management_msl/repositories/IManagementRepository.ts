// eslint-disable-next-line import/extensions
import ICreateManagementDTO from '../dtos/ICreateManagementDTO';
import Management from '../infra/typeorm/entities/Management';

export default interface IManagementRepository {
  findById(id: number): Promise<Management | undefined>;
  findByNameSearch(
    type: string,
  ): Promise<(Management | undefined)[] | undefined>;
  findByName(type:string): Promise<Management | undefined>;
  findAllManagement(): Promise<Management | Management[]>;

  create(data: ICreateManagementDTO): Promise<Management>;
  update(management: Management): Promise<Management>;
  delete(id: number): Promise<void>;
  deleteValidation(id: number): Promise<Management[]| undefined>;
}


import {
  ICreateAuthorizationLogRefilDTO,
} from '../dtos/ICreateAuthorizationLogRefil';
import  MaterialAuthorizationLogRefil  from '../infra/typeorm/entities/MaterialAuthorizationLogRefil';

export default interface IMaterialAuthorizationLogRefil {
  create(
    data: ICreateAuthorizationLogRefilDTO[] | ICreateAuthorizationLogRefilDTO,
  ): Promise<MaterialAuthorizationLogRefil[] | MaterialAuthorizationLogRefil>;

}

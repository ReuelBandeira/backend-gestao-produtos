import {
  ICreateAuthorizationLogFeederPitchDTO,
} from '../dtos/ICreateAuthorizationLogFeederPitch';
import  MaterialAuthorizationLogFeederPitch  from '../infra/typeorm/entities/MaterialAuthorizationLogFeederPitch';

export default interface IMaterialAuthorizationLogFeederPitch {
  create(
    data: ICreateAuthorizationLogFeederPitchDTO[] |ICreateAuthorizationLogFeederPitchDTO,
  ): Promise< MaterialAuthorizationLogFeederPitch[] |  MaterialAuthorizationLogFeederPitch>;

}

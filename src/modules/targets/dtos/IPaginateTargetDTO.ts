import Target from '../infra/typeorm/entities/Target';

export default interface IPaginateTargetDTO {
  targets: Target[];
  totalPages: number;
  totalTargets: number;
}

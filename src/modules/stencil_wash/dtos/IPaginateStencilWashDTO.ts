import StencilWash from '../infra/typeorm/entities/StencilWash';

export default interface IPaginateStencilWashDTO {
  stencilWashes: StencilWash[];
  totalPages: number;
  totalStencilWashes: number;
}

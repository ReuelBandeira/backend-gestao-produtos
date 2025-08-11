import ICreateStencilWashDTO from '../dtos/ICreateStencilWashDTO';
import IFilterStencilWashesDTO from '../dtos/IFilterStencilWashesDTO';
import IPaginateStencilWashDTO from '../dtos/IPaginateStencilWashDTO';
import StencilWash from '../infra/typeorm/entities/StencilWash';

export default interface IStencilWashRepository {
  findAllStencilWashes(
    data: Omit<IFilterStencilWashesDTO, 'page'>
  ): Promise<StencilWash[]>;
  findAllStencilWashesPaginate(
    data: IFilterStencilWashesDTO
  ): Promise<IPaginateStencilWashDTO>;
  create(
    data: Omit<ICreateStencilWashDTO, 'tooling_control' | 'machine'>
  ): Promise<StencilWash>;
}

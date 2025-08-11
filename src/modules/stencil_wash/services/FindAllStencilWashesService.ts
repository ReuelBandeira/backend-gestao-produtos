import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IMaterialManagerSetupRepository from '@modules/material/repositories/IMaterialManagerSetupRepository';
import IStencilWashRepository from '../repositories/IStencilWashRepository';
import IFilterStencilWashesDTO from '../dtos/IFilterStencilWashesDTO';

@injectable()
export default class FindAllStencilWashesService {
  constructor(
    @inject('StencilWashRepository')
    private stencilWashRepository: IStencilWashRepository,

    @inject('MaterialManagerSetupRepository')
    private materialManagerSetupRepository: IMaterialManagerSetupRepository
  ) {}

  async execute(data: Omit<IFilterStencilWashesDTO, 'page'>): Promise<any> {
    if (
      (data.end_date && !data.start_date) ||
      (!data.end_date && data.start_date)
    ) {
      throw new AppError('Intervalo de data incorreto', 400);
    }
    const stencilWashes = await this.stencilWashRepository.findAllStencilWashes(
      data
    );

    const stencilWashesParse: any[] = [];
    await Promise.all(
      await stencilWashes.map(async (item) => {
        let line;
        if (item.toolingControl.checkToolPrinters.reverse()[0]?.list_code) {
          await this.materialManagerSetupRepository
            .findLastMaterialManagerByListCode(
              item.toolingControl.checkToolPrinters.reverse()[0].list_code
            )
            .then((response) => {
              line = response?.line || null;
            })
            .catch((error) => Promise.reject(error));
        }

        stencilWashesParse.push({
          ...item,
          toolingControl: {
            ...item.toolingControl,
            checkToolPrinters: {
              ...item.toolingControl.checkToolPrinters.reverse()[0],
              line,
            },
          },
        });
        return Promise.resolve();
      })
    ).catch((error) => Promise.reject(error));

    return stencilWashesParse;
  }
}

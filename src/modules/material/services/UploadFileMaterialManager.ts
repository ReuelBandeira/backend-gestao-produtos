
import { inject, injectable } from 'tsyringe';
import path from 'path';
import AppError from '@shared/errors/AppError';
import ICheckToolPrinterRepository from '@modules/check_tool_printer/repositories/ICheckToolPrinterRepository';
import { MaterialManager } from '../infra/typeorm/entities/MaterialManager';
import IMaterialManagerRepository from '../repositories/IMaterialManagerRepository';



@injectable()
export default class UploadFileMaterialManagerService {
  constructor(
    @inject('MaterialManagerRepository')
    private materialManagerRepository: IMaterialManagerRepository,

    @inject('CheckToolPrinterRepository')
    private checkToolPrinterRepository: ICheckToolPrinterRepository,
  ) {}

  public async execute({ filename, list_code }: { filename: string, list_code: string }): Promise<any> {
    const materialManager = await this.materialManagerRepository.findByListCodes(list_code)

    if (!materialManager.length) {
      throw new AppError('Código da lista não encontrado', 404)
    }

    const product = filename.split('_')[2]

    if (materialManager[0].struct_code !== product) {
      throw new AppError('Produto do arquivo divergente da lista', 400)
    }

    const line = filename.split('_')[0].split('-')[1]

    const checkToolPrinter = await this.checkToolPrinterRepository.findByListCode(list_code)

    if (checkToolPrinter && line !== checkToolPrinter.line.line_name) {
      throw new AppError('Linha do arquivo diferente da lista', 400)
    }

    const updateMaterialManager = await this.materialManagerRepository.updateFile(list_code, filename)

    return updateMaterialManager
  }
}

/* eslint-disable no-await-in-loop */
import AppError from '@shared/errors/AppError';
import { container, inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import path from 'path';
import uploadConfig from '@config/upload';
import xlsx from 'xlsx';
import IProductRepository from '@modules/products/repositories/IProductRepository';
import Product from '@modules/products/infra/typeorm/entities/Product';
import { ProductionOrder } from '../infra/typeorm/entities/ProductionOrders';
import UpdateProductionOrderService from './UpdateProductionOrderService';
import IProductionOrdersRepository from '../repositories/IProductionOrdersRepository';
import ICreateProductionOderDTO from '../dtos/ICreateProductionOderDTO';

interface IRequest {
  filename: string;
  id_employee: number;
  type: string;
}

// ? Esse são os campos que vem direto do excel
// ? Exportado do Protheus
interface IRequestProduction {
  ['Numero da OP']: string;
  Item: string;
  Sequencia: string;
  Produto: string;
  Quantidade: number;
  ['Previsao Ini']: Date;
  ['*NroProcesso']: string;
}

@injectable()
export default class CreateProductionOderService {
  constructor(
    @inject('ProductionOrdersRepository')
    private productionOrderRepository: IProductionOrdersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
    @inject('ProductRepository')
    private productRepository: IProductRepository
  ) {}

  public async execute({
    filename,
    id_employee,
    type
  }: IRequest): Promise<ProductionOrder[]> {
    const pathFile = path.resolve(uploadConfig.tmpFolder, filename);
    const checkExtensionFile = filename.split('.');
    const validExtensions: string[] = ['xlsx', 'xls'];

    if (
      !validExtensions.includes(
        checkExtensionFile[checkExtensionFile.length - 1]
      )
    ) {
      await this.storageProvider.deleteFile(pathFile);
      throw new AppError(
        'Formato do arquivo está incorreto, formatos aceitos: .xlsx and .xls'
      );
    } else {
      const readExcelFile = xlsx.readFile(pathFile, {
        cellText: true,
        cellDates: true,
      });
      const getExcelFileData =
        readExcelFile.Sheets[readExcelFile.SheetNames[2]];
      const data: IRequestProduction[] =
        xlsx.utils.sheet_to_json(getExcelFileData);
      const productionOrdersDTO: ICreateProductionOderDTO[] = [];
      const productionOrders: ProductionOrder[] = [];
      const products: Product[] = [];

      const parseData = JSON.parse(
        JSON.stringify(data).replace(/(?=\s+":)\s+/g, '')
      );
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < parseData.length; index++) {
        const element = parseData[index];
        const po = element.Ordem;

        const checkMoExist = await this.productionOrderRepository.findByCodeOp(
          po
        );

        if (checkMoExist) {
          const productionOderUpdate = container.resolve(
            UpdateProductionOrderService
          );

          const productionOrder = await productionOderUpdate.execute({
            id: checkMoExist.id,
            id_route_code: checkMoExist.id_route_code,
            mo_code: checkMoExist.mo_code,
            id_employee: checkMoExist.id_employee,
            type,
          });
          await this.storageProvider.deleteFile(pathFile);
          productionOrders.push(productionOrder);

          return productionOrders;
        }

        const checkIfProductExist =
          await this.productRepository.findByProductName(element.Material);

        if (!checkIfProductExist) {
          await this.storageProvider.deleteFile(pathFile);
          throw new AppError(
            `Esse produto ${element.Material} não existe ou deve estar inativo`
          );
        }

        const production = {
          mo_code: po,
          target_qty: element['Quantidade da ordem (GMEIN)'],
          id_product: checkIfProductExist.id,
          mo_prevision_start_date: element['Data-base iníc.'],
          process_number: po,
          id_employee,
          type
        };

        const product = new Product();

        product.id = checkIfProductExist.id;
        product.product_name = checkIfProductExist.product_name;

        productionOrdersDTO.push(production);
        products.push(product);
      }

      const oPsSaved = await this.productionOrderRepository.create(
        productionOrdersDTO
      );

      const opAssingneds = oPsSaved.map((op, index) => {
        Object.assign(op, {
          product: {
            id: products[index].id,
            product_name: products[index].product_name,
          },
        });
        return op;
      });

      productionOrders.concat(opAssingneds);

      await this.storageProvider.deleteFile(pathFile);
      return productionOrders;
    }
  }
}

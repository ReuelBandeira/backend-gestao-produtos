/* eslint-disable no-await-in-loop */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import path from 'path';
import uploadConfig from '@config/upload';
import xlsx from 'xlsx';
import IProductRepository from '@modules/products/repositories/IProductRepository';
import ProductionOrdersRepository from '@modules/production_orders/infra/typeorm/repositories/ProductionOrdersRepository';
import IProductionOrdersRepository from '@modules/production_orders/repositories/IProductionOrdersRepository';
import BomRepository from '../infra/typeorm/repositories/BomRepository';
import { Bom } from '../infra/typeorm/entities/Bom';
import IBomRepository from '../repositories/ICreateBomRepository';
import ICreateBomDTO from '../dtos/ICreateBomDTO';

interface IRequest {
  filename: string;
}

// ? Esse são os campos que vem direto do excel
// ? Exportado do Protheus
interface IRequestStruct {
  Codigo: string;
  CODIGO: string;
  DESCRICAO: string;
  ['QTDE.NECESSARIA']: string;
}

interface IRequestZF3 {
  Subestrutura: string;
  Componente: string;
  Alternativo: string;
}

interface IRequestSD4 {
  Produto: string;
  ['Ord Producao']: string;
}

interface IRequestSC2 {
  ['Numero da OP']: string;
  Item: string;
  Sequencia: string;
  Produto: string;
}

@injectable()
export default class CreateProductionOderService {
  constructor(
    @inject('BomRepository')
    private bomRepository: IBomRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
    @inject('ProductRepository')
    private productRepository: IProductRepository,
    @inject('ProductionOrdersRepository')
    private productionOrderRepository: IProductionOrdersRepository,
  ) {}

  public async execute({ filename }: IRequest): Promise<Bom[]> {
    const pathFile = path.resolve(uploadConfig.tmpFolder, filename);
    const checkExtensionFile = filename.split('.');
    const validExtensions: string[] = ['xlsx', 'xls'];
    const bom: ICreateBomDTO[] = [];

    if (
      !validExtensions.includes(
        checkExtensionFile[checkExtensionFile.length - 1],
      )
    ) {
      await this.storageProvider.deleteFile(pathFile);
      throw new AppError(
        'Formato do arquivo está incorreto, esses são os formatos aceitos: .xlsx and xls',
      );
    } else {
      const readExcelFile = xlsx.readFile(pathFile, {
        cellText: true,
        cellDates: true,
      });
      const getExcelDataStruct: IRequestStruct[] = xlsx.utils.sheet_to_json(
        readExcelFile.Sheets[readExcelFile.SheetNames[0]],
      );
      const getExcelDataZF3: IRequestZF3[] = xlsx.utils.sheet_to_json(
        readExcelFile.Sheets[readExcelFile.SheetNames[0]],
      );
      const getExcelDataSD4: IRequestSD4[] = xlsx.utils.sheet_to_json(
        readExcelFile.Sheets[readExcelFile.SheetNames[1]],
      );
      const getExcelDataSC2: IRequestSC2[] = xlsx.utils.sheet_to_json(
        readExcelFile.Sheets[readExcelFile.SheetNames[2]],
      );

      const parseDataStruct = JSON.parse(
        JSON.stringify(getExcelDataStruct).replace(/(?=\s+":)\s+/g, ''),
      );
      const parseDataZF3 = JSON.parse(
        JSON.stringify(getExcelDataZF3).replace(/(?=\s+":)\s+/g, ''),
      );
      const parseDataSD4 = JSON.parse(
        JSON.stringify(getExcelDataSD4).replace(/(?=\s+":)\s+/g, ''),
      );
      const parseDataSC2 = JSON.parse(
        JSON.stringify(getExcelDataSC2).replace(/(?=\s+":)\s+/g, ''),
      );

      // ? Verifica se a ordem existe e pega o id
      const productionOrder = parseDataSC2[0].Ordem;
      const moCodeOne = productionOrder;

      const checkProductionOder =
        await this.productionOrderRepository.findByCodeOp(productionOrder);

      if (!checkProductionOder) {
        await this.storageProvider.deleteFile(pathFile);
        throw new AppError(
          `Essa Ordem de Produção ${productionOrder} não existe`,
        );
      }

      // verifica se o arquivo bom vem vazio
      const empty_file_bom = parseDataStruct.length;
      if (empty_file_bom ==0) {
        const mo_code = String(moCodeOne);
        await this.bomRepository.deleteOp(mo_code);
        throw new AppError(`O arquivo Bom encontra-se sem conteúdo. Por favor, verifique e tente novamente!`);
      }

      // ? Verifica se esse produto já existe se existir desabilitar todos já existentes
      const partnumber = parseDataStruct[0]['Material Cabeçalho LT'];

      const checkIfPartNumberAlreadyExist =
        await this.bomRepository.findByStructCode(partnumber);

      if (checkIfPartNumberAlreadyExist) {
        await this.bomRepository.updateStatus('N', partnumber);
      }
      // retira os componentes sem gravação do objeto da bom
      const bom_object_validation = parseDataStruct.filter(pv => parseDataStruct.filter(bc =>bc['Material Cabeçalho LT'] === pv['Material 2']).length);

      // componentes sem alternativos
      const arrayMainComponent = bom_object_validation.filter(
                  (element) => element['Item alternativ'] === 0
      );
      // componentes com alternativo : sem ordenação por item sequencial
      const arrayAlternatives = bom_object_validation.filter(
                  (element) => element['Item alternativ'] === 1
      );

      // ordenando todos so alternativos por agrupamento e item sequencial : inicio

      // eslint-disable-next-line no-inner-declarations
      function orderArrayAlternatives(array: unknown[]) {
        // Ordenar por "Item alternativo: agrupamento" e "Item alternativo"
        array.sort((a, b) => {
          if (a["Item alternativo: agrupamento"] === b["Item alternativo: agrupamento"]) {
            // Se o agrupamento for igual, ordenar por "Item alternativo"
            return a["Item alternativo: sequência"] - b["Item alternativo: sequência"];
          }
            // Caso contrário, ordenar por "Item alternativo: agrupamento"
            return a["Item alternativo: agrupamento"].localeCompare(b["Item alternativo: agrupamento"]);

        });

        return array;
      }

      // Chamando o método para ordenar o array
      const arrayMainComponentWithAlternatives = orderArrayAlternatives(arrayAlternatives);

      // ordenando todos so alternativos por agrupamento e item sequencial : fim


      // extrai os grupos existentes para compoentes alternativos
      const withComponent = [];
      for (let i = 0; i < arrayMainComponentWithAlternatives.length; ++i) {

          withComponent.push(arrayMainComponentWithAlternatives[i]['Item alternativo: agrupamento']);
      }
      const arrUniqueAWithComponent = [...new Set(withComponent)];

      // percorre o array de grupos para encontrar os componentes alternativos pertencente ao mesmo grupo
      for (let i = 0; i < arrUniqueAWithComponent.length; ++i) {

          const arrayMainComponentWithGroupedAlternatives = arrayMainComponentWithAlternatives.filter(
              (element) => element['Item alternativo: agrupamento'] === arrUniqueAWithComponent[i]
          );

          // objeto de componentes principais e seus alternativos
          for (let j = 0; j < arrayMainComponentWithGroupedAlternatives.length; ++j) {

              if(arrayMainComponentWithGroupedAlternatives[j]['Item alternativo: sequência'] > 1){
                  const createBom = {
                      struct_code: arrayMainComponentWithGroupedAlternatives[j]['Material Cabeçalho LT'],
                      main_component: arrayMainComponentWithGroupedAlternatives[0].Subcomponente,
                      grupo: arrayMainComponentWithGroupedAlternatives[j]['Item alternativo: agrupamento'],
                      description: arrayMainComponentWithGroupedAlternatives[j]['Descrição subcomponente'],
                      id_production_order: checkProductionOder.id,
                      alternative_component: arrayMainComponentWithGroupedAlternatives[j].Subcomponente,
                      qty_used: arrayMainComponentWithGroupedAlternatives[j].Quantidade,
                      position_mec: arrayMainComponentWithGroupedAlternatives[j].Texto ? arrayMainComponentWithGroupedAlternatives[j].Texto.replace(/\s/g, "") : arrayMainComponentWithGroupedAlternatives[j].Texto,
                  };

                  bom.push(createBom)
              }
          }
      }

      // objeto de componentes principais e sem alternativos
      for (let i = 0; i < arrayMainComponent.length; ++i) {

          const createBom = {
              struct_code: arrayMainComponent[i]['Material Cabeçalho LT'],
              main_component: arrayMainComponent[i].Subcomponente,
              grupo: arrayMainComponent[i]['Item alternativo: agrupamento'],
              description: arrayMainComponent[i]['Descrição subcomponente'],
              id_production_order: checkProductionOder.id,
              alternative_component: null,
              qty_used: arrayMainComponent[i].Quantidade,
              position_mec: arrayMainComponent[i].Texto ? arrayMainComponent[i].Texto.replace(/\s/g, "") :  arrayMainComponent[i].Texto,
          };


          bom.push(createBom);


      }

      const createBom = await this.bomRepository.create(bom);
      await this.storageProvider.deleteFile(pathFile);
      return createBom;
    }
  }
}

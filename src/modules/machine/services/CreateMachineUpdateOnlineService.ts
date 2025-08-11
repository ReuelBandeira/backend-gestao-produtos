/* eslint-disable no-plusplus */
/* eslint-disable no-useless-escape */
/* eslint-disable no-await-in-loop */
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import path from 'path';
import uploadConfig from '@config/upload';
import xlsx from 'xlsx';
import IBomRepository from '@modules/bom/repositories/ICreateBomRepository';
import IVersionListMaterialManagerRepository from '@modules/material/repositories/IVersionListaterialManagerRepository';
import IMaterialManagerRepository from '@modules/material/repositories/IMaterialManagerRepository';
import { MaterialManager } from '@modules/material/infra/typeorm/entities/MaterialManager';
import { VersionListMaterialManager } from '@modules/material/infra/typeorm/entities/VersionListMaterialManager';
import { v4 as uuidv4 } from 'uuid';
import { ICreateMaterialManagerDTO } from '@modules/material/dtos/ICreateMaterialManagerDTO';
import { IFeederRepository } from '@modules/feeder/repositories/IFeederRepository';
import IMaterialManagerSetupRepository from '@modules/material/repositories/IMaterialManagerSetupRepository'
import IManagementMslRepository from '@modules/management_msl/repositories/IManagementMslRepository';
import { ICriticalComponentRepository } from '@modules/critical_components/repositories/ICriticalComponentRepository';
import IMaterialManagerChangeFeederRepository from '@modules/material/repositories/IMaterialManagerChangeFeederRepository';
import ICreateMachineDTO from '../dtos/ICreateMachineDTO';
import IMachineRepository from '../repositories/ICreateMachineRepository';

interface IRequest {
  filename: string;
  struct_bom_code: string;
  side_product: string;
  id_employee: number;
  merge:string
  list_codeAlt:string,
}


// ? Esse são os campos que vem do CSV
// ? Exportado da máquina
interface IRequestStruct {
  Model: string;
  Location: string;
  PartNumber: string;
  FeederName: string;
  Width: string;
  FeedPitch: string;
  Qty: number;
}

@injectable()
export default class CreateMachineUpdateOnlineService {
  constructor(
    @inject('MachineRepository')
    private machineRepository: IMachineRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
    @inject('BomRepository')
    private bomRepository: IBomRepository,
    @inject('VersionListMaterialManagerRepository')
    private versionListMaterialManagerRepository: IVersionListMaterialManagerRepository,
    @inject('MaterialManagerRepository')
    private materialManagerRepository: IMaterialManagerRepository,
    @inject('MaterialManagerSetupRepository')
    private materialManagerSetupRepository: IMaterialManagerSetupRepository,
    @inject('FeederRepository')
    private feederRepository: IFeederRepository,
    @inject('ManagementMslRepository')
    private managementMslRepository: IManagementMslRepository,
    @inject('CriticalComponentRepository')
    private criticalComponentRepository: ICriticalComponentRepository,
    @inject('MaterialManagerChangeFeederRepository')
    private materialChangeFeederRepository: IMaterialManagerChangeFeederRepository,
  ) {}

  public async execute({
    filename,
    struct_bom_code,
    side_product,
    id_employee,
    merge,
    list_codeAlt,
  }: IRequest): Promise<MaterialManager[]> {
    const pathFile = path.resolve(uploadConfig.tmpFolder, filename);
    const checkExtensionFile = filename.split('.');
    const validExtensions: string[] = ['csv'];
    const machineCsvToSave: ICreateMachineDTO[] = [];

    const componentSetupValidated = [];

    const nameFile = filename.split('_')
    const nameFileFile = nameFile[nameFile.length-1];

    const nameFileFile01 = String(nameFileFile).split(' ');
    const CpCompiled = String(nameFileFile01[0]);

    const StrucCodeNumber = await this.bomRepository.findByStructCode(
      CpCompiled,
    );

    if(CpCompiled !== StrucCodeNumber[0]?.struct_code || CpCompiled !== struct_bom_code ){
      throw new AppError('Arquivos são de produtos diferentes! Favor verificar!', 400);
    }

    if(!list_codeAlt){
      throw new AppError('Lista a ser substituída não informada! Favor verificar!', 400);
    }

    const checkLatestProductList = await this.materialManagerRepository.checkLatestProductList(list_codeAlt);

    if(merge =='' || merge == null){
      const verifyProductList = await this.materialManagerRepository.verifyProductList(
        struct_bom_code,
      );

       if(side_product === 'B') {
        if (verifyProductList) {
          throw new AppError('Existe uma lista criada para este produto, deseja unificar à lista de materiais já cadastrada?', 208);
        }
      }
    }

    const listCodeMerge = await this.materialManagerRepository.verifyProductList(
      struct_bom_code,
    );

    if (
      !validExtensions.includes(
        checkExtensionFile[checkExtensionFile.length - 1],
      )
    ) {
      await this.storageProvider.deleteFile(pathFile);
      throw new AppError(
        'Formato do arquivo está incorreto, formato aceito: .csv',
      );
    } else {
      const readCsvFile = xlsx.readFile(pathFile, {
        cellText: true,
        cellDates: true,
      });
      const getCsvDataStruct: IRequestStruct[] = xlsx.utils.sheet_to_json(
        readCsvFile.Sheets[readCsvFile.SheetNames[0]],
      );

      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < getCsvDataStruct.length; index++) {
        const element = getCsvDataStruct[index];

        const replaceMultilaserCodeRegex = /_(?<multilaser_code>((\w.*)))/g;
        const replaceChineseCodeRegex = /(?<customer_code>(\w.*))_/g;

        const groupLocation = JSON.parse(
          JSON.stringify(element.Location).replace(/\s/g, ''),
        );
        const splits = groupLocation.split('-');

        let position = 0;
        let machine = '';
        let side = 0;
        let tray_module_position = '';

        if(splits.length === 5){
          machine = String(splits[0]);
          side = Number(splits[1]);
          tray_module_position = String(splits[2]);
          position = Number(splits[4]);
        }

        if (splits.length === 4) {
          machine = String(splits[0]);
          side = Number(splits[1]);
          tray_module_position = String(splits[2]);
          position = Number(splits[3]);

           if (!isNaN(side)) {
            machine = String(splits[0]);
            side = Number(splits[1]);
            tray_module_position = String(splits[2]);
            position = Number(splits[3]);

          }
        }

        if (splits.length == 3) {
          if (
            (splits[0].substr(0, 1) == 'M' && splits[1] == 'B') ||
            splits[1] == 'A'
          ) {
            machine = String(splits[0]);
            tray_module_position = String(splits[1]);
            position = Number(splits[2]);
          }

          if (
            (splits[0].substr(0, 1) == 'M' && splits[1] != 'B') ||
            splits[1] != 'A'
          ) {
            machine = String(splits[0]);
            side = Number(splits[1]);
            position = Number(splits[2]);
          }
        }

        if (splits.length == 2) {
          if(splits[0].substr(0, 1) == 'M' ) {
            machine = String(splits[0]);
            position = Number(splits[1]);
          }else{
            side = Number(splits[0]);
            position = Number(splits[1]);
          }
        }

        const validationPartNumber = element.PartNumber.split('_');

        if (validationPartNumber.length > 1) {
          const matchPartNumberMultilaser = replaceMultilaserCodeRegex.exec(
            element.PartNumber,
          );

          const groupPartNumberMultilaser = JSON.parse(
            JSON.stringify(matchPartNumberMultilaser?.groups),
          );

          const matchPartNumberCustomer = replaceChineseCodeRegex.exec(
            element.PartNumber,
          );
          const groupPartNumberCustomer = JSON.parse(
            JSON.stringify(matchPartNumberCustomer?.groups),
          );

          const { multilaser_code } = groupPartNumberMultilaser;
          const { customer_code } = groupPartNumberCustomer;

          const componentBom = await this.bomRepository.findByComponentAlternativeComponent('Y', struct_bom_code, multilaser_code)

          for(let i = 0; i < componentBom?.length; i++){

            const createMachine = {
              name: element.Model,
              machine_code: machine || 'M1',
              side: Number(side) || 1,
              qty_slots: Number(position),
              tray_module_position: tray_module_position || 'F',
              customer_code,
              multilaser_code,
              alternative_component: componentBom[i].alternative_component,
              feeder_code: element.FeederName || 'Não Existe',
              thickness: element.Width || '-',
              feed_pitch: Number(element.FeedPitch) || 0,
              qty: Number(element.Qty),
              struct_bom_code,
              side_product,
            };

            machineCsvToSave.push(createMachine);
          }
        }
      }

      // validação de componente msl : inicio

      const check_msl_components = await this.managementMslRepository.verifyMslComponents();
      const all_comps_msl = check_msl_components?.map((value) => value.component);
      const comps_mains = machineCsvToSave.map((value) => value.multilaser_code);
      const repeated_components_mains = [...new Set(comps_mains)]
      const list_alters = machineCsvToSave.filter(obj => obj.alternative_component !== '');
      const comps_alters = list_alters.map((value) => value.alternative_component);
      const repeated_components_alters = [...new Set(comps_alters)]
      const merge_comps_msl = repeated_components_mains.concat(repeated_components_alters);

      const filtered_comps_msl = merge_comps_msl.filter(comp => !all_comps_msl?.includes(comp)); // retira todos componentes em comum a msl

      const uniqueCompsMsl = [...new Set(filtered_comps_msl)]; //  retira duplicidades de componentes caso exista

      let arrayCompsMsl = uniqueCompsMsl.map((elemento) => {
        return {
          component: elemento,
        };
      });
      arrayCompsMsl = arrayCompsMsl.filter(item => item.component !== null);

      if (arrayCompsMsl.length !== 0) {
        return {
          arrayCompsMsl,
          materialManager:[]
        } ;
      }

      // validação de componente msl : fim

      const machineCsv = await this.machineRepository.create(machineCsvToSave);

      await this.storageProvider.deleteFile(pathFile);

      const findBom = await this.bomRepository.findByStructCode(
        struct_bom_code,
      );
      const findMachine = machineCsv;

      const materialManagerToSave: ICreateMaterialManagerDTO[] = [];
      const materialManager: MaterialManager[] = [];

      let lastVersion = {} as VersionListMaterialManager;

      let list_code = uuidv4();

      let newVersion = 1;

      if(merge == 'N'){

        const [versionList, version] =
        await this.versionListMaterialManagerRepository.findByStructCode(
          struct_bom_code,
          list_codeAlt,
        );


        if (version > 0) {
          lastVersion = versionList[versionList.length - 1];

          const { list_code: lastListCode } = lastVersion;
          await this.versionListMaterialManagerRepository.disableVersion(
            lastListCode,
          );

          await this.materialManagerRepository.delete(lastListCode);
          await this.versionListMaterialManagerRepository.generateNewVersion(
            struct_bom_code,
            list_code,
          );
        }

        newVersion += version;
      }

      if (findMachine) {
        for (let i = 0; i < findMachine.length; i++) {
          const element = findMachine[i];

          const checkTheSameComponents = findBom?.some((find) => {
            const list = [];
            if (find.main_component === element.multilaser_code) {
              list.push(find);
            }

            return list;
          });

          if (!checkTheSameComponents) {
            await this.machineRepository.updateStatus(
              'N',
              struct_bom_code,
              side_product,
            );
            throw new AppError(
              `Esse componente ${element.multilaser_code} não foi encontrado na BOM`,
            );
          }

          if(merge == 'S'){

            await this.materialManagerRepository.updateSideProductComponentMerge(
              listCodeMerge?.list_code,
              struct_bom_code,
            );

            const componentMerge = await this.materialManagerRepository.verifyComponentMaterialListMerge(
              struct_bom_code,
              listCodeMerge?.list_code,
              element.multilaser_code,
              element.machine_code,
              element.side,
              element.qty_slots,
            );

            const checkLatestProductListVersion = await this.materialManagerRepository.checkLatestProductListMerge(list_codeAlt);

            newVersion  = checkLatestProductListVersion[0]?.version ? checkLatestProductListVersion[0]?.version+1 : newVersion;

            if(componentMerge){

              const qty = componentMerge.quantity + element.qty;
              const qtyBot = element.qty;

              await this.materialManagerRepository.updateQuantityComponentMerge(
                listCodeMerge?.list_code,
                element.multilaser_code,
                element.machine_code,
                element.side,
                element.qty_slots,
                qty,
                qtyBot
              );

            }else{

              const createMaterialListMerge = {
                list_code: listCodeMerge.list_code,
                main_components: element.multilaser_code,
                alternative_components: element.alternative_component || '',
                struct_code: struct_bom_code,
                side: element.side,
                side_product: 'C',
                side_product_hidden: element.side_product,
                machine: element.name,
                status: 'loading',
                status_component: 'online',
                module: element.machine_code,
                position: element.qty_slots,
                quantity: element.qty,
                tray_module_position: element.tray_module_position,
                id_employee,
                version: newVersion,
                feeder_pitch: element.feed_pitch,
                width: element.thickness,
                qtyBot: element.qty
              };

              materialManagerToSave.push(createMaterialListMerge);
            }

            if(list_codeAlt){

              const verificaListaSetup = await this.materialManagerSetupRepository.verifyComponentSetup(
                list_codeAlt,
                element.multilaser_code,
                element.alternative_component,
                element.machine_code,
                element.side,
                element.qty_slots,
              );

              componentSetupValidated.push(verificaListaSetup);

            }

            list_code = listCodeMerge.list_code;

          }else{

            newVersion  = checkLatestProductList[0]?.version ? checkLatestProductList[0]?.version+1 : newVersion;

            const createMaterialList = {
              list_code,
              main_components: element.multilaser_code,
              alternative_components: element.alternative_component || '',
              struct_code: struct_bom_code,
              side: element.side,
              side_product: element.side_product,
              side_product_hidden: element.side_product,
              machine: element.name,
              status: 'loading',
              status_component: 'online',
              module: element.machine_code,
              position: element.qty_slots,
              quantity: element.qty,
              tray_module_position: element.tray_module_position,
              id_employee,
              version: newVersion,
              feeder_pitch: element.feed_pitch,
              width: element.thickness,
              qtyTop: element.qty
            };

            materialManagerToSave.push(createMaterialList);

            if(list_codeAlt){

              const verificaListaSetup = await this.materialManagerSetupRepository.verifyComponentSetup(
                list_codeAlt,
                element.multilaser_code,
                element.alternative_component,
                element.machine_code,
                element.side,
                element.qty_slots,
              );

              componentSetupValidated.push(verificaListaSetup);

              const feeder = await this.materialManagerSetupRepository.findSetupFeeder(
                String(list_codeAlt)
              );

              for (let i = 0; i < feeder.length; i++) {
                const idFeeder = feeder[i].id_feeder;
                // eslint-disable-next-line no-await-in-loop
                await this.feederRepository.updateStatus(idFeeder);
              }

            }

          }

        }

        if(componentSetupValidated.length > 0){

          const componentSetupValidatedFiltered = componentSetupValidated.filter(x => x[0]?.list_code.trim().length > 0);

          for(var j = 0; j < componentSetupValidatedFiltered.length; j++ ){
            const result = await this.materialManagerSetupRepository.create({
              list_code,
              id_line: componentSetupValidatedFiltered[j][0].id_line,
              machine: componentSetupValidatedFiltered[j][0].machine,
              module: componentSetupValidatedFiltered[j][0].module,
              side: componentSetupValidatedFiltered[j][0].side,
              position: componentSetupValidatedFiltered[j][0].position,
              id_feeder: componentSetupValidatedFiltered[j][0].id_feeder,
              component: componentSetupValidatedFiltered[j][0].component,
              feeder_pitch:componentSetupValidatedFiltered[j][0].feeder_pitch,
              id_employee,
            });

          }

          if(list_codeAlt){
            await this.materialManagerRepository.updateStatus(
              list_codeAlt,
              'update',
              id_employee,
            );
            //  update em componentes criticos
            await this.criticalComponentRepository.updateListCriticals(
              list_codeAlt,
              list_code
            );
          }

        }

        const materialSaved = await this.materialManagerRepository.create(
          materialManagerToSave,
        );

        const verificaComponenteSetup = await this.materialManagerSetupRepository.verifyLineList(list_code)

        for(var j = 0; j < verificaComponenteSetup.length; j++){

          const verifyComponentAlternative = await this.materialManagerRepository.componentAlternativeLines(
            list_code,
            verificaComponenteSetup[j].component,
            verificaComponenteSetup[j].position,
          );

          await this.materialManagerRepository.updateStatusComponentRead(
            list_code,
            verifyComponentAlternative[0].main_components,
            verifyComponentAlternative[0].position,
          );

          const feeder = await this.feederRepository.findById(verificaComponenteSetup[0].id_feeder);

          if (!feeder) {
            throw new AppError('Feeder não existe', 404);
          }
          if (feeder.status === 'maintence') {
            throw new AppError('Este Feeder não pode ser usado');
          }
          // TODO Alterar status do feeder para 'using'
          Object.assign(feeder, {
            status: 'using',
          });

          await this.feederRepository.update(feeder);
        }

        materialManager.concat(materialSaved);
      }

      if (newVersion === 1) {
        await this.versionListMaterialManagerRepository.generateNewVersion(
          struct_bom_code,
          list_code,
        );
      }

      await this.machineRepository.updateStatus(
        'N',
        struct_bom_code,
        side_product,
      );

      await this.materialChangeFeederRepository.updateListCode(
        list_code, list_codeAlt)

      return {
        arrayCompsMsl:[],
        materialManager
      } ;
    }
  }
}

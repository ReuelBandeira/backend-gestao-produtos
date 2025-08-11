/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import IBomRepository from '@modules/bom/repositories/ICreateBomRepository';
import IMachineRepository from '@modules/machine/repositories/ICreateMachineRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';
import { ICreateMaterialManagerDTO } from '../dtos/ICreateMaterialManagerDTO';
import { MaterialManager } from '../infra/typeorm/entities/MaterialManager';
import { VersionListMaterialManager } from '../infra/typeorm/entities/VersionListMaterialManager';
import IMaterialManagerRepository from '../repositories/IMaterialManagerRepository';
import IVersionListMaterialManagerRepository from '../repositories/IVersionListaterialManagerRepository';

interface IRequest {
  struct_code: string;
  side_product: string;
  id_employee: number;
}

@injectable()
export default class CreateMaterialManagerService {
  constructor(
    @inject('MaterialManagerRepository')
    private materialManagerRepository: IMaterialManagerRepository,
    @inject('MachineRepository')
    private machineRepository: IMachineRepository,
    @inject('BomRepository')
    private bomRepository: IBomRepository,
    @inject('VersionListMaterialManagerRepository')
    private versionListMaterialManagerRepository: IVersionListMaterialManagerRepository,
  ) {}

  public async execute({
    struct_code,
    side_product,
    id_employee,
  }: IRequest): Promise<MaterialManager[]> {
    const findBom = await this.bomRepository.findByStructCode(struct_code);


    const findMachine = await this.machineRepository.findByStructCode(
      struct_code,
      side_product,
    );
    const [versionList, version] =
      await this.versionListMaterialManagerRepository.findByStructCode(
        struct_code,
      );

    const materialManagerToSave: ICreateMaterialManagerDTO[] = [];
    const materialManager: MaterialManager[] = [];

    let lastVersion = {} as VersionListMaterialManager;

    const list_code = uuidv4();

    if (version > 0) {
      lastVersion = versionList[versionList.length - 1];
      const { list_code: lastListCode } = lastVersion;
      await this.versionListMaterialManagerRepository.disableVersion(
        lastListCode,
      );
      await this.materialManagerRepository.delete(lastListCode);
      await this.versionListMaterialManagerRepository.generateNewVersion(
        struct_code,
        list_code,
      );
    }

    const newVersion = version + 1;

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
            struct_code,
            side_product,
          );
          throw new AppError(
            `Esse componente ${element.multilaser_code} não foi encontrado na BOM`,
          );
        }

        const createMaterialList = {
          list_code,
          main_components: element.multilaser_code,
          alternative_components: '',
          struct_code,
          side: element.side,
          side_product: element.side_product,
          machine: element.name,
          tray_module_position: element.tray_module_position,
          status: 'available',
          status_component: 'online',
          module: element.machine_code,
          position: element.qty_slots,
          quantity: element.qty,
          id_employee,
          version: newVersion,
          feeder_pitch: element.feed_pitch,
        };

        materialManagerToSave.push(createMaterialList);
      }

      const materialSaved = await this.materialManagerRepository.create(
        materialManagerToSave,
      );

      materialManager.concat(materialSaved);
    }
    if (newVersion === 1) {
      await this.versionListMaterialManagerRepository.generateNewVersion(
        struct_code,
        list_code,
      );
    }

    await this.machineRepository.updateStatus('N', struct_code, side_product);

     return materialManager;
  }
}
